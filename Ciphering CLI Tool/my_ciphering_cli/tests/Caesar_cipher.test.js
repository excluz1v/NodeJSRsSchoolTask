const { caesarCipher } = require('../Caesar_cipher')

describe('Ceaser cipher tests', () => {
    test('return correct value uppercase', () => {
        const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const result = "BCDEFGHIJKLMNOPQRSTUVWXYZA"

        expect(caesarCipher(uppercaseLetters, 'C1')).toBe(result)
        expect(caesarCipher(uppercaseLetters, 'C0')).toBe('ZABCDEFGHIJKLMNOPQRSTUVWXY')
    })

    test('return correct value lowercase', () => {

        const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
        const lowerResult = 'zabcdefghijklmnopqrstuvwxy'

        expect(caesarCipher(lowerCaseLetters, 'C0')).toBe(lowerResult)
        expect(caesarCipher(lowerCaseLetters, 'C1')).toBe('bcdefghijklmnopqrstuvwxyza')
    })
    test('return correct value if not a letter', () => {
        expect(caesarCipher("12345", 'C1')).toBe("12345")
        expect(caesarCipher("12345", 'C0')).toBe("12345")
    })

})
