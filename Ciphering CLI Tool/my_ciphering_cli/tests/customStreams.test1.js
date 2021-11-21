const { CustomTransformStream, ReadStream, WriteStream } = require('../customStreams')
const { Readable, Writable } = require("stream");

test('transform letter', () => {
    expect(new CustomTransformStream(() => null)._transform('a', 'utf8', () => null));
});

const mockReadStream = jest.fn().mockImplementation(() => {
    const readable = new Readable();
    readable.emit("This is secret. Message about _ symbol!");
    readable.emit("\n");
    readable.emit(null);

    return readable;
});

describe("ReadableStream testing", () => {
    test("Readable Stream read from file expected string", () => {
        expect(new ReadStream("input.txt")._readableState.buffer.data).toBe(
            mockReadStream()._readableState.buffer.data
        );
    });
});


const MockWriteStream = new WriteStream('output.txt');

const mockCreateWriteStream = jest.fn().mockImplementation(() => {
    MockWriteStream.reset();
    return MockWriteStream;
});

const mockFile = jest.fn().mockImplementation(() => {
    return {
        createWriteStream: mockCreateWriteStream,
    };
});



