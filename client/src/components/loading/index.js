import Loader from 'halogen/MoonLoader'
import style from './style'

export default function Loading({ center = false }) {
  return (
    <div class={center ? style.base + ' ' + style.center : style.base}>
      <Loader color="#607D8B" size="60px" margin="4px" />
    </div>
  )
}
