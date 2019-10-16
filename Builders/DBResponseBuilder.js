'use strict';

const DBResponse = require('./DBResponse.js');

class DBResponseBuilder {
  constructor(props = {
    Id: null,
    Name: null,
    Description: null,
    Price: null,
    AmInStock: null
  }) {
    this.item = new DBResponse(props);
  }
  setId(Id) {
    this.item.Id = Id;
    return this;
  }
  setName(Name) {
    this.item.Name = Name;
    return this;
  }
  setDescription(Description) {
    this.item.Description = Description;
    return this;
  }
  setPrice(Price) {
    this.item.Price = Price;
    return this;
  }
  setAmInStock(AmInStock) {
    this.item.AmInStock = AmInStock;
    return this;
  }
  build() {return this.item}
}

module.exports = DBResponseBuilder;
