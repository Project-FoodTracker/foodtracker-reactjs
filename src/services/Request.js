import config from '../utils/config';
import Authentication from './Authentication';

class Request {
    constructor() {
        this.url = config.api.url;
    }

    get(endpoint, params, auth = false, onlyEndpoint = true): Promise {
        let url = onlyEndpoint ? this.url + endpoint : endpoint;

        if (params != null && params.length !== 0) {
            url += '?' + Request.objectToQueryString(params);
        }

        return this.request(url, 'GET', null, auth);
    }

    post(endpoint, body, auth = false, onlyEndpoint = true): Promise {
        let url = onlyEndpoint ? this.url + endpoint : endpoint;

        return this.request(url, 'POST', body, auth);
    }

    put(endpoint, body, auth = false, onlyEndpoint = true): Promise {
        body._method = 'put';

        return this.post(endpoint, body, auth, onlyEndpoint);
    }

    delete(endpoint, auth = false, onlyEndpoint = true): Promise {
        let url = this.url + endpoint;

        return this.request(url, 'DELETE', null, auth, onlyEndpoint);
    }

    async request(url, method, params, auth = false): Promise {

        let headers = {
            'Content-Type': 'application/json',
        };

        if (auth) {
            if (!Authentication.isLoggedIn()) {
                return Promise.reject('Not authorized.');
            }

            headers.Authorization = 'Bearer ' + await Authentication.getToken();
        }

        return fetch(url, {
            method: method,
            body: params != null ? Request.objectToQueryString(params) : null,
            headers: new Headers(headers),
        })
            .then(response => {
                if (response.status === 401) {
                    window.location.href = '/logout';
                    return;
                }

                if (response.status < 200 || response.status >= 300) {
                    return Promise.reject(false);
                }

                return response.json().then((result) => {
                    if (!result) {
                        return Promise.reject('Failed to parse json response.');
                    }

                    return Promise.resolve(result);
                });
            });
    }

    static objectToQueryString(obj) {
        const keyValuePairs = [];
        for (const key in obj) {
            if (!obj.hasOwnProperty(key)) {
                continue;
            }
            keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
    }
}

export default Request;
