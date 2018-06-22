'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.State = undefined;

var _freeze = require('babel-runtime/core-js/object/freeze');

var _freeze2 = _interopRequireDefault(_freeze);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var State = function () {
  function State(_ref) {
    var channel = _ref.channel,
        stateType = _ref.stateType,
        turnNum = _ref.turnNum,
        resolution = _ref.resolution,
        stateCount = _ref.stateCount;
    (0, _classCallCheck3.default)(this, State);

    this.channel = channel;
    this.stateType = stateType;
    this.turnNum = turnNum;
    this.resolution = resolution;
    this.stateCount = stateCount || 0;
  }

  (0, _createClass3.default)(State, [{
    key: 'toHex',
    value: function toHex() {
      return this.channel.toHex() + (0, _utils.toHex32)(this.stateType).substr(2) + (0, _utils.toHex32)(this.turnNum).substr(2) + (0, _utils.toHex32)(this.stateCount).substr(2) + this.resolution.map(function (x) {
        return (0, _utils.toHex32)(x).substr(2);
      }).join("");
    }
  }, {
    key: 'sign',
    value: function sign(account) {
      var digest = web3.sha3(this.toHex(), { encoding: 'hex' }).substr(2);
      var sig = web3.eth.sign(account, digest).slice(2);
      var r = '0x' + sig.slice(0, 64);
      var s = '0x' + sig.slice(64, 128);
      var v = web3.toDecimal(sig.slice(128, 130)) + 27;

      return [r, s, v];
    }
  }, {
    key: 'numberOfParticipants',
    get: function get() {
      return this.channel.numberOfParticipants;
    }
  }, {
    key: 'mover',
    get: function get() {
      return this.channel.participants[this.turnNum % this.numberOfParticipants];
    }
  }]);
  return State;
}();

State.StateTypes = {
  PREFUNDSETUP: 0,
  POSTFUNDSETUP: 1,
  GAME: 2,
  CONCLUDE: 3
};

(0, _freeze2.default)(State.StateTypes);

exports.State = State;