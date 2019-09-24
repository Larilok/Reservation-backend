'use strict';

const LedgerEntry = require('./LedgerEntry.js');

class LedgerEntryBuilder {
  constructor(props = {
    // id: null,
    amountRented: null,
    startTime: null,
    endTime: null,
    price: null,
    renterName: null,
    renterSurname: null,
    renterPhone: null,
    renterCardDetails: null
  }) {
    this.item = new LedgerEntry(props);
  }
  // setId(id) {this.item.id = id}
  setAmountRented(amountRented) {
    this.item.amountRented = amountRented;
    return this;
  }
  setStartTime(startTime) {
    this.item.startTime = startTime;
    return this;
  }
  setEndTime(endTime) {
    this.item.endTime = endTime;
    return this;
  }
  setPrice(price) {
    this.item.price = price;
    return this;
  }
  setRenterName(renterName) {
    this.item.renterName = renterName;
    return this;
  }
  setRenterSurname(renterSurname) {
    this.item.renterSurname = renterSurname;
    return this;
  }
  setRenterPhone(renterPhone) {
    this.item.renterPhone = renterPhone;
    return this;
  }
  setRenterCardDetails(renterCardDetails) {
    this.item.renterCardDetails = renterCardDetails;
    return this;
  }
  build() {return this.item}
}

module.exports = LedgerEntryBuilder;
