<template>
  <div id="room" class="container">
    <div class="card">
      <h5 class="card-header">{{ room.name }}</h5>
      <div class="card-body">
        <h5 class="card-title text-left">Host: @{{ room.author.username }}</h5>
        <p class="card-text text-left">
          <ul>
            <li
              v-for="(user, index) in room.users"
              :key="index">
                @{{ user.username }}
              </li>
          </ul>
        </p>
        <router-link :to="`/games/${roomId}`">
          <button
            v-show="room.author.id === id"
            type="button"
            class="btn btn-success mr-2"
            @click="changeStatus">
              Play
          </button>
        </router-link>
        <router-link to="/rooms">
          <button type="button" class="btn btn-danger" @click="leaveRoom">Leave</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/api/firebase';

export default {
  name: 'Room',
  data() {
    return {
      route: this.$route,
      roomId: this.$route.params.id,
      room: {},
      id: localStorage.id,
      username: localStorage.username,
    };
  },
  created() {
    db.collection('rooms')
      .doc(this.roomId)
      .onSnapshot((doc) => {
        this.room = doc.data();
        if (this.room.status === 'playing') {
          window.location = `/games/${this.roomId}`;
        }
      });
  },
  methods: {
    leaveRoom() {
      db.collection('rooms').doc(this.roomId).get()
        .then((doc) => {
          const tmp = doc.data().users;
          delete tmp[localStorage.id];
          return db.collection('rooms').doc(this.roomId).update({
            users: tmp,
            usersId: Object.keys(tmp),
          });
        })
        .then(() => {
          console.log('leaved');
        })
        .catch((error) => {
          console.error('ERROR ==> ', error);
        });
    },
    changeStatus() {
      db.collection('rooms')
        .doc(this.roomId).update({
          status: 'playing',
        })
        .then(() => {
          console.log('playing');
        })
        .catch((error) => {
          console.error('ERROR ==> ', error);
        });
    },
  },
};
</script>
