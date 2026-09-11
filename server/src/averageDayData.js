export default function averageDayData(dataByDay) {
    const averageData = [];

    dataByDay.forEach((day, date) => {
        const {low = 0, high = 0, missingLow = 0, missingHigh = 0} = day.reduce(({low, high}, currentDay) => {
            low += (currentDay.low == null ? 0 : currentDay.low);
            if (currentDay.low == null) missingLow++;
            high += (currentDay.high == null ? 0 : currentDay.high); 
            if (currentDay.high == null) missingHigh++;
            return {low, high};
        }, {low: 0, high: 0});
        averageData.push({
            date,
            lowAverage: low / (day.length - missingLow),
            highAverage: high / (day.length - missingHigh)
        })
    });
    return averageData;
}