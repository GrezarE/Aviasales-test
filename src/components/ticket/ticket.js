import style from './ticket.module.css'

const WayDate = ({ item }) => {
  const hours = item.date.slice(11, 16)
  const millisec = Date.parse(item.date)
  const data = new Date(millisec + item.duration * 60 * 1000).toLocaleTimeString().slice(0, 5)
  return (
    <div>
      <p className={style.text__grey}>{item.origin + ' - ' + item.destination}</p>
      <p className={style.text}>{hours + ' - ' + data}</p>
    </div>
  )
}

const WayTime = ({ item }) => {
  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    if (minutes.toString().length < 2) {
      return hours + ':0' + minutes;
    }
    return hours + ':' + minutes;
  };
  const duration = getTimeFromMins(item.duration).split(':')

  return (
    <div>
      <p className={style.text__grey}>в пути</p>
      <p className={style.text}>{duration[0] + 'ч ' + duration[1] + 'м'}</p>
    </div>
  )
}

const WayStops = ({ item }) => {
  const getStops = () => {
    return item.stops.length === 0 ? '0 пересадок' : item.stops.length === 1 ? '1 пересадка' : item.stops.length === 2 ? '2 пересадки' : '3 пересадки'
  }
  const stops = item.stops.join(', ')

  return (
    <div >
      <p className={style.text__grey}>{getStops()}</p>
      <p className={style.text}>{stops}</p>
    </div>
  )
}

export const Ticket = ({ ticket }) => {
  const { price, carrier, segments } = ticket
  const wayTo = segments[0]
  const wayFrom = segments[1]


  return (
    <li className={style.li}>
      <div className={style.header}>
        <h2 className={style.header__price}>{price + ' Р'}</h2>
        <img src={`http://pics.avs.io/99/36/${carrier}.png`} className={style.image} />
      </div>
      <div className={style.way}>
        <WayDate item={wayTo} />
        <WayTime item={wayTo} />
        <WayStops item={wayTo} />
      </div>
      <div className={style.way}>
        <WayDate item={wayFrom} />
        <WayTime item={wayFrom} />
        <WayStops item={wayFrom} />
      </div>
    </li>
  )
}
