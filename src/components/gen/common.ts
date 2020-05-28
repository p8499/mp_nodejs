const SERVER_PROTOCOL = 'https:';
const SERVER_HOST = '192.168.100.42';
const SERVER_PORT = 8080;
const SERVER_APP = 'mp';

const HTML_PROTOCOL = 'http:';
const HTML_HOST = '192.168.100.43';
const HTML_PORT = 8080;

const HTML_BASE_URL = 'http://192.168.100.43:8080';

class ServerError extends Error {
  constructor(public statusCode: number) {
    super(`HTTP Status: ${statusCode}`);
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

function parameters(dict: any): string {
  const result = Object.keys(dict)
    .filter((value) => dict[value] !== undefined)
    .map((value) => `${value}=${dict[value]}`).join('&');
  return Object.keys(dict).filter((v) => dict[v] !== undefined).length > 0 ? `?${result}` : '';
}

export {
  SERVER_PROTOCOL,
  SERVER_HOST,
  SERVER_PORT,
  SERVER_APP,
  HTML_PROTOCOL,
  HTML_HOST,
  HTML_PORT,
  HTML_BASE_URL,
  ServerError,
  parameters,
};
