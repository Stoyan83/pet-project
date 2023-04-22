<template>
  <div v-if="isLoggedIn">
    <div v-if="allTeams.length > 0" class="team-list">
      <div v-for="team in allTeams" :key="team.id" class="team">
        <div class="team-header" @click="onClick(team.id)">
          <div class="team-name">{{ team.name }}</div>
          <div class="arrow-icon" :class="{ 'rotate': showTeamDetail && selectedTeamId === team.id }">
            <i class="fas fa-chevron-down"></i>
          </div>
        </div>
        <div class="team-details" v-show="showTeamDetail && selectedTeamId === team.id">
          <div class="team-description">{{ team.description }}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <h3>You have no team</h3>
    </div>
    <team-detail v-if="showTeamDetail" :team-id="selectedTeamId" @close="showTeamDetail = false"></team-detail>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import TeamDetail from "./TeamDetail.vue";
  export default {
    components: {
      TeamDetail,
    },

    name: "ProjectManager",
    data() {
      return {
        selectedTeamId: null,
        showTeamDetail: false,
      };
    },

    methods: {
      ...mapActions(["fetchTeams"]),

      onClick(id) {
        this.selectedTeamId = id;
        if (this.selectedTeamId === id) {
          this.showTeamDetail = !this.showTeamDetail; // toggle
        } else {
          this.selectedTeamId = id;
          this.showTeamDetail = true;
        }
      },
    },

    computed: {
      ...mapGetters(["allTeams", "isLoggedIn"]),
    },

    mounted() {
      this.fetchTeams();
    },
  };
</script>

<style scoped>
  .team-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 20px;
  }

  .team {
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
  }

  .team:hover {
    box-shadow: 0px 0px 10px #ccc;
  }

  .team-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f5f5f5;
    cursor: pointer;
  }

  .team-name {
    font-weight: bold;
  }

  .arrow-icon {
    transform-origin: center;
    transition: transform 0.3s ease-in-out;
  }

  .rotate {
    transform: rotate(180deg);
  }

  .team-details {
    padding: 10px;
  }

  .team-description {
    white-space: pre-wrap;
  }
</style>
