import * as client from './client.js'

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
        }

    },
    thresholds: {
        checks: ['rate>=1'],
        'http_req_duration{type:loginCuraHealthService}': ['p(95)<1000'],
        'http_req_duration{type:makeAppointment}': ['p(95)<1000'],
        'http_req_duration{type: navigateToWordpress}': ['p(95)<2000'],
        'http_req_duration{type: addToCart}': ['p(95)<2000']
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

