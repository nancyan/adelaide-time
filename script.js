const ADELAIDE_TIME_ZONE = "Australia/Adelaide";

const clock = document.querySelector("#clock");
const date = document.querySelector("#date");
const offset = document.querySelector("#offset");

const timeFormatter = new Intl.DateTimeFormat("en-AU", {
  timeZone: ADELAIDE_TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

const dateFormatter = new Intl.DateTimeFormat("en-AU", {
  timeZone: ADELAIDE_TIME_ZONE,
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const offsetFormatter = new Intl.DateTimeFormat("en-AU", {
  timeZone: ADELAIDE_TIME_ZONE,
  timeZoneName: "longOffset",
});

function updateClock() {
  const now = new Date();
  const currentTime = timeFormatter.format(now);

  clock.textContent = currentTime;
  clock.dateTime = now.toISOString();
  date.textContent = dateFormatter.format(now);

  const offsetPart = offsetFormatter
    .formatToParts(now)
    .find((part) => part.type === "timeZoneName");

  offset.textContent = offsetPart?.value.replace("GMT", "UTC") ?? "Local time";
  document.title = `${currentTime} — Adelaide`;
}

updateClock();
setInterval(updateClock, 250);
