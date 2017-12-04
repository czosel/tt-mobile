import Loading from './loading'
import Header from './header'

export default function LoadingPage() {
  return (
    <div>
      <Loading />
      <Header loading={true} />
      <section class="section" />
    </div>
  )
}
