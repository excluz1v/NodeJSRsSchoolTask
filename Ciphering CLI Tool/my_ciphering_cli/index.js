const { validation, options } = require('./validate');
const process = require('process')
const { ReadStream, WriteStream, CustomTransformStream } = require('./customStreams');
const { pipeline } = require('stream/promises');
const { caesarCipher } = require('./Caesar_cipher');
const { atbashCipher } = require('./Atbash_cipher');
const { rot8Cipher } = require('./ROT-8');


let myArgs = process.argv.slice(2);

async function ciphering() {

    await validation(myArgs)
    const { input, output, config } = options
    let cipherChain = await createCipherChain(config)
    let wrstream = new WriteStream(output)

    if (input === 'stdin') {
        await run(process.stdin, cipherChain, wrstream).catch(console.error);

    } else {
        let customReadableStream = new ReadStream(input, { encoding: 'utf-8' })
        await run(customReadableStream, cipherChain, wrstream).catch(console.error);
    }
}
ciphering()

async function createCipherChain(chain) {
    let transformStreams = await Promise.allSettled(chain.split('-').map(cipher => {
        if (cipher === 'C0' || cipher === 'C1') {
            return new CustomTransformStream(caesarCipher, cipher)
        } else if (cipher === 'A') {
            return new CustomTransformStream(atbashCipher, cipher)
        } else if (cipher === 'R1' || cipher === 'R0') {
            return new CustomTransformStream(rot8Cipher, cipher)
        }
    }))
    return transformStreams = transformStreams.map(prom => prom.value)
}

async function run(start, transfromArray, end) {
    return await pipeline(start, ...transfromArray, end)
}