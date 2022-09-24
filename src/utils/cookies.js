import Cookies from 'js-cookie'

const key = 'access_token'

export function setToken(value) {
    Cookies.set(key, value, { expires: 7, path: '' });
}

export function getToken() {
    return Cookies.get(key);
}

export function removeToken() {
    Cookies.remove(key);
}

export function setUid(value) {
    Cookies.set('uid', value, { expires: 7, path: '' });
}

export function getUid() {
    return Cookies.get('uid');
}

export function removeUid() {
    Cookies.remove('uid');
}