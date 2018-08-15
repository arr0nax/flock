import { AsyncStorage } from "react-native"

class Api {

  static async headers() {
    try {
      const value = await AsyncStorage.getItem('jwtToken');
      if (value !== null) {
        return {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + value,
        }
      }
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
    } catch (error) {
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
    }
  }

  static get(route) {
    return this.xhr(route, null, 'GET');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT');
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST');
  }

  static patch(route, params) {
    return this.xhr(route, params, 'PATCH');
  }

  static delete(route) {
    return this.xhr(route, null, 'DELETE');
  }

  static async xhr(route, params, verb) {
    const options = Object.assign(
      { method: verb },
      params ? { body: JSON.stringify(params) } : null,
    );
    options.headers = await Api.headers();
    console.log(options);
    var request = new Request(route, options);
    console.log(request);
    return fetch(request).then(resp => {
      if (resp.status === 400 || resp.status === 401 || resp.status === 404 || resp.status === 500) {
        return {error: resp};
      }
      return resp.json().then(data => {
        if (data.token) {
          AsyncStorage.setItem('jwtToken', data.token);
        }
        return data;
      })
    });
  }
}

export default Api;
