// const getStartOfDayLocal(date) {
//     const start = new Date(date);
//     start.setHours(0, 0, 0, 0);
//     return start;
// }

// function toGMT(date) {
//     return new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
// }

// function getGMTDatesForLocalDay(localDate) {
//     const startOfDayLocal = getStartOfDayLocal(localDate);
//     const endOfDayLocal = localDate;

//     const startGMT = toGMT(startOfDayLocal);
//     const endGMT = toGMT(endOfDayLocal);

//     const startGMTDateStr = startGMT.toISOString().split('T')[0];
//     const endGMTDateStr = endGMT.toISOString().split('T')[0];

//     if (startGMTDateStr === endGMTDateStr) {
//         return [startGMTDateStr];
//     } else {
//         return [startGMTDateStr, endGMTDateStr];
//     }
// }
export const getDateRangeForAPI = () => {
    const now = new Date();

    const timezoneOffsetHours = now.getTimezoneOffset() / 60;
    const timezoneOffsetSign = timezoneOffsetHours > 0 ? '+' : '-';

    const startOfDayLocal = new Date(now);
    startOfDayLocal.setHours(0, 0, 0, 0);

    const startOfDayGMT = new Date(startOfDayLocal.getTime() + (now.getTimezoneOffset() * 60000));

    const apiStartDate = new Date(startOfDayGMT);

    if (startOfDayGMT.getUTCHours() > 0) {
        apiStartDate.setUTCDate(apiStartDate.getUTCDate() - 1);
    }

    const nowGMT = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

    return {
        from: apiStartDate.toISOString().split('T')[0],
        to: nowGMT.toISOString().split('T')[0],
        localStart: startOfDayLocal,
        localEnd: now,
        gmtStart: startOfDayGMT,
        gmtEnd: nowGMT,
        timezoneOffset: `${timezoneOffsetSign}${String(Math.abs(timezoneOffsetHours)).padStart(2, '0')}:00`,
    }
}