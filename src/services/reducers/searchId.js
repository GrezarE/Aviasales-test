import { SEARCH_ID_FAIL, SEARCH_ID_REQUEST, SEARCH_ID_SUCCESS } from "../actions/searchId";

const searchIdInitState = {
  searchId: '',
  request: false,
  fail: false
}

export const searchIdReducer = (state = searchIdInitState, action) => {
  switch (action.type) {
    case SEARCH_ID_REQUEST: {
      return {
        ...state,
        request: true,
      }
    }
    case SEARCH_ID_SUCCESS: {
      return {
        ...state,
        searchId: action.searchId,
        request: false
      }
    }
    case SEARCH_ID_FAIL: {
      return {
        searchId: '',
        request: false,
        fail: true
      }
    }
    default: {
      return state
    }
  }
}
