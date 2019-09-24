'use strict';

const RentalItem = require('./RentalItem.js');

class RentalItemBuilder {
  constructor(props = {
    name: null,
    description: null,
    totalAmount: null,
    pricePerH: null
  }) {
    this.item = new RentalItem(props);
  }
  setName(name) {
    this.item.name = name;
    return this;
  }

  setDescription(description) {
    this.item.description = description;
    return this;
  }

  setAmount(amount) {
    this.item.amount = amount;
    return this;
  }

  setPrice(price) {
    this.item.price = price;
    return this;
  }
  
  build() {return this.item}
}

module.exports = RentalItemBuilder;
