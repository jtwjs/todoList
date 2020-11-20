"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepare = void 0;
var prepare = {
  obj: {
    form: document.querySelector('.prepare-form'),
    inputName: document.querySelector('#input--name'),
    createBtn: document.querySelector('.continue-btn')
  },
  registerName: function registerName(storageName, name) {
    localStorage.setItem(storageName, name);
  }
};
exports.prepare = prepare;