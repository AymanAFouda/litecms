import { formatInTimeZone } from "date-fns-tz";

const dateFormat = (date) => {
  return formatInTimeZone(date, "America/New_York", "HH:mm - dd MMM yyyy");
};

export default dateFormat;
