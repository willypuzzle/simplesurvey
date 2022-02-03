<template>
  <q-page class="flex flex-center">
    <div v-for="(slide, index) in slides" :key="index">
      <template v-if="currentIndex === index">
        <template v-if="slide.type === SLIDE">
          <q-chip square>
            <q-avatar color="red" text-color="white">{{index + 1}}</q-avatar>
            {{ slide.question }}
          </q-chip>
          <br />
          <q-radio v-for="(answer, aindex) in slide.answers"
                   :key="aindex"
                   v-model="selection"
                   checked-icon="task_alt"
                   unchecked-icon="panorama_fish_eye"
                   :val="answer.id"
                   :label="answer.text"
          />
          <br/>
          <q-btn :disable="!selection" color="primary" icon-right="send" label="Next" @click="next"/>
        </template>
        <template v-if="slide.type === FINAL_PAGE">

        </template>
      </template>
    </div>
  </q-page>
</template>

<script>
import {defineComponent} from "vue";
import app from '../mixins/app'
import _ from 'lodash'

const SLIDE = 'slide'
const FINAL_PAGE = 'final_page'

export default defineComponent({
  name: "PageIndex",
  mixins: [app],
  data() {
    return {
      SLIDE,
      FINAL_PAGE,
      answers: [],
      currentIndex: 0,
      selection: null
    }
  },
  computed: {
    slides() {
      const survey = _.map(this.getSurveyFromStore, (el) => {
        el.type = SLIDE
        return el
      })
      survey.push({
        type: FINAL_PAGE
      })

      return survey
    }
  },
  methods: {
    next(){
      this.currentIndex++;
      this.selection = null
    }
  }
});
</script>
