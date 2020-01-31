export const STORE_TOKEN_NAME = 'token';
export const STORE_USER_NAME = 'user';
export const STORE_USER_ID = 'user_id';

class Authentication {

    /**
     * check if user is logged in
     * @returns {boolean}
     */
    static isLoggedIn() {
        try {
            const token = localStorage.getItem(STORE_TOKEN_NAME);
            const username = localStorage.getItem(STORE_USER_NAME);

            return token != null && username != null;
        } catch (error) {
            return false;
        }
    }

    /**
     * @returns string | null | false
     */
    static getToken() {
        try {
            return localStorage.getItem(STORE_TOKEN_NAME);
        } catch (error) {
            return false;
        }
    }

    /**
     * @param token
     * @param user
     * @returns boolean
     */
    static storeLogin(token, user) {
        try {
            localStorage.setItem(STORE_TOKEN_NAME, token);
            localStorage.setItem(STORE_USER_NAME, user);
        } catch (e) {
            return false;
        }

        return true;
    }

    /**
     * log the user in
     * @param key
     * @returns {Promise<boolean>}
     */
    static async logIn(key) {
        return this.storeLogin('dasistderservertoken', 'Armin Winkler').then(function () {
            return Promise.resolve(true);
        });


        // todo if server is running
        // let request = new Request();
        // return request.post('/login', {
        //     email: email,
        //     password: password
        // }).then((data) => {
        //     console.log(data);
        //
        //     this.storeLogin(data.data.token, data.data.user).then(function() {
        //         return Promise.resolve(true);
        //     });
        //
        //     return Promise.reject('Wrong login data.');
        // }).catch((reason) => {
        //     console.log(reason);
        //     return Promise.reject('Wrong login data.');
        // });
    }

    /**
     * log the user out
     */
    static async logOut() {
        try {
            localStorage.clear();
        } catch (e) {
            return false;
        }

        return true;
    }

}

export default Authentication;
