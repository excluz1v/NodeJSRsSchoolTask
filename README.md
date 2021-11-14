### Get Started

1 clone repo

2 git checkout Ciphering_CLI_Tool

3 cd /Ciphering CLI Tool

4 run in console

```bash
node my_ciphering_cli -c "A-A-A-R1-R0-R0-R0-C1-C1-A" -i "./input.txt" -o "./output.txt"
```

### OPTIONS

1. -c, --config: config for ciphers Config is a string with pattern {XY(-)}n, where:
   1.1 X is a cipher mark:
   C is for Caesar cipher (with shift 1)
   A is for Atbash cipher
   R is for ROT-8 ciphe
   1.2 Y is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
   1 is for encoding
   0 is for decoding
2. -i, --input: a path to input file
3. -o, --output: a path to output file
   For example, config "C1-C1-R0-A" means "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"
4. If the input file option is missed - use stdin as an input source.
   If the output file option is missed - use stdout as an output destination.

Usage example:

```bash
node my_ciphering_cli -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"
```

input.txt This is secret. Message about "" symbol!
output.txt Myxn xn nbdobm. Tbnnfzb ferlm "" nhteru!

```bash
node my_ciphering_cli -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./input.txt" -o "./output.txt"
```

input.txt This is secret. Message about "\_" symbol!
output.txt Vhgw gw wkmxkv. Ckwwoik onauv "\_" wqcnad!

```bash
node my_ciphering_cli -c "A-A-A-R1-R0-R0-R0-C1-C1-A" -i "./input.txt" -o "./output.txt"
```

input.txt This is secret. Message about "\_" symbol!
output.txt Hvwg wg gsqfsh. Asggous opcih "\_" gmapcz!

```bash
node my_ciphering_cli -c "C1-R1-C0-C0-A-R0-R1-R1-A-C1" -i "./input.txt" -o "./output.txt"
```

input.txt This is secret. Message about "\_" symbol!
output.txt This is secret. Message about "\_" symbol!
