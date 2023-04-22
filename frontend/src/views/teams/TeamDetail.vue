<template>
  <div class="team-detail">
    <div v-if="getTeam" class="frame">
      <div class="frame-header"></div>
      <div class="team-info">
        <div class="team-name">{{ getTeam.name }}</div>
        <div class="team-id">Team ID: {{ getTeam.id }}</div>
      </div>
      <div class="frame-footer"></div>
    </div>
    <div v-else class="loading">Loading team details...</div>
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


<style scoped>
.team-detail {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.frame {
  background-color: #fff;
  border: 10px solid #a8a8a8;
  box-shadow: 0 0 10px #a8a8a8;
  width: 80%;
  height: 80%;
  position: relative;
}

.frame-header,
.frame-footer {
  height: 50px;
  background-color: #2c3e50;
  color: #fff;
}

.frame-header {
  border-bottom: 10px solid #1c1e21;
}

.frame-footer {
  border-top: 10px solid #1c1e21;
}

.team-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 20px;
}

.team-name {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

.team-id {
  font-size: 24px;
}
</style>
