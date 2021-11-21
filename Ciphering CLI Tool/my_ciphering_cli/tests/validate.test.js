const { validation, ValidationError } = require('../validate')


//Error Scenario 
describe("Error scenarios", () => {

    test("User doesn't pass -c or --config argument", () => {
        const readline = ['-i', '../../input.txt', '-o', '../../output.txt', 'C1-C1']

        expect(() => {
            validation(readline)
        }).toThrowError(new ValidationError('config flag is required'))
    })
    test("User passes the -i argument twice", () => {
        const readline = ['-i', '../../input.txt', '-o', '../../output.txt', "-c", 'C1-C1', '-i']

        expect(() => {
            validation(readline)
        }).toThrowError(new ValidationError('--input flag is duplicated'))
    })
    test("User passes the -o argument twice", () => {
        const readline = ['-i', '../../input.txt', '-o', '../../output.txt', "-c", 'C1-C1', '-o']

        expect(() => {
            validation(readline)
        }).toThrowError(new ValidationError('--output flag is duplicated'))
    })

    test("User passes the -c argument twice", () => {
        const readline = ['-i', '../../input.txt', '-o', '../../output.txt', "-c", 'C1-C1', '-c']

        expect(() => {
            validation(readline)
        }).toThrowError(new ValidationError('--config flag is duplicated'))

    })

    test("User passes incorrent symbols in argument for --config", () => {
        const readline = ['-i', '../../input.txtqwe', '-o', '../../output.txt', "-c", 'C1-C1-qwerty',]

        expect(() => {
            validation(readline)
        }).toThrowError(new ValidationError('Config option accept only these operators ["C1", "C0", "A", "R1", "R0"]'))

    })
}
)

