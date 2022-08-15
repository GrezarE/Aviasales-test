import { BASE_URL } from "../../utils/base-url"
import { checkResponse } from "../../utils/check-response"

export const GET_TICKETS_REQUEST = 'GET_TICKETS_REQUEST'
export const GET_TICKETS_SUCCESS = 'GET_TICKETS_SUCCESS'
export const GET_TICKETS_FAIL = 'GET_TICKETS_FAIL'
export const GET_TICKETS_NOT_END = 'GET_TICKETS_NOT_END'


export function getTickets(searchId) {
  return function (dispatch) {
    dispatch({
      type: GET_TICKETS_REQUEST
    })
    fetch(`${BASE_URL}/tickets?searchId=${searchId}`)
      .then(checkResponse)
      .then((res) => {
        if (res.stop === true) {
          dispatch({ type: GET_TICKETS_SUCCESS, tickets: res.tickets })
        } else {
          console.log('not end')
          dispatch({ type: GET_TICKETS_NOT_END })
          setTimeout(() => dispatch(getTickets(searchId)), 200)
        }
      })
      .catch((err) => {
        setTimeout(() => dispatch(getTickets(searchId)), 100)
      })
  }
}
