'use strict';

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
    for (var j = 8; j <= 19; j++) {
      storeList[i].setHourlySales(j);
    }
  }
}

function getHourAsText(hour) {
  if (hour < 12) {
    return hour + 'am';
  } else if (hour == 12) {
    return hour + 'pm';
  } else {
    return (hour - 12) + 'pm';
  }
}

setAllSales(stores);

var parentEl = document.getElementById('storeSales');

function addStoreSales (store) {
  var div = document.createElement('div');
  div.setAttribute('class', 'salesData'); //may use later for css formatting
  parentEl.appendChild(div);
  var p = document.createElement('p');
  p.textContent = store.location;
  div.appendChild(p);
  //create the undordered list
  var ul = document.createElement('ul');
  div.appendChild(ul);
  var totalSales = 0;
  for (var i in store.hourlySales) {
    var li = document.createElement('li');
    li.textContent = getHourAsText(i) + ': ' + store.hourlySales[i] + ' cookies';
    ul.appendChild(li);
    totalSales += store.hourlySales[i];
  }
  li = document.createElement('li');
  li.textContent = 'Total: ' + totalSales + ' cookies';
  ul.appendChild(li);
}

for (var i in stores) {
  addStoreSales(stores[i]);
}
