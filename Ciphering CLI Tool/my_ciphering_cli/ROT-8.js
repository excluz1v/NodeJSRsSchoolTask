const { alphabet, upperAlphabet } = require('./Caesar_cipher')

exports.rot8Cipher = function (letters, type) {
    let res = letters.split('').map(letter => {
        if (upperAlphabet.includes(letter)) {
            let letterIndex = upperAlphabet.indexOf(letter)
            return findValues(upperAlphabet, letterIndex, type)
        } else if (alphabet.includes(letter)) {
            let letterIndex = alphabet.indexOf(letter)
            return findValues(alphabet, letterIndex, type)
        } else return letter
    }).join('')

    return res
}

function findValues(alph, index, type) {
    if (type === 'R1') {
        if (index >= alph.length - 8) {
            return alph[8 + index - alph.length]
        } else return alph[index + 8]
    }
    if (type === 'R0') {
        if (index <= 7) {
            return alph[alph.length - 1 + index - 7]
        } else return alph[index - 8]
    }
}