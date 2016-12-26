const util = require('./util');
const URL = require('url');
const querystring = require('querystring');


/**
 * @static
 */
Api.GET = 'GET';
/**
 * @static
 */
Api.POST = 'POST';
/**
 * @static
 */
Api.PUT = 'PUT';
/**
 * @static
 */
Api.DELETE = 'DELETE';
/**
 * @static
 */
Api.OPTIONS = 'OPTIONS';
/**
 * @static
 */
Api.HEAD = 'HEAD';
/**
 * @static
 */
Api.DEFAULT_PROTOCOL = 'http';
/**
 * @static
 */
Api.JSON = 'json';
/**
 * @static
 */
Api.FORM = 'form';

const httpMethod = {
	get: true,
	post: true,
	put: true,
	delete: true,
	head: true,
	options: true
};

const contentType = {
	json: true,
	form: true
};

/**
 * @description Represents an API
 * @author Sparetire
 * @constructor
 * @param {Object} opts - whose properties are url - a String,
 * method - a String which is 'GET', 'POST', 'PUT' or 'DELETE' etc, optional.
 * restful - a Boolean, optional.
 * type - a String which is 'json' or 'form', optional.
 * @param {Object} httpClient - Object which has some http method.
 * @returns {Api} whose properties are url - String, readonly,
 * method - String, readonly,
 * type - String, readonly,
 * restful - Boolean, readonly,
 * httpClient - Object, readonly.
 */
