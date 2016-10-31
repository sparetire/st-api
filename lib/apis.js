const Api = require('./api');
const util = require('./util');
const URL = require('url');


// 支持多个配置文件作为配置项
// 如果是单例且不暴露setter方法设置配置项
// 就只能在第一次实例化就输入配置项
// 这会导致继承的子类也无法设置配置项
// 所以这里不用单例也不让配置项作为必需参数
// 可以被继承，子类作为某一业务逻辑的API对象
// 如可以有微信API对象，地图API对象
function APIs(config, httpClient) {
	let self = this instanceof APIs ? this : Object.create(APIs.prototype);

	if (util.isNullOrUndefined(config)) {
		return self;
	}
	let defaultHost = {};
	if (config[APIs.DEFAULT_HOST] && /^http/.test(config[APIs.DEFAULT_HOST])) {
		defaultHost = URL.parse(config[APIs.DEFAULT_HOST]);
	} else {
		defaultHost.host = config[APIs.DEFAULT_HOST];
	}

	for (let index in config) {
		if (index != APIs.DEFAULT_HOST) {
			let api = config[index];
			if (!api.host && !api.hostname) {
				api.host = defaultHost.host;
				if (defaultHost.protocol) {
					api.protocol = defaultHost.protocol;
				}
			}
			self[index] = new Api(Api.format(api), httpClient);
			Object.defineProperty(self, index, {
				configurable: false,
				writable: false
			});
		}
	}

	return self;
}

APIs.DEFAULT_HOST = 'defaultHost';

module.exports = APIs;