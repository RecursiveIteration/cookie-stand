'use strict';

var firstHourOfBusiness = 8; //8:00 am
var lastHourOfBusiness = 19; //7 pm

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

Bakery.prototype.setHourlySales = function(hour) {
  this.hourlySales[hour] = this.createCookieSales();
};

Bakery.prototype.render = function() {
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
    for (var j = firstHourOfBusiness; j <= lastHourOfBusiness; j++) {
      storeList[i].setHourlySales(j);
    }
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
  var grandTotal = 0; //sales for all hours of all stores
  var footerRow = document.createElement('tr');
  addElement(footerRow, 'th', 'Total Hourly Sales');
  for (var time = firstHourOfBusiness; time <= lastHourOfBusiness; time++) {
    var totalSales = 0; //Sales for all stores for *each* hour
    for (var store in stores) {
      totalSales += stores[store].hourlySales[time];
    }
    grandTotal += totalSales;
    addElement(footerRow, 'td', totalSales);
  }
  addElement(footerRow, 'td', grandTotal);
  tFoot.appendChild(footerRow);
}

table.appendChild(tHead);
table.appendChild(tBody);
table.appendChild(tFoot);
parentEl.appendChild(table);

function addElement (parent, elementType, value) {
  var el = document.createElement(elementType);
  el.textContent = value;
  parent.appendChild(el);
}
