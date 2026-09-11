import createDayFormat from "./types.js";
export default function groupDataIntoDays(result) {
    const timestamps = result.timestamp ?? [];

    let quote = result.indicators.quote?.[0];

    if (quote == null) {
        quote = {};
    }
    
    const low = quote.low === undefined ? [] : quote.low;
    const high = quote.high === undefined ? [] : quote.high;

    const timeZone = result.meta.exchangeTimezoneName;
    const dayFormat = createDayFormat(timeZone);

    const dataByDay = new Map();

    timestamps.forEach((value, index) => {
        const timestamp = value;
        if (timestamp == null) return;
        if (low[index] == null && high[index] == null) return;
        // If we only have one of the values, we can still use it.
        const partsOfDate = dayFormat.formatToParts(timestamp * 1000);
        const partValue = (type) => partsOfDate.find(part => part.type === type).value;
        const date = `${partValue("year")}-${partValue("month")}-${partValue("day")}`;

        let columns = dataByDay.get(date);

        if (!columns) {
            // Instantiate an empty array for the given date (day).
            columns = [];
            dataByDay.set(date, columns);
        }
        columns.push({ timestamp, low: low[index] == null ? 0 : low[index], high: high[index] == null ? 0 : high[index]});
    });

    return dataByDay;
}