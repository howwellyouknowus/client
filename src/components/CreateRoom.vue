<template>
  <div id="createRoom">
    <!-- Button trigger modal -->
    <p>
      <button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal">
        Create Room
      </button>
    </p>

    <!-- Modal -->
    <div
      class="modal fade" id="exampleModal"
      tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Create Room</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-left">
              <form @submit.prevent="addRoom">
                <div class="form-group">
                  <label for="exampleInput1">Room Name</label>
                  <input
                    v-model="room.name"
                    required
                    type="text"
                    class="form-control"
                    id="exampleInput1"
                    placeholder="Enter name"
                    autofocus>
                </div>
                <button
                  type="submit"
                  class="btn btn-success"
                  data-toggle="modal"
                  data-target="#exampleModal">
                    Create
                </button>
              </form>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import db from '@/api/firebase';

export default {
  name: 'CreateRoom',
  data() {
    return {
      room: {
        name: '',
        author: {
          id: localStorage.id,
          username: localStorage.username,
        },
        status: 'ready',
        users: {},
        usersId: [],
        createdAt: new Date(),
      },
    };
  },
  methods: {
    addRoom() {
      db.collection('rooms')
        .add(this.room)
        .then((docRef) => {
          console.log(`created with id:${docRef.id}`);
          this.room.name = '';
        })
        .catch((err) => {
          console.log('ERROR==', err);
        });
    },
  },
};
</script>
