const fetch = require('isomorphic-fetch');
const env = require('dotenv').config();
const FetchResponseError = require('./fetch-response-error');

/**
 * Wrapper for fetch
 * @param params
 * @property {String} url         The request url to complete the API call
 * @property {Object} options     The request options to complete the API call
 * @property {String} message     The message unique to the method
 * @return {Promise}
 */
const fetchWrapper = (url, options = { method: 'GET', headers: {} }) => fetch(
  url,
  {
    ...options,
    headers: {
      'X-API-Key': env.parsed.PROPUBLICA_API_KEY,
      ...options.headers,
    },
  },
)
  .then((response) => {
    // we know that for carts v2 all 204s return no content so return an empty obj
    if (response.status === 204) {
      return {};
    }

    return response.text().then((txt) => {
      let data = {};

      try {
        data = JSON.parse(txt);
        if (data.message || (data.errors && data.errors.length)) {
          return Promise.reject(new FetchResponseError({
            data,
            options,
            response,
            message: data.message,
          }));
        }
        return data;
      } catch (e) {
        return Promise.reject(new FetchResponseError({
          data: {
            error: {
              message: 'Error parsing response data.',
            },
          },
          options,
          response,
        }));
      }
    });
  });

module.exports = fetchWrapper;
