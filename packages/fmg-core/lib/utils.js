"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toHex32 = toHex32;
exports.padBytes32 = padBytes32;
exports.toPaddedHexString = toPaddedHexString;
function toHex32(num) {
  return "0x" + toPaddedHexString(num, 64);
}

function padBytes32(data) {
  var l = 66 - data.length;
  var x = data.substr(2, data.length);

  for (var i = 0; i < l; i++) {
    x = 0 + x;
  }
  return '0x' + x;
}

// https://stackoverflow.com/a/42203200
function toPaddedHexString(num, len) {
  var str = num.toString(16);
  return "0".repeat(len - str.length) + str;
}