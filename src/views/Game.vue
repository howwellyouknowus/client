<template>
  <div class="container">
    Halo halo
    <div v-if="status=='finished'"> 
      <div class="row">
        <div class="col-12 align-self-center">
          <div>
            <div class="card bg-light text-black text-center p-3">
              <blockquote class="blockquote mb-0">
                <h2> Congratulation </h2>
                <h3> The winner is {{ winner.username }} </h3>
                <h3> Your score is {{ winner.score }} </h3>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    

      <div class="row">
        <h3> All Players' Score: </h3>
        <div class="col-6">
            <div v-for="(player,index) in players" :key="index">
              <p>{{player.username}} : {{player.score}} </p>
            </div>

        </div>
        <div class="row">
          <button type="button" class="btn btn-success" @click="playAgain">Play Again</button>
          <button type="button" class="btn btn-secondary" @click="goToRooms">Back to Rooms</button>
        </div>
      </div>
    
    </div>

    <div v-else>

      <div class="row">
        <div class="col-12 align-self-center">
          <div>
            <div class="card bg-light text-black text-center p-3">
              <blockquote class="blockquote mb-0">
                <h3> {{activeQuestion.pertanyaan}} </h3>
              </blockquote>
            </div>
            <br>
            <form class="form-inline" @submit.prevent="submitAnswer(activeQuestion)">
              <div class="form-group mx-sm-3 mb-2">
                <label for="inputPassword2" class="sr-only">Answer here</label>
                <input v-model="answer"
                        type="text"
                        class="form-control"
                        id="inputPassword2"
                        placeholder="Your Answer">
              </div>
              <div>
                <button type="submit" class="btn btn btn-outline-success mb-2 ml-2">Submit</button>
                <button
                  type="button"
                  class="btn btn-outline-danger mb-2"
                  @click.prevent="skipQuestion"> Next Question</button>
              </div>
              <div>
                
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-6 offset 3">
          <div v-for="(player,index) in players" :key="index">
            <p>{{player.username}}</p>
            <div class="progress" >

              <div
                v-bind:style="{width : player.score+'%'}"
                class="progress-bar"
                role="progressbar"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"></div>
            </div>
          </div>
        </div>
      </div>

  </div>
  </div>
</template>
<script>
import db from '@/api/firebase';

export default {
  name: "game",
  data() {
    return {
      id: this.$router.currentRoute.params.id,
      answer: "",
      userId: localStorage.getItem("id"),
      startIndex: 0,
      data: "",
      name: "",
      author: "",
      players: "",
      status: "",
      winner: ""
    };
  },
  created() {
    this.getQuestion();
    db.collection("rooms")
      .doc(this.id)
      .onSnapshot(doc => {
        this.id = doc.id;
        let data = doc.data();
        this.name = data.name;
        console.log("masuk ke room game", data)
        this.author = data.author;
        this.players = data.users;
        this.status = data.status;
        for (let i in this.players) {
          if (this.players[i].score >= 100) {
            let payload = {
              status: "finished"
            };
            this.winner=this.players[i]
            this.updateRoom(payload);
          }
        }
      });
  },
  methods: {
    getQuestion() {
      console.log("masuk ke get questions")
      db.collection("Question").onSnapshot(querySnapshot => {
        console.log("hasil get question", querySnapshot);
        const data = [];
        querySnapshot.docs.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() });
        });

          // this.allTask = data
        console.log("hasil spread dan for each", data);
        this.$store.dispatch("fetchQuestion", data);
      });
    },
    skipQuestion() {
      this.answer = '';
      console.log("masuk skip question >>>>")
      let audio = new Audio("/assets/next.mp3");
      audio.play();
      this.startIndex += 1;
    },
    submitAnswer(payload) {
      console.log("masuk answer question >>>>", payload)
      let obj;
      if(this.answer == '') {
        let audio = new Audio("/assets/wrong.mp3");
        audio.play();
        console.log("audio wrong ==> ", audio)
      } else {
        if (payload.jawaban.indexOf(this.answer.toLowerCase()) !== -1) {
          this.startIndex += 1;
          this.currentPlayer.score += 10;
          let payload = {
            [`users.${this.userId}.score`]: this.currentPlayer.score
          };
  
          let audio = new Audio("/assets/correct.mp3");
          audio.play();
          console.log("audio correct ==> ", audio)
          this.answer = '';
          this.updateRoom(payload);
        } else {
          let audio = new Audio("/assets/wrong.mp3");
          audio.play();
          console.log("audio wrong ==> ", audio)
          this.answer = '';
        }
      }
    },
    updateRoom(payload) {
      console.log("masuk ke update room ===", payload)
      db.collection("rooms")
        .doc(this.id)
        .update(payload)
        .then(() => {
          console.log("update room berhasil")
          // this.snapshot();
          // this.$router.replace("/games/" + this.id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    playAgain() {
      console.log("play again", this.id)
      db.collection("rooms")
        .doc(this.id)
        .get()
        .then(doc => {
          console.log("hasil get play again ==>", doc.data())
            let data = doc.data();
            let players = data.users;
            for (let key in players) {
              console.log("dalam looping playagain ====", players[key].score)
              players[key].score = 0
            }
            console.log("hasil looping object playagain", players)
            let payload = {
              users: players,
              status: 'playing'
            }
            this.updateRoom(payload)
            this.$router.push(`/games/${this.id}`)
        })
    },
    goToRooms() {
      console.log("go back rooms", this.id)
      db.collection("rooms")
        .doc(this.id)
        .get()
        .then(doc => {
            let data = doc.data();
            let players = data.users;
            console.log("before leaving ====", players)
            delete players[this.userId]
            console.log("after leaving === ", players)
            for (let key in players) {
              players[key].score = 0
            }
            console.log("after looping ===", players)
            let payload = {
              users: players,
              status: 'ready'
            }
            this.updateRoom(payload)
            this.$router.push(`/rooms`)
        })
    }
  },
  computed: {
    currentPlayer() {
      return this.players[this.userId];
    },
    activeQuestion() {
      return this.questions[this.startIndex];
    },
    activePlayers() {
      return this.players;
    },
    questions() {
      return this.$store.state.questions.sort(function func(a, b) {
        return 0.5 - Math.random();
      })
    }
  }
};
</script>

