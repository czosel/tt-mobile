export default function Card({ name, children, closeable, onClose }) {
  return (
    <div class="card">
      <header class="card-header">
        <h2 class="card-header-title">{name}</h2>
        {closeable && (
          <a
            onClick={onClose}
            class="card-header-icon"
            aria-label="remove personalization"
          >
            <span class="icon">
              <i class="icon-cancel" />
            </span>
          </a>
        )}
      </header>
      <div class="card-content">{children}</div>
    </div>
  );
}
