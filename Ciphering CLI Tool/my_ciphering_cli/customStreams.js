const { Readable, Writable, Transform } = require('stream')
const { Buffer } = require('buffer')
const fs = require('fs')
const process = require('process');


class ReadStream extends Readable {
    constructor(filename, options) {
        super(options);
        this.filename = filename;
        this.fd = null;
    }
    _construct(callback) {
        fs.open(this.filename, (err, fd) => {
            if (err) {
                callback(err);
            } else {
                this.fd = fd;
                callback();
            }
        });
    }
    _read(n) {
        const buf = Buffer.alloc(n);
        fs.read(this.fd, buf, 0, n, null, (err, bytesRead) => {
            if (err) {
                this.destroy(err);
            } else {
                this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
            }
        });
    }
    _destroy(err, callback) {
        if (this.fd) {
            fs.close(this.fd, (er) => callback(er || err));
        } else {
            callback(err);
        }
    }
}

exports.ReadStream = ReadStream


class WriteStream extends Writable {
    constructor(filename) {
        super();
        this.filename = filename;
    }
    _construct(callback) {
        if (this.filename === 'stdout') {
            callback();
        } else {
            fs.open(this.filename, (err, fd) => {
                if (err) {
                    callback(err);
                } else {
                    this.fd = fd;
                    callback();
                }
            });
        }

    }
    _write(chunk, encoding, callback) {
        if (this.filename === 'stdout') {
            let json = JSON.stringify(chunk);
            let bufferOriginal = Buffer.from(JSON.parse(json).data);
            process.stdout.write(bufferOriginal.toString('utf8'))
            callback()
        } else {
            fs.appendFile(this.filename, chunk, callback);
        }

    }
    _destroy(err, callback) {
        if (this.fd) {
            fs.close(this.fd, (er) => callback(er || err));
        } else {
            callback(err);
        }
    }
}
exports.WriteStream = WriteStream

class CustomTransformStream extends Transform {
    constructor(func, type, options) {
        super(options);
        this.func = func
        this.type = type
    }
    _transform(chunk, encoding, callback) {
        let letter = chunk.toString()
        let res = this.func(letter, this.type)
        this.push(res)
        callback()
    }
}
exports.CustomTransformStream = CustomTransformStream

