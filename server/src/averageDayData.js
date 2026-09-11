export default function averageDayData(dataByDay) {
    const averageData = [];

    dataByDay.forEach((day, date) => {
        let missingLow = 0;
        let missingHigh = 0;
        const {low = 0, high = 0, volume = 0} = day.reduce(({low, high, volume}, currentDay) => {
            low += (currentDay.low == undefined ? 0 : currentDay.low);
            if (currentDay.low == undefined) missingLow++;
            
            high += (currentDay.high == undefined ? 0 : currentDay.high); 
            if (currentDay.high == undefined) missingHigh++;
            
            // Redundant volume check, if data always comes from groupDataIntoDays.
            volume += (currentDay.volume == undefined ? 0 : currentDay.volume);

            return {low, high, volume};

        });
        averageData.push({
            date,
            lowAverage: low / (day.length - missingLow),
            highAverage: high / (day.length - missingHigh),
            volume: volume
        })
    });
    return averageData;
}