function Api(opts, httpClient) {
	let self = this instanceof Api ? this : Object.create(Api.prototype);
	
	if (!util.isObject(opts) || typeof opts.url != 'string') {
		throw new Error('Options must be an Object with property url.');
	} else if (!util.isObject(httpClient)) {
		throw new Error('httpClient must be an Object.');
	}

	self.url = opts.url;
	// 非 http 方法的值都视为 get
	self.method = httpMethod[String(opts.method).toLowerCase()] ? opts.method.toUpperCase() : Api.GET;
	// 非 json 或 form 的值都视为 json
	self.type = contentType[String(opts.type).toLowerCase()] ? opts.type.toLowerCase() : Api.JSON;
	self.restful = !!opts.restful;
	self.httpClient = httpClient;

	if (!util.isFunction(self.get)) {
		Api.prototype.get = function () {
			if (this.method != Api.GET) {
				throw new Error('This API don\'t support GET method.');
			}

			let flag = false, requestURL = '', qs = '', opts = null, urlParam = null;

			flag = arguments[arguments.length-1] === true;

			if (!flag && !this.restful && util.isObject(arguments[0])) {
				qs = querystring.stringify(arguments[0]);
				requestURL = this.url.indexOf('?') === -1 ? `${this.url}?${qs}` : `${this.url}&${qs}`;
			} else if (!flag && this.restful && util.isObject(arguments[0])) {
				let reg = /{(\w+)}/g;
				urlParam = arguments[0];
				requestURL = this.url.replace(reg, (m,v) => {
					if (util.isNullOrUndefined(urlParam[v])) {
						throw new Error(`The parameter does\'t have an property named ${v}`);
					}
					return urlParam[v];
				});
				if (util.isObject(arguments[1])) {
					qs = querystring.stringify(arguments[1]);
					requestURL = requestURL.indexOf('?') === -1 ? `${requestURL}?${qs}` : `${requestURL}&${qs}`;
				}
			} else {
				requestURL = this.url;
			}

			if (flag) {
				opts = arguments[0];
				return this.httpClient.get(requestURL, opts);
			} else {
				return this.httpClient.get(requestURL);
			}

		};
	}

	if (!util.isFunction(self.post)) {
		Api.prototype.post = function () {
			if (this.method != Api.POST) {
				throw new Error('This API don\'t support POST method.');
			}

			let flag = false, requestURL = '', qs = '', body = '', opts = null, urlParam = null;
			
			flag = arguments[arguments.length-1] === true;

			if (!flag && !this.restful && util.isObject(arguments[1])) {
				qs = querystring.stringify(arguments[1]);
				requestURL = this.url.indexOf('?') === -1 ? `${this.url}?${qs}` : `${this.url}&${qs}`;
			} else if (!flag && this.restful && util.isObject(arguments[1])) {
				let reg = /{(\w+)}/g;
				urlParam = arguments[1];
				requestURL = this.url.replace(reg, (m,v) => {
					if (util.isNullOrUndefined(urlParam[v])) {
						throw new Error(`The parameter does\'t have an property named ${v}`);
					}
					return urlParam[v];
				});
				if (util.isObject(arguments[2])) {
					qs = querystring.stringify(arguments[2]);
					requestURL = requestURL.indexOf('?') === -1 ? `${requestURL}?${qs}` : `${requestURL}&${qs}`;
				}
			} else {
				requestURL = this.url;
			}

			if (!flag && util.isObject(arguments[0]) && this.type === Api.FORM) {
				body = querystring.stringify(arguments[0]);
			} else if (!flag && util.isObject(arguments[0]) && this.type === Api.JSON) {
				body = JSON.stringify(arguments[0]);
			} else if (typeof arguments[0] === 'string') {
				body = arguments[0];
			} else {
				opts = arguments[0];
			}

			if (flag) {
				return this.httpClient.post(requestURL, opts);
			} else {
				return this.httpClient.post(requestURL, body, this.type);
			}
		};
	}

	if (!util.isFunction(self.put)) {
		Api.prototype.put = function () {
			if (this.method != Api.PUT) {
				throw new Error('This API don\'t support PUT method.');
			}
			
			let flag = false, requestURL = '', qs = '', body = '', opts = null, urlParam = null;
			
			flag = arguments[arguments.length-1] === true;

			if (!flag && !this.restful && util.isObject(arguments[1])) {
				qs = querystring.stringify(arguments[1]);
				requestURL = this.url.indexOf('?') === -1 ? `${this.url}?${qs}` : `${this.url}&${qs}`;
			} else if (!flag && this.restful && util.isObject(arguments[1])) {
				let reg = /{(\w+)}/g;
				urlParam = arguments[1];
				requestURL = this.url.replace(reg, (m,v) => {
					if (util.isNullOrUndefined(urlParam[v])) {
						throw new Error(`The parameter does\'t have an property named ${v}`);
					}
					return urlParam[v];
				});
				if (util.isObject(arguments[2])) {
					qs = querystring.stringify(arguments[2]);
					requestURL = requestURL.indexOf('?') === -1 ? `${requestURL}?${qs}` : `${requestURL}&${qs}`;
				}
			} else {
				requestURL = this.url;
			}

			if (!flag && util.isObject(arguments[0]) && this.type === Api.FORM) {
				body = querystring.stringify(arguments[0]);
			} else if (!flag && util.isObject(arguments[0]) && this.type === Api.JSON) {
				body = JSON.stringify(arguments[0]);
			} else if (typeof arguments[0] === 'string') {
				body = arguments[0];
			} else {
				opts = arguments[0];
			}

			if (flag) {
				return this.httpClient.put(requestURL, opts);
			} else {
				return this.httpClient.put(requestURL, body, this.type);
			}
		};
	}

	if (!util.isFunction(self.delete)) {
		Api.prototype.delete = function () {
			if (this.method != Api.DELETE) {
				throw new Error('This API don\'t support DELETE method.');
			}
			
			let flag = false, requestURL = '', qs = '', opts = null, urlParam = null;

			flag = arguments[arguments.length-1] === true;

			if (!flag && !this.restful && util.isObject(arguments[0])) {
				qs = querystring.stringify(arguments[0]);
				requestURL = this.url.indexOf('?') === -1 ? `${this.url}?${qs}` : `${this.url}&${qs}`;
			} else if (!flag && this.restful && util.isObject(arguments[0])) {
				let reg = /{(\w+)}/g;
				urlParam = arguments[0];
				requestURL = this.url.replace(reg, (m,v) => {
					if (util.isNullOrUndefined(urlParam[v])) {
						throw new Error(`The parameter does\'t have an property named ${v}`);
					}
					return urlParam[v];
				});
				if (util.isObject(arguments[1])) {
					qs = querystring.stringify(arguments[1]);
					requestURL = requestURL.indexOf('?') === -1 ? `${requestURL}?${qs}` : `${requestURL}&${qs}`;
				}
			} else {
				requestURL = this.url;
			}

			if (flag) {
				opts = arguments[0];
				return this.httpClient.delete(requestURL, opts);
			} else {
				return this.httpClient.delete(requestURL);
			}
		};
	}




	Object.defineProperties(self, {
		url: {
			configurable: false,
			writable: false
		},
		method: {
			configurable: false,
			writable: false
		},
		type: {
			configurable: false,
			writable: false
		},
		restful: {
			configurable: false,
			writable: false
		},
		httpClient: {
			configurable: false,
			writable: false
		}
	});
	return self;
}

/**
 * @static
 * @param {Object} an extended URL Object which has optional property method, type and restful.
 */
Api.format = function (urlObj) {
	if (!util.isObject(urlObj)) {
		throw new Error(`Api.format expect an object, but get an parameter: ${urlObj}`);
	}
	if (!util.isNullStrOrNull(urlObj.href) && !util.isNullStrOrNull(urlObj.host) && !util.isNullStrOrNull(urlObj.hostname)) {
		throw new Error('You must set a host for options.');
	}
	let param = Object.assign({protocol: Api.DEFAULT_PROTOCOL}, urlObj);
	let apiObj = {
		url: typeof urlObj.href === 'string' ? urlObj.href : '',
		method: urlObj.method || Api.GET,
		type: urlObj.type || Api.JSON,
		restful: urlObj.restful || false
	};
	let url = URL.format(param);
	apiObj.url = apiObj.url.length > url.length ? apiObj.url : url;

	return apiObj;
};


module.exports = Api;