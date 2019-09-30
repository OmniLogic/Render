const axios = require('axios');

export class OmnilogicClient {
  constructor({ cache, token }) {
    if (cache) this.cache = cache.data;
    if (token) this.headers = { headers: { Authorization: token } };
  }

  fetchClient(params) {
    params = { ...params, url: window.location.href };

    return this.fetch(params);
  }

  fetch(params) {
    console.log(params);
    return axios
      .post(process.env.API, params, this.headers)
      .catch(err => console.error(err));
  }

  setCache(data) {
    this.cache = data;
  }

  extractCache() {
    if (this.cache)
      return JSON.stringify({ data: this.cache }).replace(/</g, '\\u003c');
  }
}
