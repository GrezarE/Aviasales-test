import { useEffect, useState } from 'react'
import style from './check-box.module.css'


const Check = ({ text, name, checked, onChange }) => {
  return (
    <div className={style.input__box}>
      <label className={style.label}>
        <input type='checkbox' name={name} checked={checked} onChange={onChange} className={style.input} />
        <span className={style.span}>{text}</span>
      </label>
    </div>
  )
}

// const Check = ({ text, name, checked, onChange }) => {
//   return (
//     <div className={style.input__box}>
//       <span className={style.span}>
//         <input type='checkbox' name={name} checked={checked} onChange={onChange} className={style.input} />
//       </span>
//       <label className={style.label}>{text}</label>
//     </div>
//   )
// }

export const CheckBox = ({ state, onChange }) => {
  // const [state, setState] = useState({
  //   all: false,
  //   noStops: false,
  //   oneStops: false,
  //   twoStops: false,
  //   threeStops: false
  // })

  // const onChange = (event) => {
  //   const target = event.target;
  //   const value = target.type === "checkbox" ? target.checked : target.value;
  //   const name = target.name;
  //   console.log(target, value, name)
  //   if (name === 'all' && !state.all) {
  //     setState({
  //       all: true,
  //       noStops: false,
  //       oneStops: false,
  //       twoStops: false,
  //       threeStops: false
  //     })
  //   } else
  //     if (name !== 'all' && state.all) {
  //       setState({ ...state, [name]: value, all: false })
  //     }
  //     else {
  //       setState({ ...state, [name]: value })
  //     }
  // }


  return (
    <form className={style.form}>
      <h2 className={style.header}>Колличество пересадок</h2>
      <Check text='Все' name='all' checked={state.all} onChange={onChange} />
      <Check text='Без пересадок' name='noStops' checked={state.noStops} onChange={onChange} />
      <Check text='1 пересадка' name='oneStops' checked={state.oneStops} onChange={onChange} />
      <Check text='2 пересадки' name='twoStops' checked={state.twoStops} onChange={onChange} />
      <Check text='3 пересадки' name='threeStops' checked={state.threeStops} onChange={onChange} />
    </form>
  )
}
