import { useEffect, useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSearchId } from "../../services/actions/searchId"
import ErrorBoundary from "../error-boundary/error-boundary"
import avia from '../../images/avia.svg'
import { Tab } from "../tab/tab"
import style from './app.module.css'
import { getTickets } from "../../services/actions/tickets"
import { CheckBox } from "../checkbox/check-box"
import { Ticket } from "../ticket/ticket"



export const App = () => {
  const dispatch = useDispatch()
  const { searchId } = useSelector(store => store.searchId)
  const { tickets, searchEnd } = useSelector(store => store.tickets)
  const [value, setValue] = useState('low')


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
      } else
        if (name === 'noStops' && !checkBoxState.noStops) {
          setCheckBoxState({
            all: false,
            noStops: true,
            oneStops: false,
            twoStops: false,
            threeStops: false
          })
        } else
          if (name !== 'noStops' && checkBoxState.noStops) {
            setCheckBoxState({ ...checkBoxState, [name]: value, noStops: false })
          }
          else {
            setCheckBoxState({ ...checkBoxState, [name]: value })
          }
  }


  const onClickTab = (item) => {
    console.log(item)
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

  const setSort = () => {
    if (checkBoxState.all === true) {
      return tickets
    }
    if (checkBoxState.noStops === true) {
      return tickets?.filter(item => {
        if (item.segments[0].stops.length === 0 && item.segments[1].stops.length === 0) {
          return item
        }
      })
    }
    if (checkBoxState.oneStops === true && checkBoxState.twoStops === false && checkBoxState.threeStops === false) {
      return tickets?.filter(item => {
        if (item.segments[0].stops.length === 1 && item.segments[1].stops.length === 1) {
          return item
        }
      })
    }
    if (checkBoxState.oneStops === false && checkBoxState.twoStops === true && checkBoxState.threeStops === false) {
      return tickets?.filter(item => {
        if (item.segments[0].stops.length === 2 && item.segments[1].stops.length === 2) {
          return item
        }
      })
    }
    if (checkBoxState.oneStops === false && checkBoxState.twoStops === false && checkBoxState.threeStops === true) {
      return tickets?.filter(item => {
        if (item.segments[0].stops.length === 3 && item.segments[1].stops.length === 3) {
          return item
        }
      })
    }
    if (checkBoxState.oneStops === true && checkBoxState.twoStops === true && checkBoxState.threeStops === false) {
      return tickets?.filter(item => {
        if (item.segments[0].stops.length < 3 && item.segments[1].stops.length < 3) {
          return item
        }
      })
    } else {
      return tickets
    }
  }

  const sort = useMemo(() =>
    setSort()
    , [tickets, checkBoxState])

  useEffect(() => {
    if (sort) {
      console.log(sort)
    }
  }, [sort])

  const filtered = sort?.filter(item => item)
  const sorted = useMemo(() => filtered?.sort(function (a, b) {
    if (value === 'low') {
      return a.price - b.price
    }
    if (value === 'fast') {
      return a.segments[0].duration - b.segments[0].duration
    }
    if (value === 'optimal') {
      return a - b
    }
  }), [value, filtered])



  const sliced = useMemo(() =>
    sorted?.slice(0, 5),
    [sorted]
  )

  return (
    <ErrorBoundary>
      <main className={style.main}>
        <img src={avia} className={style.logo}></img>
        <section className={style.app}>
          <CheckBox state={checkBoxState} onChange={onChangeCheckBox} />
          <section>
            <Tab value={value} onClick={onClickTab} />
            <ul className={style.tickets}>
              {sliced?.map((item, index) =>
                <Ticket ticket={item} key={index} />
              )
              }
            </ul>
          </section>
        </section>
      </main>
    </ErrorBoundary>
  )
}
