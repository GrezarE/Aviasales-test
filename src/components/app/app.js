import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSearchId } from "../../services/actions/searchId"
import ErrorBoundary from "../error-boundary/error-boundary"
import avia from '../../images/avia.svg'
import { Tab } from "../tab/tab"
import style from './app.module.css'
import { getTickets } from "../../services/actions/tickets"
import { CheckBox } from "../checkbox/check-box"



export const App = () => {
  const dispatch = useDispatch()
  const { searchId } = useSelector(store => store.searchId)
  const { tickets, searchEnd } = useSelector(store => store.tickets)

  const [checkBoxState, setCheckBoxState] = useState({
    all: false,
    noStops: false,
    oneStops: false,
    twoStops: false,
    threeStops: false
  })

  const onChangeCheckBox = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(target, value, name)
    if (name === 'all' && !checkBoxState.all) {
      setCheckBoxState({
        all: true,
        noStops: false,
        oneStops: false,
        twoStops: false,
        threeStops: false
      })
    } else
      if (name !== 'all' && checkBoxState.all) {
        setCheckBoxState({ ...checkBoxState, [name]: value, all: false })
      }
      else {
        setCheckBoxState({ ...checkBoxState, [name]: value })
      }
  }

  const [value, setValue] = useState('low')

  const onClickTab = (item) => {
    setValue(item)
  }

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
    console.log(tickets)
  }, [tickets])

  const sort = tickets?.map(item => {
    const ticket = item.segments
    let result = ticket.find(item => item.stops.length === 3)
    console.log(result)
    if (result) {
      return item
    }
  })

  const sorted = sort?.filter(item => item)

  useEffect(() => {
    if (sorted.length > 0) {
      console.log(sorted)
    }
  }, [sorted])






  return (
    <ErrorBoundary>
      <main className={style.main}>
        <img src={avia} className={style.logo}></img>
        <section className={style.app}>
          <CheckBox state={checkBoxState} onChange={onChangeCheckBox} />
          <div>
            <Tab value={value} onClick={onClickTab} />
          </div>
        </section>
      </main>
    </ErrorBoundary>
  )
}
