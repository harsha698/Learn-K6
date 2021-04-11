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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComputers = exports.navigateToComputerSite = exports.addToCart = exports.navigateToWordpress = exports.makeAppointment = exports.loginCuraHealthService = void 0;
var http_1 = __importDefault(require("k6/http"));
var k6_1 = require("k6");
var requestHelper_js_1 = require("./requestHelper.js");
var config = __importStar(require("./config.js"));
var params = {
    headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
    },
    tags: {}
};
function loginCuraHealthService() {
    params.tags = { type: "loginCuraHealthService" };
    http_1.default.get(config.herokuBaseUrl, params);
    http_1.default.get(config.herokuBaseUrl + "profile.php", params);
    var res = http_1.default.post(config.herokuBaseUrl + "authenticate.php", "username=John+Doe&password=ThisIsNotAPassword", params);
    k6_1.check(res, { 'status was 200': function (r) { return r.status == 200; } });
    http_1.default.get("" + config.herokuBaseUrl, params);
}
exports.loginCuraHealthService = loginCuraHealthService;
function makeAppointment() {
    params.tags = { type: "makeAppointment" };
    var reqBody = JSON.stringify("facility=Tokyo+CURA+Healthcare+Center&hospital_readmission=Yes&programs=Medicare&visit_date=30%2F07%2F2021&comment=test");
    var res = http_1.default.post(config.herokuBaseUrl + "appointment.php", reqBody, params);
    k6_1.check(res, { 'status was 200': function (r) { return r.status == 200; } });
}
exports.makeAppointment = makeAppointment;
function navigateToWordpress() {
    params.tags = { type: "navigateToWordpress" };
    http_1.default.get("" + config.wordPressbaseUrl);
    http_1.default.get(config.wordPressbaseUrl + "product-category/accessories/", params);
}
exports.navigateToWordpress = navigateToWordpress;
function addToCart() {
    params.tags = { type: "addToCart" };
    for (var i = 1; i <= 4; i++) {
        var productId = 35;
        var body = JSON.stringify("product_sku=&product_id=" + productId.toString() + "&quantity=1");
        requestHelper_js_1.makePostCall(config.wordPressbaseUrl + "?wc-ajax=add_to_cart", body, params);
        productId++;
    }
}
exports.addToCart = addToCart;
function navigateToComputerSite() {
    params.tags = { type: "navigateToComputerSite" };
    requestHelper_js_1.makeGetCall("" + config.computerSiteBaseUrl, params);
}
exports.navigateToComputerSite = navigateToComputerSite;
function getComputers(computerId) {
    params.tags = { type: "getComputers" };
    requestHelper_js_1.makeGetCall(config.computerSiteBaseUrl + "/" + computerId, params);
}
exports.getComputers = getComputers;
