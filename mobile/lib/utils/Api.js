class Api {
  static headers(jwt = null) {
    if (sessionStorage.getItem('jwtToken')) {
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken'),
      }
    } else {
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
    }
  }

  static get(route, jwt = null) {
    return this.xhr(route, null, 'GET', jwt);
  }

  static put(route, params, jwt = null) {
    return this.xhr(route, params, 'PUT', jwt);
  }

  static post(route, params, jwt = null) {
    return this.xhr(route, params, 'POST', jwt);
  }

  static patch(route, params, jwt = null) {
    return this.xhr(route, params, 'PATCH', jwt);
  }

  static delete(route, jwt = null) {
    return this.xhr(route, null, 'DELETE', jwt);
  }

  static xhr(route, params, verb, jwt = null) {
    const options = Object.assign(
      { method: verb },
      params ? { body: JSON.stringify(params) } : null,
    );
    options.headers = Api.headers(jwt);
    console.log(options);
    var request = new Request(route, options);
    console.log(request);
    return fetch(request).then(resp => {
      if (resp.status === 400 || resp.status === 401 || resp.status === 404 || resp.status === 500) {
        return {error: resp};
      }
      return resp.json().then(data => {
        return data;
      })
    });
  }
}

export default Api;
