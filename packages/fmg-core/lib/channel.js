'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Channel = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require('./utils');

var _web3Utils = require('web3-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Channel = function () {
  function Channel(channelType, channelNonce, participants) {
    (0, _classCallCheck3.default)(this, Channel);

    this.channelType = channelType;
    this.channelNonce = channelNonce;
    this.participants = participants;
  }

  (0, _createClass3.default)(Channel, [{
    key: 'toHex',
    value: function toHex() {
      return (0, _utils.padBytes32)(this.channelType) + (0, _utils.toHex32)(this.channelNonce).substr(2) + (0, _utils.toHex32)(this.numberOfParticipants).substr(2) + this.participants.map(function (x) {
        return (0, _utils.padBytes32)(x).substr(2);
      }).join("");
    }
  }, {
    key: 'numberOfParticipants',
    get: function get() {
      return this.participants.length;
    }
  }, {
    key: 'id',
    get: function get() {
      return (0, _web3Utils.soliditySha3)({ type: 'address', value: this.channelType }, { type: 'uint256', value: this.channelNonce }, { type: 'address[]', value: this.participants });
    }
  }]);
  return Channel;
}();

exports.Channel = Channel;