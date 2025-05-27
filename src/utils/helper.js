import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";

//timeAgo function
export function timeAgo(dateString) {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true }).replace(
    /^(about|almost|over|less than) /,
    ""
  );
}

//number formatter to convert larger views number to compact format
export function formatCompact(number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);
}

//toast
// export function toastDisplay(msg, type) {
//   toast[type](msg, {
//     position: "top-center",
//     autoClose: 1000,
//   });
// }
