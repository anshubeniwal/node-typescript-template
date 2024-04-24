import * as dateFns from 'date-fns';

export const isValidISOString = (dateString: string) => {
  const parsedDate = dateFns.parseISO(dateString);
  if (dateFns.isValid(parsedDate)) {
    return true;
  }
  false;
};

export const getSqlDateTimeFromISOString = (dateString: string) => {
  /**
   * Convert ISO string to JS date to get date in UTC format.
   * Convert JS Date to ISO string and convert it to sql DateTime.
   */
  const parsedDate = dateFns.parseISO(dateString);
  return parsedDate.toJSON().slice(0, 19).replace('T', ' ');
};
