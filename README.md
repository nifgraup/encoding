# Encoding

**encoding** is a simple wrapper around [iconv-lite](https://github.com/ashtuchkin/iconv-lite/) to convert strings from one encoding to another.

## Install

Install through npm

    npm install encoding

## Usage

Require the module

    var encoding = require("encoding");

Convert with encoding.convert()

    var resultBuffer = encoding.convert(text, toCharset, fromCharset);

Where

  * **text** is either a Buffer or a String to be converted
  * **toCharset** is the characterset to convert the string
  * **fromCharset** (*optional*, defaults to UTF-8) is the source charset

Output of the conversion is always a Buffer object.

Example

    var result = encoding.convert("ÕÄÖÜ", "Latin_1");
    console.log(result); //<Buffer d5 c4 d6 dc>

## Known issues

Due to the use of **iconv-lite**, only charsets supported by this library are supported!

## License

**MIT**