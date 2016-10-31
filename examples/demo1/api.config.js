module.exports = {
	defaultHost: 'localhost:3000',
	getBooks: {
		pathname: '/book'
	},
	getBookByQueryString: {
		pathname: '/book'
	},
	getBookByUrlParam: {
		pathname: '/book/{id}',
		restful: true
	},
	getBookWithFilter: {
		pathname: '/book/{id}',
		restful: true
	},
	getBooksWithHeader: {
		host: 'www.baidu.com',
		pathname: '/book/',
		restful: true
	},
	getBookWithOptions: {
		pathname: '/book/',
	}
};