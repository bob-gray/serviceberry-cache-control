serviceberry-cache-control
==========================

[![CircleCI](https://circleci.com/gh/bob-gray/serviceberry-cache-control.svg?style=svg)](https://circleci.com/gh/bob-gray/serviceberry-cache-control)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5a4fc498c6e90455f103/test_coverage)](https://codeclimate.com/github/bob-gray/serviceberry-cors/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/5a4fc498c6e90455f103/maintainability)](https://codeclimate.com/github/bob-gray/serviceberry-cors/maintainability)
[![npm version](https://badge.fury.io/js/serviceberry-cache-control.svg)](https://badge.fury.io/js/serviceberry-cache-control)

Cache control plugin for [Serviceberry](https://serviceberry.js.org).

Install
-------

```shell-script
npm install serviceberry-cache-control
```

Usage
-----

This plugin sets a `Cache-Control` response header describing how the response
should be cached and returns a `304 Not Modified` if the cache does not validate.
