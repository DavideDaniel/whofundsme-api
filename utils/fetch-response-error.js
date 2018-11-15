class FetchResponseError extends Error {
  constructor({ response = {}, data = {}, options, message }) {
    const { headers = {} } = options || {};
    super(message);
    const traceId = headers['X-B3-TraceId'];

    if (data.error_id || data.errors || (response && !response.ok)) {
      this.errors = data.errors || [data];
    }

    this.message = response.ok ? 'Successful response with errors' : (data.message || message);
    this.data = data;
    this.response = response;
    this.traceId = traceId;
  }
}

module.exports = FetchResponseError;
