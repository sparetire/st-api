const HttpClient = require('../http-client');
const APIs = require('../apis');
const config = require('./api.config');

let client = new HttpClient();
let apis = new APIs(config, client);

/**
 * POST http://localhost:3000/book
 * body
 * {
 * 	"name": "《Javsscript 高级程序设计》"
 * }
 */
apis.addBook.post({
	name: '《Javsscript 高级程序设计》'
}).then(data => {
	console.log('Add book with json *************');
	console.log(data);
});

/**
 * POST http://localhost:3000/book
 * body
 * name=%E3%80%8AJavsscript%20%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E3%80%8B
 */
apis.addBookByForm.post({
	name: '《Javsscript 高级程序设计》'
}).then(data => {
	console.log('Add book with form *************');
	console.log(data);
});

/**
 * POST http://localhost:3000/book?id=8
 * body
 * {
 * 	"name": "《Javsscript 高级程序设计》"
 * }
 */
apis.addBookWithQueryString.post({
	name: '《Javsscript 高级程序设计》'
}, {
	id: 8
}).then(data => {
	console.log('Add book with json and query string *************');
	console.log(data);
});


/**
 * POST http://localhost:3000/book?id=999
 * body
 * name=%E3%80%8AJavsscript%20%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E3%80%8B
 */
apis.addBookByFormWithQueryString.post({
	name: '《Javsscript 高级程序设计》'
}, {
	id: 999
}).then(data => {
	console.log('Add book with form and query string *************');
	console.log(data);
});

/**
 * POST http://localhost:3000/book/888
 * body
 * {
 * 	"name": "《Javsscript 高级程序设计》"
 * }
 */
apis.addBookWithURLParam.post({
	name: '《Javsscript 高级程序设计》'
}, {
	id: 888
}).then(data => {
	console.log('Add book with json and URL param *************');
	console.log(data);
});


/**
 * POST http://localhost:3000/book/888
 * body
 * name=%E3%80%8AJavsscript%20%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E3%80%8B
 */
apis.addBookByFormWithURLParam.post({
	name: '《Javsscript 高级程序设计》'
}, {
	id: 888
}).then(data => {
	console.log('Add book with form and URL param *************');
	console.log(data);
});

/**
 * POST http://localhost:3000/book/555?title=test
 * body
 * name=%E3%80%8AJavsscript%20%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E3%80%8B
 */
apis.threeParam.post({
	name: '《Javsscript 高级程序设计》'
}, {
	id: 555
}, {
	title: 'test'
}).then(data => {
	console.log('Add book with three param ***************');
	console.log(data);
});


/**
 * POST http://localhost:3000/book/555?title=test
 * body
 * {
 * 	"name": "《Javsscript 高级程序设计》"
 * }
 */
apis.threeParamJson.post({
	name: '《Javsscript 高级程序设计》'
}, {
	id: 555
}, {
	title: 'test'
}).then(data => {
	console.log('Add book with three param ***************');
	console.log(data);
});