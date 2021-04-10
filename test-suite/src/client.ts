import http from "k6/http";
import {check} from "k6";

const params = {
    headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
    },
    tags: {}
}

export function loginCuraHealthService() {
    params.tags = {type: "loginCuraHealthService"}
    http.get("https://katalon-demo-cura.herokuapp.com/", params)
    http.get("https://katalon-demo-cura.herokuapp.com/profile.php", params)
    const res = http.post("https://katalon-demo-cura.herokuapp.com/authenticate.php", "username=John+Doe&password=ThisIsNotAPassword", params)
    check(res, { 'status was 200': (r) => r.status == 200 });
    http.get("https://katalon-demo-cura.herokuapp.com/", params)
}

export function makeAppointment() {
    params.tags = {type: "makeAppointment"}
    const reqBody = JSON.stringify("facility=Tokyo+CURA+Healthcare+Center&hospital_readmission=Yes&programs=Medicare&visit_date=30%2F07%2F2021&comment=test")
    const res = http.post("https://katalon-demo-cura.herokuapp.com/appointment.php", reqBody, params)
    check(res, { 'status was 200': (r) => r.status == 200 });
}

export function navigateToWordpress() {
    params.tags = {type: "navigateToWordpress"}
    http.get("https://wordpress.loadtest.io/")
    http.get("https://wordpress.loadtest.io/product-category/accessories/", params)

}

export function addToCart(){
    params.tags = {type: "addToCart"}
    for(let i=1; i<=4; i++){
        let productId = 35
        const body = JSON.stringify(`product_sku=&product_id=${productId.toString()}&quantity=1`)
        http.post("https://wordpress.loadtest.io/?wc-ajax=add_to_cart", body, params)
        productId++
    }
}