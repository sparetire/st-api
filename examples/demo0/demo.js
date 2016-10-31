const StApi = require('../../index');
const config = require('./api.config');
const HttpClient = StApi.HttpClient;
const APIs = StApi.APIs;

let client = new HttpClient();
let apis = new APIs(config, client);

/**
 * GET http://localhost:3000/book
 */
apis.getBooks.get()
	.then(data => {
		console.log('getBooks *********');
		console.log(data);
	});

/**
 * GET http://localhost:3000/book?id=0
 */
apis.getBookByQueryString.get({
		id: 0
	})
	.then(data => {
		console.log('getBookByQueryString *********');
		console.log(data);
	});

/**
 * GET http://localhost:3000/book/1
 */
apis.getBookByUrlParam.get({
		id: 1
	})
	.then(data => {
		console.log('getBookByUrlParam *********');
		console.log(data);
	});

/**
 * GET http://localhost:3000/book/0?name=test
 */
apis.getBookWithFilter.get({
		id: 0
	}, {
		name: 'test'
	})
	.then(data => {
		console.log('get book by url param and query string *********');
		console.log(data);
	});

/**
 * GET http://localhost:3000/book
 * header:
 * Accept: application/json
 */
apis.getBooksWithHeader.get({
		headers: {
			Accept: 'application/json'
		}
	}, true)
	.then(data => {
		console.log('get book by url param with header *********');
		console.log(data);
	});

/**
 * GET http://localhost:3000/book?id=1
 * header:
 * Accept: application/json
 */
apis.getBookWithOptions.get({
		url: `${apis.getBookWithOptions.url}?id=1`,
		headers: {
			Accept: 'application/json'
		}
	}, true)
	.then(data => {
		console.log('get book by url param with full options *********');
		console.log(data);
	});