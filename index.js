#! /usr/bin/env node

var nodemailer = require('nodemailer');
var prompt = require('prompt');

// change personal.json to config.json with your credentials
var config = require('./config/personal.json');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.user,
    pass: config.pass
  }
});

var to, attachment, subject;


var message;

/*
*   List of properties for the prompt.
*/
var properties = [{
  name: 'to',
  warning: 'Must be a valid email address',
  required: true
}, {
  name: 'subject',
  required: false
}, {
  name: 'attachment',
  required: false
}, {
  name: 'message',
  warning: 'Come on, at least give a greeting',
  required: true
}];

// Pretty prompt
prompt.message = "mail";
prompt.delimiter = ".";
prompt.colors = false;

prompt.start();

prompt.get(properties, function(err, result) {
  if (err) {
    return onErr(err);
  }

  transporter.sendMail({
    to: result.to,
    subject: result.subject,
    text: result.message,
    attachments: [{
      path: result.attachment
    }]
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Mail sent");
    }
  });
});

function onErr(err) {
    console.log(err);
    return 1;
  }
