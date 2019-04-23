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
          <p class="card-text">Status: {{ room.data().status }}</p>
          <router-link :to="`/rooms/${room.id}`">
            <button
              type="button"
              class="btn btn-light"
              @click="joinRoom(room.id)">
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
    joinRoom(id) {
      this.$emit('join-room', id);
    },
  },
};
</script>
