const { rot8Cipher } = require('../ROT-8')

describe('return correct letters', () => {
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const resultR1 = "IJKLMNOPQRSTUVWXYZABCDEFGH"
    const resultR0 = "STUVWXYZABCDEFGHIJKLMNOPQR"
    test("pass for upperCase letters", () => {
        expect(rot8Cipher(uppercaseLetters, 'R1')).toBe(resultR1)
        expect(rot8Cipher(uppercaseLetters, 'R0')).toBe(resultR0)
    }
    )

    const lowerCaseLetters = uppercaseLetters.toLowerCase()
    const resultR1Lower = resultR1.toLowerCase()
    const resultR0Lower = resultR0.toLowerCase()

    test("pass for upperCase letters", () => {
        expect(rot8Cipher(lowerCaseLetters, 'R1')).toBe(resultR1Lower)

        expect(rot8Cipher(lowerCaseLetters, 'R0')).toBe(resultR0Lower)
    }
    )

    const notLetters = '12345!@#$%^&*()-+_'

    test('pass for non-letters', () => {
        expect(rot8Cipher(notLetters, 'R1')).toBe(notLetters)
        expect(rot8Cipher(notLetters, 'R0')).toBe(notLetters)
    })


})
