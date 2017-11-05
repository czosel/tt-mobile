import { h, Component } from 'preact'

export default function Table({ children }) {
  return <table class="table is-fullwidth" {...{ children }} />
}
