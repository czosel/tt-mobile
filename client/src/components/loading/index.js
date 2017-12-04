import Loader from 'halogen/MoonLoader'
import style from './style'

export default function Loading() {
  return (
    <div class={style.loading}>
      <Loader color="#607D8B" size="60px" margin="4px" />
    </div>
  )
}
