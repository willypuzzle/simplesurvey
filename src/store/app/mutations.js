import _ from 'lodash'

export function setSurveyInStore( state, value ) {
  return state.survey = _.cloneDeep(value)
}
