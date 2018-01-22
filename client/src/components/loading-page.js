import Loading from './loading'
import Header from './header'

export default function LoadingPage({ back }) {
  return (
    <div>
      <Loading center={true} />
      <Header loading={true} back={back} />
      <section class="section" />
    </div>
  )
}
