module.exports = {
	defaultHost: 'localhost:3000',
	addBook: {
		pathname: '/book',
		method: 'post'
	},
	addBookByForm: {
		pathname: '/book',
		method: 'POST',
		type: 'form'
	},
	addBookWithQueryString: {
		pathname: '/book',
		method: 'post'
	},
	addBookByFormWithQueryString: {
		pathname: '/book',
		method: 'post',
		type: 'form'
	},
	addBookWithURLParam: {
		pathname: '/book/{id}',
		method: 'post',
		restful: true
	},
	addBookByFormWithURLParam: {
		pathname: '/book/{id}',
		method: 'post',
		type: 'form',
		restful: true
	},
	threeParam: {
		pathname: 'book/{id}',
		method: 'post',
		type: 'form',
		restful: true
	},
	threeParamJson: {
		pathname: 'book/{id}',
		method: 'post',
		restful: true
	}
};