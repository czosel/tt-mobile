import { h, Component } from 'preact'
import Loading from './loading'
import Header from './header'

export default function LoadingPage() {
  return (
    <div>
      <Header loading={true} />
      <section class="section">
        <Loading />
      </section>
    </div>
  )
}
