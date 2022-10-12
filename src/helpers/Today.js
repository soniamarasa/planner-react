import { format } from 'date-fns';

let weekDay = format(new Date(), 'EEEE', {});
let wD = '';

export const Today = () => {
  const day = format(new Date(), 'dd');
  const month = format(new Date(), 'LLLL', {});
  const year = format(new Date(), 'yyyy');

  wD = weekDay?.split('-')[0];
  weekDay = weekDay.charAt(0).toUpperCase() + weekDay.slice(1);

  return weekDay + ' ' + day + ', ' + month + ', ' + year;
};
