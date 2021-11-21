const { stdin, stdout, stderr, exit } = require('process');
const process = require('process')
const { constants } = require('fs')
const { access } = require('fs/promises')


function checkFileExists(readline) {
    let flagValue
    for (let i = 0; i < readline.length; i++) {
        if (readline[i] === '-i' || readline[i] === '--input') {
            flagValue = readline[i + 1]
            try {
                access(flagValue, constants.F_OK && constants.R_OK)
                options.input = flagValue
            } catch (error) {
                createError('no such file', flagValue)
            }
        } else if (readline[i] === '-o' || readline[i] === '--output') {
            flagValue = readline[i + 1]
            try {
                access(flagValue, constants.F_OK && constants.W_OK)
                options.output = flagValue
            } catch (error) {
                createError('no such file', flagValue)
            }
        }

    }
}

function checkConfigIsExist(readline = []) {
    if (readline.includes('-c' || '--config')) {
        let configArgument = readline.indexOf('-c' || '--config') + 1
        options.config = readline[configArgument]
        return validateConfig(readline[configArgument]) ?
            checkNoFlagsDuplicate(readline) :
            createError('invalid config')
    } else createError('missing config')
}

function validateConfig(configString) {
    const variations = ["C1", "C0", "A", "R1", "R0"]
    return configString.split('-').every(el => variations.includes(el))
}

function checkNoFlagsDuplicate(readline) {
    const flagsCount = {
        "c": 0,
        "i": 0,
        "o": 0
    }
    readline.map(el => {
        if (el === '-c' || el === '--config') flagsCount.c += 1
        else if (el === '-i' || el === '--input') flagsCount.i += 1
        else if (el === '-o' || el === '--output') flagsCount.o += 1
    })
    for (let key in flagsCount) {
        if (flagsCount[key] > 1) createError(`${key} flag is duplicated`)
    }
    return checkFileExists(readline)
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name
    }
}

function createError(description, fileName) {
    if (description === 'missing config') {
        throw new ValidationError('config flag is required')
    } else if (description === 'invalid config') throw new ValidationError('Config option accept only these operators ["C1", "C0", "A", "R1", "R0"]')
    else if (description === 'c flag is duplicated') throw new ValidationError('--config flag is duplicated')
    else if (description === 'i flag is duplicated') throw new ValidationError('--input flag is duplicated')
    else if (description === 'o flag is duplicated') throw new ValidationError('--output flag is duplicated')
    else if (description === 'no such file') throw new ValidationError(`no such file or directory ${fileName}`)


    // stderr.write(error.message)
    // process.exit(1)
}

exports.validation = function (readline) {
    checkConfigIsExist(readline)
}
const options = {
    "input": 'stdin',
    "output": 'stdout',
    "config": ''
}
exports.options = options
exports.ValidationError = ValidationError
