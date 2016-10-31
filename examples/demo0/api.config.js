module.exports = {
	getBooks: {
		host: 'localhost:3000',
		pathname: '/book'
	},
	getBookByQueryString: {
		host: 'localhost:3000',
		pathname: '/book'
	},
	getBookByUrlParam: {
		host: 'localhost:3000',
		pathname: '/book/{id}',
		restful: true
	},
	getBookWithFilter: {
		host: 'localhost:3000',
		pathname: '/book/{id}',
		restful: true
	},
	getBooksWithHeader: {
		host: 'localhost:3000',
		pathname: '/book/',
		restful: true
	},
	getBookWithOptions: {
		host: 'localhost:3000',
		pathname: '/book/',
	}
};