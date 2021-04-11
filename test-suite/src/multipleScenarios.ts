import * as client from './client.js'

const computerList = JSON.parse(open('../../test-data/computerList.json'))
export const options = {
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
        'http_req_duration{type:navigateToComputerSite}':['p(95)<4000'],
        'http_req_duration{type:getComputers}':['p(95)<4000']
    }
}

export function bookAppointment() {
    client.loginCuraHealthService()
    client.makeAppointment()
}

export function addToCart() {
    client.navigateToWordpress()
    client.addToCart()
}

export function readComputerDetails(){
    client.navigateToComputerSite()
    for(let i=0; i<computerList.length; i++){
        client.getComputers(computerList[i])
    }
}

