import http, {RefinedResponse} from "k6/http";
import {check, fail} from "k6";

function checkIfApiIsSuccessful(response:RefinedResponse<any>){
    check(response, {'request succeeded': r => r.status>=200})
    if(response.status>=400){
        fail(`${response.request.method} - ${response.request.url} request failed with status code ${response.status}`)
    }

}
export function makeGetCall(url:string, params?:{}):void{
    const response = http.get(url, params)
    checkIfApiIsSuccessful(response)
}

export function  makePostCall(url:string, body:string, params?:{}){
    const response = http.post(url, body, params)
    checkIfApiIsSuccessful(response)
}