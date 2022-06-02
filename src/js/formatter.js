
import { DateTimeFormatter } from '@js-joda/core';
export const TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm")

export function formatDuration( duration ) {
  var durationText = new Date(duration.seconds() * 1000).toISOString().slice(11, 16)
  var split = durationText.split(':')

  var formattedDuration = ""
  if (parseInt(split[0]) > 0) {
    formattedDuration += parseInt(split[0]) + "h "
  }
  if (parseInt(split[1]) > 0) {
    formattedDuration += parseInt(split[1]) + "min"
  }
  if (!formattedDuration.length) {
    formattedDuration = "gerade eben"
  }
  return formattedDuration
}