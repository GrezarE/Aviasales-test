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


export const CheckBox = ({ state, onChange }) => {

  return (
    <section>
      <form className={style.form}>
        <h2 className={style.header}>Колличество пересадок</h2>
        <Check text='Все' name='all' checked={state.all} onChange={onChange} />
        <Check text='Без пересадок' name='noStops' checked={state.noStops} onChange={onChange} />
        <Check text='1 пересадка' name='oneStops' checked={state.oneStops} onChange={onChange} />
        <Check text='2 пересадки' name='twoStops' checked={state.twoStops} onChange={onChange} />
        <Check text='3 пересадки' name='threeStops' checked={state.threeStops} onChange={onChange} />
      </form>
    </section>
  )
}
