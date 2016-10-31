module.exports = {
	defaultHost: 'localhost:3000',
	modifyPostById: {
		pathname: '/book/{id}',
		method:'put',
		restful: true
	}
};