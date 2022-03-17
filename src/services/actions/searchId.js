import { checkResponse } from "../../utils/check-response"
import { BASE_URL } from "../../utils/base-url"

export const SEARCH_ID_REQUEST = 'SEARCH_ID_REQUEST'
export const SEARCH_ID_SUCCESS = 'SEARCH_ID_SUCCESS'
export const SEARCH_ID_FAIL = 'SEARCH_ID_FAIL'


export function getSearchId() {
  return function (dispatch) {
    dispatch({
      type: SEARCH_ID_REQUEST
    })
    fetch(`${BASE_URL}/search`)
      .then(checkResponse)
      .then((res) => {
        if (res) {
          dispatch({ type: SEARCH_ID_SUCCESS, searchId: res.searchId })
        }
      })
      .catch((err) => dispatch({ type: SEARCH_ID_FAIL }))
  }
}
