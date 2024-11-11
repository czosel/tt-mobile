const DOCS_ORIGIN = import.meta.env.PREACT_APP_DOCS;

export default function Embed({ param, url }) {
  return (
    <p class="has-text-right">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`${DOCS_ORIGIN}/?${param}=${encodeURIComponent(url)}`}
      >
        <i class="icon-code" />
        Einbetten
      </a>
    </p>
  );
}
