"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePostCall = exports.makeGetCall = void 0;
var http_1 = __importDefault(require("k6/http"));
var k6_1 = require("k6");
function checkIfApiIsSuccessful(response) {
    k6_1.check(response, { 'request succeeded': function (r) { return r.status >= 200; } });
    if (response.status >= 400) {
        k6_1.fail(response.request.method + " - " + response.request.url + " request failed with status code " + response.status);
    }
}
function makeGetCall(url, params) {
    var response = http_1.default.get(url, params);
    checkIfApiIsSuccessful(response);
}
exports.makeGetCall = makeGetCall;
function makePostCall(url, body, params) {
    var response = http_1.default.post(url, body, params);
    checkIfApiIsSuccessful(response);
}
exports.makePostCall = makePostCall;
