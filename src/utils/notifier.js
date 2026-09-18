
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

let notyf;
function getNotyf() {
  if (!notyf) {
    notyf = new Notyf({
      duration: 3000,
      position: {
        x: "right",
        y: "top",
      },
    });
  }
  return notyf;
}

export const notifier = {
  success: (...args) => getNotyf().success(...args),
  error: (...args) => getNotyf().error(...args),
  open: (...args) => getNotyf().open(...args),
  dismiss: (...args) => getNotyf().dismiss(...args),
  dismissAll: (...args) => getNotyf().dismissAll(...args),
};
