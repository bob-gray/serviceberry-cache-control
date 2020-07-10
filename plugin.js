"use strict";

const vary = require("vary"),
	defaultOptions = {
		noStore: false,
		noCache: false,
		mustRevalidate: false,
		public: false,
		private: false,
		maxAge: NaN,
		vary: []
	},
	quotedETag = /^(?:W\/)?"([^"]+)"$/;

class CacheControl {
	constructor (options = {}) {
		this.setOptions(options);
	}

	async use (request, response) {
		vary(response, this.options.vary);
		this.setDirectives(response);
		await this.setETag(request, response);

		return this.validate(request, response);
	}

	setOptions (options) {
		this.options = {...defaultOptions, ...options};
	}

	setDirectives (response) {
		const directives = this.getDirectives();

		if (directives) {
			response.setHeader("Cache-Control", directives);
		}
	}

	async setETag (request, response) {
		const etag = await this.getETag(request, response);

		if (typeof etag !== "undefined" && etag !== null) {
			response.setHeader("ETag", quote(etag));
		}
	}

	async validate (request, response) {
		var valid,
			lastModified = await this.getLastModified(request, response);

		if (request.hasHeader("If-None-Match")) {
			valid = this.eTagIsValid(request, response);
		} else if (request.hasHeader("If-Modified-Since")) {
			valid = Date.parse(request.getHeader("If-Modified-Since")) >= lastModified;
		}

		if (valid) {
			response.send({
				status: "Not Modified",
				body: undefined
			});
		} else if (lastModified < Infinity) {
			response.setHeader("Last-Modified", lastModified.toUTCString());
		}
	}

	// eslint-disable-next-line complexity, max-statements
	getDirectives () {
		const directives = [];

		if (this.options.noStore) {
			directives.push("no-store");
		}

		if (this.options.noCache) {
			directives.push("no-cache");
		}

		if (this.options.mustRevalidate) {
			directives.push("must-revalidate");
		}

		if (this.options.public) {
			directives.push("public");
		} else if (this.options.private) {
			directives.push("private");
		}

		if (!isNaN(this.options.maxAge)) {
			directives.push("max-age=" + this.options.maxAge);
		}

		return directives.join(", ");
	}

	getETag () {
		// Child class should implement this method to use ETag cache validation
	}

	eTagIsValid (request, response) {
		var responseETag;

		if (response.hasHeader("ETag")) {
			responseETag = this.getResponseRawETag(response);
		}

		return responseETag && this.getCachedETags(request).includes(responseETag);
	}

	getLastModified () {
		// Child class should implement this method to use modified time weak cache validation
		return Infinity;
	}

	getCachedETags (request) {
		return request.getHeader("If-None-Match").split(",").map(toRawETag);
	}

	getResponseRawETag (response) {
		return toRawETag(response.getHeader("ETag"));
	}
}

function quote (string) {
	if (!string.includes('"')) {
		string = '"' + string + '"';
	}

	return string;
}

function toRawETag (etag) {
	return etag.trim().replace(quotedETag, "$1");
}

module.exports = CacheControl;
