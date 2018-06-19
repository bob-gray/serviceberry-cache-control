"use strict";

const cacheControl = require("../plugin"),
	Request = require("serviceberry/src/Request"),
	{HttpError} = require("serviceberry"),
	httpMocks = require("node-mocks-http");

describe("serviceberry-cache-control", () => {
	var handler,
		request,
		response;

	beforeEach(() => {
		handler = cacheControl();
		request = createRequest();
		response = createResponse();
	});

	it("should create a handler instance with a use() method", () => {
		expect(typeof handler.use).toBe("function");
	});

	it("should export cacheControl.CacheControl class", () => {
		expect(handler instanceof cacheControl.CacheControl).toBe(true);
	});
});

function createRequest (method = "GET", headers = {}) {
	var incomingMessage = httpMocks.createRequest({
			method: method,
			url: "/",
			headers: headers
		}),
		request;


	incomingMessage.setEncoding = Function.prototype;
	request = new Request(incomingMessage);
	request.proceed = jasmine.createSpy("request.proceed");

	return request;
}

function createResponse () {
	var response = jasmine.createSpyObj("Response", [
		"setHeader",
		"getHeader"
	]);

	return response;
}
