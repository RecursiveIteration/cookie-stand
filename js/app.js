'use strict';

var firstHourOfBusiness = 8; //8:00 am
var lastHourOfBusiness = 19; //7 pm
var footerSums = []; //array to store elements of the table footer for hourly sales totals.

function randomNumber (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Bakery (location, minCustomersPerHour, maxCustomersPerHour, avgCookiesPerCustomer) {
  this.location = location;
  this.minCustomersPerHour = minCustomersPerHour;
  this.maxCustomersPerHour = maxCustomersPerHour;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.hourlySales = [];
}

Bakery.prototype.createHourlyCustomerCount = function () {
  return randomNumber(this.minCustomersPerHour, this.maxCustomersPerHour);
};

Bakery.prototype.createCookieSales = function () {
  return Math.ceil(this.avgCookiesPerCustomer * this.createHourlyCustomerCount());
};

Bakery.prototype.setHourlySales = function (hour) {
  this.hourlySales[hour] = this.createCookieSales();
};

Bakery.prototype.setDailySales = function () {
  for(var i = firstHourOfBusiness; i <= lastHourOfBusiness; i++) {
    this.setHourlySales(i);
  }
};

Bakery.prototype.render = function () {
  var totalSales = 0;
  var tR = document.createElement('tr');
  addElement(tR, 'th', this.location);
  for (var time = firstHourOfBusiness; time <= lastHourOfBusiness; time++) {
    totalSales += this.hourlySales[time];
    addElement(tR, 'td', this.hourlySales[time]);
  }
  addElement(tR, 'td', totalSales);
  tBody.appendChild(tR);
};

var firstAndPike = new Bakery ('1st and Pike', 23, 65, 6.3);
var seaTacAirport = new Bakery ('SeaTac Airport', 3, 24, 1.2);
var seattleCenter = new Bakery ('Seattle Center', 11, 38, 3.7);
var capitolHill = new Bakery ('Capitol Hill', 20, 38, 2.3);
var alki = new Bakery ('Alki', 2, 16, 4.6);

var stores = [
  firstAndPike,
  seaTacAirport,
  seattleCenter,
  capitolHill,
  alki
];

function setAllSales (storeList) {
  for (var i in storeList) {
    storeList[i].setDailySales();
  }
}

function getHourAsText (hour) {
  if (hour < 12) {
    return hour + ':00 am';
  } else if (hour == 12) {
    return hour + ':00 pm';
  } else {
    return (hour - 12) + ':00 pm';
  }
}

setAllSales(stores);

var parentEl = document.getElementById('storeSales');
addElement(parentEl, 'h2', 'Cookies Needed by Location and by Hour');
var table = document.createElement('table');
var tHead = document.createElement('thead');
var tBody = document.createElement('tbody');
var tFoot = document.createElement('tfoot');

createTableHeader();
createTableBody();
createTableFooter();

//Create the table's header row
function createTableHeader() {
  var headerRow = document.createElement('tr');
  addElement(headerRow, 'th', '');
  for (var time = firstHourOfBusiness; time <= lastHourOfBusiness; time++) {
    addElement(headerRow, 'th', getHourAsText(time));
  }
  addElement(headerRow, 'th', 'Total Daily Sales');
  tHead.appendChild(headerRow);
}

//Create the body of the table
function createTableBody() {
  for (var store in stores) {
    stores[store].render();
  }
}

//Create the table's footer
function createTableFooter() {
  var footerRow = document.createElement('tr');
  addElement(footerRow, 'th', 'Total Hourly Sales');
  for (var time = firstHourOfBusiness; time <= lastHourOfBusiness; time++) {
    footerSums[time] = addElement(footerRow, 'td', '');
  }
  updateFooter();
  tFoot.appendChild(footerRow);
}

function updateFooter() {
  for (var time = firstHourOfBusiness; time <= lastHourOfBusiness; time++) {
    var hourlyTotal = 0;
    for (var store in stores) {
      hourlyTotal += stores[store].hourlySales[time];
    }
    footerSums[time].textContent = hourlyTotal;
  }
}

table.appendChild(tHead);
table.appendChild(tBody);
table.appendChild(tFoot);
parentEl.appendChild(table);

function addElement (parent, elementType, value) {
  var el = document.createElement(elementType);
  el.textContent = value;
  parent.appendChild(el);
  return el;
}

var addLocation = document.getElementById('addLocation');

addLocation.addEventListener('submit',
  function (e) {
    e.preventDefault();
    var location = e.target.location.value;
    if (!isValidLocation(location)) {
      return null;
    }
    var minCustomersPerHour = parseFloat(e.target.minCustomersPerHour.value);
    if (!isValidNumber(minCustomersPerHour)) {
      alert('Minimum Customers Per Hour must be a positive number.');
      return null;
    }
    var maxCustomersPerHour = parseFloat(e.target.maxCustomersPerHour.value);
    if (!isValidNumber(maxCustomersPerHour, minCustomersPerHour)) {
      alert('Maximum Customers Per Hour must be a positive number and must be greater than Minimum Customers Per Hour');
      return null;
    }
    var avgCookiesPerCustomer = parseFloat(e.target.avgCookiesPerCustomer.value);
    if (!isValidNumber(avgCookiesPerCustomer)) {
      alert('Average Cookies Purchased Per Customer must be a positive number.');
      return null;
    }
    var newLocation = new Bakery(location, minCustomersPerHour, maxCustomersPerHour, avgCookiesPerCustomer);
    newLocation.setDailySales();
    stores.push(newLocation);
    newLocation.render();
    updateFooter();
    addLocation.reset();
  }
);

function isValidLocation (location) {
  //check if name is blank
  if (!location) {
    alert('Please enter a location name.');
    return false;
  }
  //check if name already exists
  for (var store in stores) {
    if (stores[store].location.toLowerCase() === location.toLowerCase()) {
      alert('Please enter a unique name for this location.');
      return false;
    }
  }
  //name is ok
  return true;
}

function isValidNumber(number, minimum) {
  //No minimum specified, a positive number is expected.
  if (!minimum) {
    if (number <= 0) {
      return false;
    }
    return true;
  }
  //Minimum value was specified, number must be > minimum
  if (number <= minimum) {
    return false;
  }
  return true;
}





// blah
