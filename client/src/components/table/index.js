import { h, Component } from 'preact'
import style from './style'

export default function Table({ children }) {
  return (
    <div class={style.wrapper}>
      <table class="table is-hoverable is-fullwidth" {...{ children }} />
    </div>
  )
}
