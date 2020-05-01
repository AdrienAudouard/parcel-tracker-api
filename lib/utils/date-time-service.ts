import DateAndTime from 'date-and-time';

class DateTimeService {
    upsDateToDate(date: string) {
        return DateAndTime.parse(date, 'DD/MM/YYYY h:mm');
    }

    toDateString(date: Date) {
        return DateAndTime.format(date, 'DD MMMM YYYY');
    }

    toDateTimeString(date: Date) {
        return DateAndTime.format(date, 'DD MMMM YYYY HH:mm');
    }
}

export default new DateTimeService();
