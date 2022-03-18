import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSearchId } from "../../services/actions/searchId"
import ErrorBoundary from "../error-boundary/error-boundary"
import avia from '../../images/avia.svg'
import { Tab } from "../tab/tab"
import style from './app.module.css'
import { getTickets } from "../../services/actions/tickets"



export const App = () => {
  const dispatch = useDispatch()
  const { searchId } = useSelector(store => store.searchId)
  const { tickets, searchEnd } = useSelector(store => store.tickets)

  useEffect(() => {
    console.log('loaded')
    dispatch(getSearchId())
  }, [])

  useEffect(() => {
    if (searchId) {
      dispatch(getTickets(searchId))
      console.log(tickets, searchEnd)
    }
  }, [searchId])

  useEffect(() => {
    console.log(searchId)
  }, [searchId])

  return (
    <ErrorBoundary>
      <main className={style.main}>
        <img src={avia} className={style.logo}></img>
        <section className={style.app}>
          <Tab />
        </section>
      </main>
    </ErrorBoundary>
  )
}
