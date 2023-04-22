<template>
  <div class="team-detail">
    <div v-if="getTeam" class="laptop">
      <div class="laptop-header"></div>
      <div class="laptop-screen">
        <div class="screen-content">
          <div class="team-info">
            <div class="team-name">{{ getTeam.name }}</div>
            <div class="team-id">Team ID: {{ getTeam.id }}</div>
          </div>
          <div >
            <img  src="https://community.intersystems.com/sites/default/files/pictures/picture-default.jpg" alt="avatar" class="image-team">
          </div>
          <div >
            <img src="https://community.intersystems.com/sites/default/files/pictures/picture-default.jpg" alt="avatar" class="image-team">
          </div>
          <div>
            <img src="https://community.intersystems.com/sites/default/files/pictures/picture-default.jpg" alt="avatar" class="image-team">
          </div>
        </div>
      </div>
      <div class="laptop-footer"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "TeamDetail",
  props: {
    teamId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['getTeam']),
  },
  methods: {
    ...mapActions(['fetchTeam']),
  },
  mounted() {
    this.fetchTeam(this.teamId);
  },
};
</script>


<style>
  .team-detail {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color:  #eee;
  }

  .laptop {
    position: relative;
    width: 80%;
    height: 80%;
    background-color: #eee;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .laptop-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5%;
    background-color: #333;
  }

  .laptop-screen {
    position: absolute;
    top: 5%;
    left: 0;
    width: 100%;
    height: 90%;
    overflow-y: auto;
  }

  .screen-content {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
  }

  .screen-content > div {
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .image-team {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
}
  .laptop-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5%;
    background-color: #333;
  }

  .team-info {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 20px;
  }

  .team-name {
    margin-bottom: 10px;
  }

  .team-id {
    font-size: 16px;
    color: #888;
  }
</style>
