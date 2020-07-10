"use strict";

const CacheControl = require("../plugin");

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

	it("should not set ETag if getETag is not implemented", async () => {
		await handler.use(request, response);

		expect(response.getHeader("ETag")).toBeUndefined();
	});

	it("should not send 304 Not Modified when no If- request headers", async () => {
		await handler.use(request, response);

		expect(response.send).not.toHaveBeenCalled();
	});

	it("should not set a Cache-Control header if not directives are set", async () => {
		await handler.use(request, response);

		expect(response.getHeader("Cache-Control")).toBeUndefined();
	});

	it("should set a Cache-Control header", async () => {
		handler = new CacheControl({
			noStore: true
		});

		await handler.use(request, response);

		expect(response.getHeader("Cache-Control")).toBe("no-store");
	});

	it("should send a 304 Not Modified if the ETag is valid", async () => {
		const etag = '"b164c5cd761ad61:0"';

		handler.getETag = () => etag;
		request = createRequest({
			"If-None-Match": etag
		});

		await handler.use(request, response);

		expect(response.send).toHaveBeenCalledWith({
			status: "Not Modified",
			body: undefined
		});
	});

	it("should not send a 304 Not Modified if the ETag is invalid", async () => {
		const etag = '"b164c5cd761ad61:0"';

		handler.getETag = () => etag;
		request = createRequest({
			"If-None-Match": '"some:other:etag"'
		});

		await handler.use(request, response);

		expect(response.send).not.toHaveBeenCalled();
	});

	it("should send a 304 Not Modified if the Last-Modified matches If-Modified-Since", async () => {
		const lastModified = new Date("Sat, 27 Jun 2020 18:05:33 GMT");

		handler.getLastModified = () => lastModified;
		request = createRequest({
			"If-Modified-Since": lastModified.toUTCString()
		});

		await handler.use(request, response);

		expect(response.send).toHaveBeenCalledWith({
			status: "Not Modified",
			body: undefined
		});
	});

	it("should send a 304 Not Modified if the Last-Modified is valid", async () => {
		const lastModified = new Date("Sat, 27 Jun 2020 18:05:33 GMT");

		handler.getLastModified = () => lastModified;
		request = createRequest({
			"If-Modified-Since": "Sat, 28 Jun 2020 12:00:00 GMT"
		});

		await handler.use(request, response);

		expect(response.send).toHaveBeenCalledWith({
			status: "Not Modified",
			body: undefined
		});
	});

	it("should not send a 304 Not Modified if the Last-Modified is invalid", async () => {
		const lastModified = new Date();

		handler.getLastModified = () => lastModified;
		request = createRequest({
			"If-Modified-Since": "Sat, 27 Jun 2020 18:05:33 GMT"
		});

		await handler.use(request, response);

		expect(response.send).not.toHaveBeenCalled();
	});
});

function createRequest (headers = {}) {
	const request = jasmine.createSpyObj("Request", [
		"hasHeader",
		"getHeader"
	]);

	request.hasHeader.and.callFake(header => header in headers);
	request.getHeader.and.callFake(header => headers[header]);

	return request;
}

function createResponse () {
	const response = jasmine.createSpyObj("Response", [
			"setHeader",
			"getHeader",
			"hasHeader",
			"send"
		]),
		headers = {};

	response.setHeader.and.callFake((name, value) => {
		headers[name] = value;
	});
	response.hasHeader.and.callFake(header => header in headers);
	response.getHeader.and.callFake(header => headers[header]);

	return response;
}
