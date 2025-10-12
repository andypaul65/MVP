const { Given, When, Then } = require('@cucumber/cucumber');

Given('a namespace {string} exists', function (namespace) {
  // Stub: Mock namespace existence
});

When('I send a message with content {string} to namespace {string}', function (content, namespace) {
  // Stub: Simulate message send
});

Then('the server should accept the message', function () {
  // Stub: Assert acceptance
});

Then('respond with {int} Accepted', function (statusCode) {
  // Stub: Assert status
});

Then('the client should confirm the message was sent', function () {
  // Stub: Assert confirmation
});

When('I send a message with invalid JSON', function () {
  // Stub: Simulate invalid send
});

Then('I should receive a {int} Bad Request response', function (statusCode) {
  // Stub: Assert bad request
});