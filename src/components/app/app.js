import { useEffect, useState, useMemo } from "react"
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


  const onClickTab = (item) => {
    console.log(item)
    setValue(item)
  }

  useEffect(() => {
    console.log('loaded')
    dispatch(getSearchId())
  }, [])

  // useEffect(() => {
  //   if (searchId) {
  //     dispatch(getTickets(searchId))
  //     console.log(tickets, searchEnd)
  //   }
  // }, [searchId])

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
  // const sort = useMemo(() =>
  //   tickets?.filter(item => {
  //     if (item.segments[0].stops.length === 0 && item.segments[1].stops.length === 0) {
  //       return item
  //     }
  //   }), [tickets])
  // const sort = tickets?.filter(item => {
  //   if (item.segments[0].stops.length === 0 && item.segments[1].stops.length === 0) {
  //     return item
  //   }
  // })
  // const sort = tickets?.filter(item => {
  //   // const itemData = item
  //   const ticket = item.segments
  //   console.log(ticket)
  //   let result = ticket.find(item => item.stops.length === 0)
  //   if (result) {
  //     return item
  //   }
  // })

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

  // const sorted = filtered.sort(function (a, b) {
  //   if (value === 'low') {
  //     return a.price - b.price
  //   }
  //   if (value === 'fast') {
  //     return a.segments[0].duration - b.segments[0].duration
  //   }
  //   if (value === 'optimal') {
  //     return a - b
  //   }
  // })

  const sliced = useMemo(() =>
    sorted?.slice(0, 5),
    [sorted]
  )

  useEffect(() => {
    if (sliced?.length > 0) {
      console.log(sliced)
    }
  }, [sliced, value])






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
