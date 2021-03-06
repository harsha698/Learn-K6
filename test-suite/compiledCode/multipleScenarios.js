"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readComputerDetails = exports.addToCart = exports.bookAppointment = exports.options = void 0;
var client = __importStar(require("./client.js"));
var computerList = JSON.parse(open('../../test-data/computerList.json'));
exports.options = {
    scenarios: {
        book_appointment: {
            executor: 'per-vu-iterations',
            vus: 2,
            iterations: 2,
            maxDuration: '10s',
            exec: 'bookAppointment'
        },
        add_to_cart: {
            executor: 'shared-iterations',
            vus: 2,
            iterations: 2,
            maxDuration: '10s',
            exec: 'addToCart'
        },
        read_computer_details: {
            executor: 'shared-iterations',
            vus: 2,
            iterations: 2,
            maxDuration: '10s',
            exec: 'readComputerDetails'
        }
    },
    thresholds: {
        checks: ['rate>=1'],
        'http_req_duration{type:loginCuraHealthService}': ['p(95)<4000'],
        'http_req_duration{type:makeAppointment}': ['p(95)<4000'],
        'http_req_duration{type:navigateToWordpress}': ['p(95)<4000'],
        'http_req_duration{type:addToCart}': ['p(95)<4000'],
        'http_req_duration{type:navigateToComputerSite}': ['p(95)<4000'],
        'http_req_duration{type:getComputers}': ['p(95)<4000']
    }
};
function bookAppointment() {
    client.loginCuraHealthService();
    client.makeAppointment();
}
exports.bookAppointment = bookAppointment;
function addToCart() {
    client.navigateToWordpress();
    client.addToCart();
}
exports.addToCart = addToCart;
function readComputerDetails() {
    client.navigateToComputerSite();
    for (var i = 0; i < computerList.length; i++) {
        client.getComputers(computerList[i]);
    }
}
exports.readComputerDetails = readComputerDetails;
