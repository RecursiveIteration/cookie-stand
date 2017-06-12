'use strict';

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var firstAndPike = {
  location: '1st and Pike',
  hourlySales: [],
  minCustomersPerHour: 23,
  maxCustomersPerHour: 65,
  avgCookiesPerCustomer: 6.3,
  calcHourlyCustomerCount: function() {
    return randomNumber(this.minCustomersPerHour, this.maxCustomersPerHour);
  },
  calcCookieSales: function() {
    return Math.ceil(this.avgCookiesPerCustomer * this.calcHourlyCustomerCount());
  },
  setHourlySales: function(hour) {
    this.hourlySales[hour] = this.calcCookieSales();
  }
};

var seaTacAirport = {
  location: 'SeaTac Airport',
  hourlySales: [],
  minCustomersPerHour: 3,
  maxCustomersPerHour: 24,
  avgCookiesPerCustomer: 1.2,
  calcHourlyCustomerCount: function() {
    return randomNumber(this.minCustomersPerHour, this.maxCustomersPerHour);
  },
  calcCookieSales: function() {
    return Math.ceil(this.avgCookiesPerCustomer * this.calcHourlyCustomerCount());
  },
  setHourlySales: function(hour) {
    this.hourlySales[hour] = this.calcCookieSales();
  }
};

var seattleCenter = {
  location: 'Seattle Center',
  hourlySales: [],
  minCustomersPerHour: 11,
  maxCustomersPerHour: 38,
  avgCookiesPerCustomer: 3.7,
  calcHourlyCustomerCount: function() {
    return randomNumber(this.minCustomersPerHour, this.maxCustomersPerHour);
  },
  calcCookieSales: function() {
    return Math.ceil(this.avgCookiesPerCustomer * this.calcHourlyCustomerCount());
  },
  setHourlySales: function(hour) {
    this.hourlySales[hour] = this.calcCookieSales();
  }
};

var capitalHill = {
  location: 'Capital Hill',
  hourlySales: [],
  minCustomersPerHour: 20,
  maxCustomersPerHour: 38,
  avgCookiesPerCustomer: 2.3,
  calcHourlyCustomerCount: function() {
    return randomNumber(this.minCustomersPerHour, this.maxCustomersPerHour);
  },
  calcCookieSales: function() {
    return Math.ceil(this.avgCookiesPerCustomer * this.calcHourlyCustomerCount());
  },
  setHourlySales: function(hour) {
    this.hourlySales[hour] = this.calcCookieSales();
  }
};

var alki = {
  location: 'Alki',
  hourlySales: [],
  minCustomersPerHour: 2,
  maxCustomersPerHour: 16,
  avgCookiesPerCustomer: 4.6,
  calcHourlyCustomerCount: function() {
    return randomNumber(this.minCustomersPerHour, this.maxCustomersPerHour);
  },
  calcCookieSales: function() {
    return Math.ceil(this.avgCookiesPerCustomer * this.calcHourlyCustomerCount());
  },
  setHourlySales: function(hour) {
    this.hourlySales[hour] = this.calcCookieSales();
  }
};

var stores = [
  firstAndPike,
  seaTacAirport,
  seattleCenter,
  capitalHill,
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
