import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export const mileSecondsToText = (
  ms: number,
  banTime: number,
  dateMS: number
) => {
  const days = moment(banTime).diff(moment(dateMS), 'days') || '';
  const seconds = ` ${moment.duration(ms).seconds()} с.`;
  const minutes = moment.duration(ms).minutes() || '';
  const hours = moment.duration(ms).hours() || '';

  return (
    (days && ` ${days} д. `) +
    '' +
    (hours && ` ${hours} ч. `) +
    '' +
    (minutes && ` ${minutes} м. `) +
    seconds
  );
};
