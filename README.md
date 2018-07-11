serviceberry-cache-control
==========================

[![CircleCI](https://circleci.com/gh/bob-gray/serviceberry-cache-control.svg?style=svg)](https://circleci.com/gh/bob-gray/serviceberry-cache-control)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7f550210acb7451260cd/test_coverage)](https://codeclimate.com/github/bob-gray/serviceberry-cache-control/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/7f550210acb7451260cd/maintainability)](https://codeclimate.com/github/bob-gray/serviceberry-cache-control/maintainability)
[![npm version](https://badge.fury.io/js/serviceberry-cache-control.svg)](https://badge.fury.io/js/serviceberry-cache-control)

Cache control plugin for [Serviceberry](https://serviceberry.js.org).

Install
-------

```shell-script
npm install serviceberry-cache-control
```

Usage
-----

This plugin exports an abstract class `CacheControl` for extending by your
class that knows how to get ETags and Last Modified for the requested resource.
To use this plugin extend `CacheControl` and implement at least `getETag(request, response)`
or `getLastModified(request, response)`. The ETag or Last Modified is then used
to validate the client cache using information passed in request headers.

This plugin sets a `Cache-Control` response header describing how the response
should be cached based on the plugin options and halts the request and responds
with a `304 Not Modified` status if the cache validates using the ETag or Last
Modified as described above.

```js
const CacheControl = require("serviceberry-cache-control");

class Caching extends CacheControl {
	getETag (request) {
		return data.getETag(request.getUrl()); // can also return a promise or use async/await
	}
}

trunk.use(new Caching(options));
```

Options
-------

  - **noStore** *boolean*

    When true the `no-store` directive is set in the `Cache-Control` response header.
	Defaults to `false`.

  - **noCache** *boolean*

	When true the `no-cache` directive is set in the `Cache-Control` response header.
	Defaults to `false`.

  - **mustRevalidate** *boolean*

  	When true the `must-revalidate` directive is set in the `Cache-Control` response header.
  	Defaults to `false`.

  - **public** *boolean*

  	When true the `public` directive is set in the `Cache-Control` response header.
  	Defaults to `false`.

  - **private** *boolean*

  	When true the `private` directive is set in the `Cache-Control` response header.
  	Defaults to `false`.

  - **maxAge** *number*

  	When greater than `0` the `max-age` directive is set in the `Cache-Control` response header.
  	Defaults to `NaN`.

  - **vary** *array*

  	An array of header field names that might may vary the response and should be
	considered by caches. Values are appended to the `Vary` response header.

  	Defaults to `[]`.

CacheControl
------------
Abstract class

### constructor([options])

  - **options**

    Sets `this.options`. See [options](#options) above.

### getETag(request, response)

**You should extend this class and at least implement this method or `getLastModified()`.**

Called by the `setETag` method for fetching an ETag to be set as a response headers
and used to validate the cache. This can be an async function or it can return a promise.
It should return an ETag string or eventually resolve to one.

  - **request** *object*

    Serviceberry [`request`](https://serviceberry.js.org/docs/request.html).

  - **response** *object*

    Serviceberry [`response`](https://serviceberry.js.org/docs/response.html).

### getLastModified(request, response)

**You should extend this class and at least implement this method or `getETag()`.**

Called by the `validate` method for fetching the date the requested resource
was last modified to be used to validate the cache. This can be an async function
or it can return a promise. It should return an ETag string or eventually resolve to one.

  - **request** *object*

    Serviceberry [`request`](https://serviceberry.js.org/docs/request.html).

  - **response** *object*

    Serviceberry [`response`](https://serviceberry.js.org/docs/response.html).

### use(request, response)

The handler method. This is the method called by Serviceberry. This is an `async` function.
If it determines the response status should be `304 Not Modified` the request will be
halted and the response sent with a `304` status.

  - **request** *object*

    Serviceberry [`request`](https://serviceberry.js.org/docs/request.html).

  - **response** *object*

    Serviceberry [`response`](https://serviceberry.js.org/docs/response.html).

### validate(request, response)

Called by the `use` method to validate the cache. This is an `async` function.

  - **request** *object*

    Serviceberry [`request`](https://serviceberry.js.org/docs/request.html).

  - **response** *object*

    Serviceberry [`response`](https://serviceberry.js.org/docs/response.html).
