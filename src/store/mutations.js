import * as types from './mutation-types'
const mutations = {
  [types.SET_ARTICLEIDS] (state, articleids) {
    state.articleids = articleids
  }
}
export default mutations
