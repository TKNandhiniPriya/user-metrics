const moment = require("moment");
const DatesMap = new Map();

DatesMap.set("1", {
  start: `${moment().year()}-01-01`,
  end: `${moment().year()}-01-31`,
  name: "january",
});
DatesMap.set("2", {
  start: `${moment().year()}-02-01`,
  end: `${moment().year()}-02-28`,
  name: "february",
});
DatesMap.set("3", {
  start: `${moment().year()}-03-01`,
  end: `${moment().year()}-03-31`,
  name: "march",
});
DatesMap.set("4", {
  start: `${moment().year()}-04-01`,
  end: `${moment().year()}-04-30`,
  name: "april",
});
DatesMap.set("5", {
  start: `${moment().year()}-05-01`,
  end: `${moment().year()}-05-31`,
  name: "may",
});
DatesMap.set("6", {
  start: `${moment().year()}-06-01`,
  end: `${moment().year()}-06-30`,
  name: "june",
});
DatesMap.set("7", {
  start: `${moment().year()}-07-01`,
  end: `${moment().year()}-07-31`,
  name: "july",
});
DatesMap.set("8", {
  start: `${moment().year()}-08-01`,
  end: `${moment().year()}-08-31`,
  name: "august",
});
DatesMap.set("9", {
  start: `${moment().year()}-09-01`,
  end: `${moment().year()}-09-30`,
  name: "september",
});
DatesMap.set("10", {
  start: `${moment().year()}-10-01`,
  end: `${moment().year()}-10-31`,
  name: "october",
});
DatesMap.set("11", {
  start: `${moment().year()}-11-01`,
  end: `${moment().year()}-11-30`,
  name: "november",
});
DatesMap.set("12", {
  start: `${moment().year()}-12-01`,
  end: `${moment().year()}-12-31`,
  name: "december",
});

module.exports = { DatesMap };
