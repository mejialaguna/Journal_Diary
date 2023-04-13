import { useMemo } from "react";

export const dateFormatter = (date) => {
  const formattedDate = useMemo(() => {
    const convertedDate = new Date(date);
    const localDate = convertedDate.toDateString();
    const hours = convertedDate.getHours();
    const minutes = convertedDate.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const twelveHourFormat = hours % 12 || 12;
    const formattedTime = `${twelveHourFormat}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${ampm}`;

    const time = `${localDate} ${formattedTime}`;
    return time;
  }, [date]);

  return formattedDate;
};
