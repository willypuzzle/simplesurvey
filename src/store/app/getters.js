import _ from 'lodash'

export function getSurveyFromStore(state) {
  return _.cloneDeep(state.survey)
}
