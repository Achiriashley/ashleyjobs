
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export const notifier = new Notyf({
  duration: 3000,
  position: {
    x: "right",
    y: "top",
  },
});
