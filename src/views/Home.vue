<template>
  <div class="home">
    <button v-if="register"
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#exampleModal"
      data-whatever="@mdo"
    >Follow the Game</button>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Input Your Name</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="nameSubmit(name)">
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Name:</label>
                <input type="text" class="form-control" id="recipient-name" v-model="name">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click.prevent="nameSubmit(name)" data-dismiss="modal">Submit</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!register">
      <button 
      type="button"
      class="btn btn-primary"
      @click="roomSubmit()"
      >Go To Room</button>
    </div>
    

    <div style="position: fixed; z-index: -99; width: 100%; height: 100%">
      <iframe
        frameborder="0"
        height="680"
        width="100%"
        src="https://www.youtube.com/embed/o8sU1XEMBqo?playlist=o8sU1XEMBqo&loop=1&autoplay=1&controls=0&showinfo=0&autohide=1"
        allow="autoplay; fullscreen"
      ></iframe>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
//
export default {
  name: "home",
  data() {
    return {
      register: true, 
      name: "",
    };
  },
  mounted() {
    if(localStorage.getItem('username')) {
      this.register = false
    } else {
      this.register = true
    }
  },
  methods: {
    nameSubmit(name) {
      localStorage.setItem('username', name)
      localStorage.setItem('id', Math.round(Math.random()*8999999)+1000000)
      this.$router.push('/rooms')
      this.name = ''
      $('#exampleModal').modal('hide');
    },
    roomSubmit(){
      this.$router.push('/rooms');
      $('#exampleModal').modal('hide');
    }
  }
};
</script>
