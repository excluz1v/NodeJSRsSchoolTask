const { alphabet, upperAlphabet } = require('./Caesar_cipher')

exports.atbashCipher = function (letters) {
    let res = letters.split('').map(letter => {
        if (alphabet.includes(letter)) {
            let letterIndex = alphabet.indexOf(letter)
            return alphabet[alphabet.length - 1 - letterIndex]
        } else if (upperAlphabet.includes(letter)) {
            let letterIndex = upperAlphabet.indexOf(letter)
            return upperAlphabet[upperAlphabet.length - 1 - letterIndex]
        } else return letter
    }).join('')
    return res
}