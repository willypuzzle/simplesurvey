<template>
  <router-view />
</template>
<script>
import { defineComponent } from "vue";
import survey from './data/survey.json'
import app from './mixins/app.vue'

export default defineComponent({
  name: "App",
  mixins: [app],
  created() {
    this.setSurveyInStore(survey.survey)
  }
});
</script>
