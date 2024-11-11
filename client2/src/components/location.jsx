export default function Location({ name }) {
  const link = "https://maps.google.com/?q=" + name;
  return (
    <p>
      <a href={link} target="_blank" rel="noreferrer">
        <i class="icon-location" style="font-size:1.5em" />
        {name}
      </a>
    </p>
  );
}
