import { useRef, useState } from 'react'
import style from './tab.module.css'



const TabElement = ({ text, type, value, onClick }) => {
  return (
    <li className={type === value ? (style.tab__element_active) : (style.tab__element)} onClick={onClick}>
      <p>{text}</p>
    </li>
  )
}

export const Tab = () => {
  const [value, setValue] = useState('low')

  const onClick = (item) => {
    setValue(item)
  }

  return (
    <ul className={style.tab}>
      <TabElement text='Самый дешевый' type='low' value={value} onClick={() => onClick('low')} />
      <TabElement text='Самый быстрый' type='fast' value={value} onClick={() => onClick('fast')} />
      <TabElement text='Оптимальный' type='optimal' value={value} onClick={() => onClick('optimal')} />
    </ul>
  )
}
