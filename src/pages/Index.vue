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
          <q-chip square>
            These are the results:
          </q-chip>
          <div v-for="(entry, index) in answers" :key="index">
            <q-chip square>
              <q-avatar :icon="entry.got ? 'done' : 'remove_done'" :color="entry.got ? 'primary' : 'red'" text-color="white" />
              {{`${index + 1}. ${entry.question} -> ${entry.current_answer.text}`}}
            </q-chip>
          </div>
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
      const entry = _.cloneDeep(this.slides[this.currentIndex])
      const answer = _.find(entry.answers, a => a.id === this.selection)
      if(answer?.is_correct){
        entry.got = true
      }else{
        entry.got = false
      }
      entry.current_answer = answer
      this.answers.push(entry)
      this.currentIndex++;
      this.selection = null
    }
  }
});
</script>
