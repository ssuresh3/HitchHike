const fs = require('fs');
const db = require('../db');

var mockData = require('./mock_data.json')
var user = mockData['user']

// test new user
test('the data is a new user', () => {
  expect(db.newUser(user.fName, user.lName, user.username, user.password, user.email, user.pNumber, user.DOB).email).toBe('chartsoo@ucsc.edu')
});

// test get user
test('the data is a new user', () => {
  expect(db.getUser(user.username).email).toBe('chartsoo@ucsc.edu')
});

// update user
test('the data is a new user', () => {
  expect(db.updateUser("Chard", user.lName, user.username, user.password, user.email, user.pNumber, user.DOB).fName).toBe('Chard')
});

