import sendrequest from "./send-request"
const BASE_URL = '/api/users'

export function signUp(userData) {
    return sendrequest(BASE_URL, 'POST', userData)
}

export function login(credentials) {
    return sendrequest(`${BASE_URL}/login`, 'POST', credentials)
}

export function update(data, id) {
    return sendrequest(`${BASE_URL}/${id}`, 'PUT', data)
}

// Below : for search bar needs
// or BASE_URL, 'GET' ???

export function getAllUsers() {
    console.log("Jokes!")
    return sendRequest(BASE_URL)
}

export function getUserById(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'GET', id);
}
