import { h, Component } from 'preact'
import Loader from 'halogen/DotLoader'

export default function Loading() {
  return (
    <div class="loading">
      <Loader color="#607D8B" size="60px" margin="4px" />
    </div>
  )
}
