const HttpClient = require('../http-client');
const APIs = require('../apis');
const config = require('./api.config');

let client = new HttpClient();
let apis = new APIs(config, client);

/**
 * PUT http://localhost:3000/book/0
 */
apis.modifyPostById.put({
	name: '测试'
}, {
	id: 0
}).then(data => {
	console.log(data);
});