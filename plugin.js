"use strict";

const vary = require("vary"),
	defaultOptions = {
		noStore: false,
		noCache: false,
		maxAge: NaN,
		public: false,
		private: false,
		mustRevalidate: false,
		vary: []
	};

class CacheControl {
	static create () {
		return new CacheControl(...arguments);
	}

	constructor (options = {}) {
		this.setOptions(options);
	}

	use (request, response) {
		vary(response, this.options.vary);
	}

	setOptions (options) {
		this.options = {...defaultOptions, ...options};
	}
}

module.exports = CacheControl.create;
module.exports.CacheControl = CacheControl;
