export default function createDayFormat(timeZone) {
    return new Intl.DateTimeFormat("en-US", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
        // This is an explicit format in the style of dataStyle: "short". It's written in this way to be readable and clear to future developers.
    });
}