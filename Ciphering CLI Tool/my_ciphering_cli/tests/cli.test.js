const { exec } = require('child_process');


//Success scenarios
describe('Success scenarios', () => {

    test('Take cipher usage scenarios from first task description usage examples.', () => {
        exec(
            `node my_ciphering_cli -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./input.txt"`,
            (error, stdout, stderr) => {
                expect(stdout).toEqual('Vhgw gw wkmxkv. Ckwwoik onauv "" wqcnad!');

            })
    })
})