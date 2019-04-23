<template>
  <div id="listRoom">
    <div
      v-for="(room, i) in rooms"
      :key="i"
      :class="`card text-white
              bg-${cardThemes[Math.round(Math.random()*(cardThemes.length - 1))]}
              mb-4 ml-3 mr-3`"
      style="width: 18rem;display:inline-block;">
        <div class="card-header">{{ room.data().name }}</div>
        <div class="card-body">
          <p class="card-text">Host: @{{ room.data().author.username }}</p>
          <p class="card-text">Total Player: {{ room.data().usersId.length }}</p>
          <p class="card-text">Status: <span :class="`badge badge-${room.data().status === 'ready' ? 'success' : 'danger'}`">{{ room.data().status.toUpperCase() }}</span></p>
          <router-link :to="room.data().status === 'ready' ? `/rooms/${room.id}` : '/rooms'">
            <button
              type="button"
              class="btn btn-light"
              @click="joinRoom(room)">
                Join Room
            </button>
          </router-link>
        </div>
    </div>
  </div>
</template>

<script>
// import db from '@/api/firebase'

export default {
  name: 'ListRoom',
  props: {
    rooms: Array,
  },
  data() {
    return {
      cardThemes: [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'dark',
      ],
    };
  },
  methods: {
    joinRoom(room) {
      if (room.data().status === 'ready') {
        this.$emit('join-room', room.id);
      } else {
        Swal.fire({
          position: 'center',
          type: 'error',
          title: 'Room currently in game',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  },
};
</script>
