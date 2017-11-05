import { h, Component } from 'preact'

export default function Card({ name, children }) {
  return (
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">{name}</p>
      </header>
      <div class="card-content">{children}</div>
    </div>
  )
}
