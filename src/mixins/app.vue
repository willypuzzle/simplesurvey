<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapGetters('app', [
      'getSurveyFromStore'
    ])
  },
  methods: {
    ...mapMutations('app', [
      'setSurveyInStore'
    ])
  }
}
</script>
