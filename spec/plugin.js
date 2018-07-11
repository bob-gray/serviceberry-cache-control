"use strict";

const CacheControl = require("../plugin"),
	Request = require("serviceberry/src/Request"),
	{HttpError} = require("serviceberry"),
	httpMocks = require("node-mocks-http");

describe("serviceberry-cache-control", () => {
	var handler,
		request,
		response;

	beforeEach(() => {
		handler = new CacheControl();
		request = createRequest();
		response = createResponse();
	});

	it("should create a handler instance with a use() method", () => {
		expect(typeof handler.use).toBe("function");
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
