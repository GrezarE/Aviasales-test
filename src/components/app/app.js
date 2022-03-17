import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSearchId } from "../../services/actions/searchId"
import ErrorBoundary from "../error-boundary/error-boundary"
import avia from '../../images/avia.svg'
import { Tab } from "../tab/tab"
import style from './app.module.css'



export const App = () => {
  const dispatch = useDispatch()
  const search = useSelector(store => store.searchId)

  useEffect(() => {
    console.log('loaded')
    dispatch(getSearchId())
  }, [])



  useEffect(() => {
    console.log(search)
  }, [search.request])

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
