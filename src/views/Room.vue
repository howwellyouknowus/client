<template>
  <div id="room" class="container">
    <div class="card">
      <h5 class="card-header">{{ room.name }}</h5>
      <div class="card-body">
        <h2 class="card-title"><span class="badge badge-primary">Host: @{{ room.author ? room.author.username : ''}}</span></h2>
        <p class="card-text">
          <strong>Members:</strong>
          <ul class="list-unstyled">
            <li
              v-for="(user, index) in room.users"
              :key="index">
                <span :class="id === index ? 'badge badge-secondary' : '' ">@{{ user.username }}</span>
              </li>
          </ul>
        </p>
        <router-link :to="room.usersId && room.usersId.length > 1 ? `/games/${roomId}` : `/rooms/${roomId}`">
          <button
            v-show="room.author ? room.author.id === id : false"
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
      if(this.room.usersId.length > 1) {
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
      } else {
        Swal.fire({
          position: 'center',
          type: 'error',
          title: 'Total player minimal 2',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  },
};
</script>
