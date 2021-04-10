"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = exports.navigateToWordpress = exports.makeAppointment = exports.loginCuraHealthService = void 0;
var http_1 = __importDefault(require("k6/http"));
var k6_1 = require("k6");
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
    http_1.default.get("https://katalon-demo-cura.herokuapp.com/", params);
    http_1.default.get("https://katalon-demo-cura.herokuapp.com/profile.php", params);
    var res = http_1.default.post("https://katalon-demo-cura.herokuapp.com/authenticate.php", "username=John+Doe&password=ThisIsNotAPassword", params);
    k6_1.check(res, { 'status was 200': function (r) { return r.status == 200; } });
    http_1.default.get("https://katalon-demo-cura.herokuapp.com/", params);
}
exports.loginCuraHealthService = loginCuraHealthService;
function makeAppointment() {
    params.tags = { type: "makeAppointment" };
    var reqBody = JSON.stringify("facility=Tokyo+CURA+Healthcare+Center&hospital_readmission=Yes&programs=Medicare&visit_date=30%2F07%2F2021&comment=test");
    var res = http_1.default.post("https://katalon-demo-cura.herokuapp.com/appointment.php", reqBody, params);
    k6_1.check(res, { 'status was 200': function (r) { return r.status == 200; } });
}
exports.makeAppointment = makeAppointment;
function navigateToWordpress() {
    params.tags = { type: "navigateToWordpress" };
    http_1.default.get("https://wordpress.loadtest.io/");
    http_1.default.get("https://wordpress.loadtest.io/product-category/accessories/", params);
}
exports.navigateToWordpress = navigateToWordpress;
function addToCart() {
    params.tags = { type: "addToCart" };
    for (var i = 1; i <= 4; i++) {
        var productId = 35;
        var body = JSON.stringify("product_sku=&product_id=" + productId.toString() + "&quantity=1");
        http_1.default.post("https://wordpress.loadtest.io/?wc-ajax=add_to_cart", body, params);
        productId++;
    }
}
exports.addToCart = addToCart;
