const { atbashCipher } = require('../Atbash_cipher')

describe('return correct letters', () => {
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const reverse = uppercaseLetters.split('').reverse().join('')

    test("pass for upperCase letters", () => {
        expect(atbashCipher(uppercaseLetters)).toBe(reverse)
    }
    )

    const notLetters = '12345!@#$%^&*()-+'

    test('pass for non-letters', () => {
        expect(atbashCipher(notLetters)).toBe(notLetters)
    })


})
