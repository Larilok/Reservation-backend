'use strict';

const LedgerEntry = require('./LedgerEntry.js');

class LedgerEntryBuilder {
  constructor(props = {
    id: null,
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
  setId(id) {this.item.id = id}
  setAmountRented(amountRented) {this.item.amountRented = amountRented}
  setStartTime(startTime) {this.item.startTime = startTime}
  setEndTime(endTime) {this.item.endTime = endTime}
  setPrice(price) {this.item.price = price}
  setRenterName(renterName) {this.item.renterName = renterName}
  setRenterSurname(renterSurname) {this.item.renterSurname = renterSurname}
  setRenterPhone(renterPhone) {this.item.renterPhone = renterPhone}
  setRenterCardDetails(renterCardDetails) {this.item.renterCardDetails = renterCardDetails}
  build() {return this.item}
}

module.exports = LedgerEntryBuilder;
