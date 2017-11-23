import { h, Component } from 'preact'
import Loading from '../loading'
import Header from '../header'
import Container from '../container'
import style from './style'

const reload = () => {
  location.reload()
}

export default function ErrorPage({ info }) {
  const message = info && info.data && info.data.message
  return (
    <div>
      <Header />
      <Container>
        <h1 class="title">Hoppla...</h1>
        <p>Die Daten konnten nicht geladen werden.</p>
        <br />
        <p>
          <button class="button is-primary" onClick={reload}>
            Nochmal versuchen
          </button>
        </p>
        <br />
        {message && <code>Fehlercode: {message}</code>}
      </Container>
    </div>
  )
}
