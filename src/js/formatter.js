
import { DateTimeFormatter } from '@js-joda/core';

export const TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm")
export const DATE_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yyyy")

export const PT_REGEX = /PT(\d\d?H)?(\d\d?M)?([\d\.S]+)?/gi

export function formatDuration( duration ) {
  let formattedDuration = duration.toString()
  console.log(formattedDuration)

  const matches = PT_REGEX.exec(formattedDuration)
  PT_REGEX.lastIndex = 0;  // Reset
  
  console.log(matches)
  if (!matches) {
    return "Gerade eben"
  }

  let hours = matches[1]
  let minutes = matches[2]
  let seconds = matches[3]

  formattedDuration = ""
  if (hours) {
    hours = hours.replace("H", "h")
    formattedDuration = hours;
  }
  if (minutes) {
    minutes = minutes.replace("M", "min");
    if (hours) {
      formattedDuration += " "
    }
    formattedDuration += minutes
  }
  if (seconds && !(hours || minutes)) {
    seconds = seconds.substring(0, seconds.indexOf('.')) + "sec"
    formattedDuration = seconds
  }

  return formattedDuration
}