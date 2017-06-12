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
    hourlySales[hour] = this.calcCookieSales();
  }
};

for (var i = 0; i < 15; i++) {
  console.log(firstAndPike.calcCookieSales());
}
