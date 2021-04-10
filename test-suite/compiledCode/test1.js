"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
var http_1 = __importDefault(require("k6/http"));
exports.options = {
    vus: 4,
    duration: '10s'
};
function default_1() {
    var params = {
        headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
        }
    };
    // const response:RefinedResponse<'text'> =
    // console.log(response.body)
    // console.log(response.status)
    http_1.default.get("https://katalon-demo-cura.herokuapp.com/", params);
    http_1.default.get("https://katalon-demo-cura.herokuapp.com/profile.php", params);
    http_1.default.post("https://katalon-demo-cura.herokuapp.com/authenticate.php", "username=John+Doe&password=ThisIsNotAPassword", params);
}
exports.default = default_1;
