import style from "./style.module.css";

export default function Table({ children }) {
  return (
    <div class={style.wrapper}>
      <table class="table is-hoverable is-fullwidth" {...{ children }} />
    </div>
  );
}
