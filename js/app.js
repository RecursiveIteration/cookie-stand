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
