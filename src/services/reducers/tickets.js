import { GET_TICKETS_REQUEST, GET_TICKETS_SUCCESS, GET_TICKETS_FAIL, GET_TICKETS_NOT_END } from "../actions/tickets";


const ticketsInitStore = {
  tickets: [],
  isRequest: false,
  isFail: false,
  searchEnd: false
}

export const ticketsReducer = (state = ticketsInitStore, action) => {
  switch (action.type) {
    case GET_TICKETS_REQUEST: {
      return {
        ...state,
        isRequest: true
      }
    }
    case GET_TICKETS_SUCCESS: {
      return {
        tickets: action.tickets,
        isRequest: false,
        searchEnd: true
      }
    }
    case GET_TICKETS_NOT_END: {
      return {
        ...state,
        searchEnd: false
      }
    }
    case GET_TICKETS_FAIL: {
      return {
        tickets: [],
        isRequest: false,
        isFail: true
      }
    }
    default: {
      return state
    }
  }

}
