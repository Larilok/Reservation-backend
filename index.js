'use strict';

const db = require('./db/db.js');
const LedgerEntryBuilder = require('./Builders/LedgerEntryBuilder.js');
const RetailItemBuilder = require('./Builders/RentalItemBuilder.js');

const base = new db();
let date = new Date();
let now = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
let inAYear = date.getFullYear('2020') + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();

let newEntry = new LedgerEntryBuilder();
newEntry.setAmountRented(1).setStartTime(now).setEndTime(inAYear).setPrice(1000).setRenterName('John')
.setRenterSurname('Doe').setRenterPhone('+380123456789').setRenterCardDetails('Some card').build();




base.close();
