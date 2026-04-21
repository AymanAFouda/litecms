import { formatInTimeZone } from "date-fns-tz";

const dateFormat = (dateString) => {
    return new Date(dateString).toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export default dateFormat;
