import style from "./style";
import { BounceLoader } from "react-spinners";

export default function Loading({ center = false }) {
  return (
    <div class={center ? style.base + " " + style.center : style.base}>
      <BounceLoader color="#607D8B" />
    </div>
  );
}
