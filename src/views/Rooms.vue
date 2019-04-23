<template>
  <div class="listRoom">
    <div class="container">
      <dd-create-room />
      <div class="row">
        <dd-list-room @join-room="joinRoom" :rooms="rooms"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ddCreateRoom from '@/components/CreateRoom.vue';
import ddListRoom from '@/components/ListRoom.vue';

import db from '@/api/firebase';

export default {
  name: 'RoomList',
  components: {
    ddCreateRoom,
    ddListRoom,
  },
  data() {
    return {
      rooms: [],
    };
  },
  created() {
    if (!localStorage.id) {
      window.location = '/';
    }
    this.fetchRoom();
  },
  methods: {
    fetchRoom() {
      db.collection('rooms')
        .orderBy('createdAt', 'desc')
        .onSnapshot((querySnapshot) => {
          console.log('Data changed');
          this.rooms = [];
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, doc.data());
            this.rooms.push(doc);
          });
        });
    },
    joinRoom(id) {
      let newData = null;
      db.collection('rooms').doc(id).get()
        .then((doc) => {
          const tmp = doc.data().users;
          newData = Object.assign(tmp, {
            [localStorage.id]: {
              username: localStorage.username,
              score: 0,
            },
          });
          return db.collection('rooms').doc(id).update({
            users: newData,
            usersId: Object.keys(newData),
          });
        })
        .then(() => {
          console.log('joined');
        })
        .catch((error) => {
          console.error('ERROR ==> ', error);
        });
    },
  },
};
</script>
