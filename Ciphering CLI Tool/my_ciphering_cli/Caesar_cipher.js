const upperAlphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const alphabet = upperAlphabet.map(letter => letter.toLocaleLowerCase())

exports.alphabet = alphabet
exports.upperAlphabet = upperAlphabet


exports.caesarCipher = function (letters, type) {

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
    if (type === 'C0') {
        if (index === 0) {
            return alph[alph.length - 1]
        } else return alph[index - 1]
    }
    if (type === 'C1') {
        if (index === alph.length - 1) {
            return alph[0]
        } else return alph[index + 1]
    }
}