if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
    var iconvLite = require('iconv-lite'),
        Buffer = require('buffer-browserify').Buffer;

    /**
     * Convert encoding of an UTF-8 string or a buffer
     *
     * @param {String|Buffer} str String to be converted
     * @param {String} to Encoding to be converted to
     * @param {String} [from="UTF-8"] Encoding to be converted from
     * @return {Buffer} Encoded string
     */

    function convert(str, to, from) {
        from = checkEncoding(from || "UTF-8");
        to = checkEncoding(to || "UTF-8");
        str = str || "";

        var result;

        if (from != "UTF-8" && typeof str == "string") {
            str = new Buffer(str, "binary");
        }

        if (from == to) {
            result = str;
        } else {
            try {
                result = convertIconvLite(str, to, from);
            } catch (E) {
                result = str;
            }
        }

        if (typeof result == "string") {
            result = new Buffer(result, "utf-8");
        }

        return result;
    }

    /**
     * Convert encoding of astring with iconv-lite (if node-iconv is not available)
     *
     * @param {String|Buffer} str String to be converted
     * @param {String} to Encoding to be converted to
     * @param {String} [from="UTF-8"] Encoding to be converted from
     * @return {Buffer} Encoded string
     */

    function convertIconvLite(str, to, from) {
        if (to == "UTF-8") {
            return iconvLite.decode(str, from);
        } else if (from == "UTF-8") {
            return iconvLite.encode(str, to);
        } else {
            return iconvLite.encode(iconvLite.decode(str, from), to);
        }
    }

    /**
     * Converts charset name if needed
     *
     * @param {String} name Character set
     * @return {String} Character set name
     */

    function checkEncoding(name) {
        name = (name || "").toString().trim().
        replace(/^latin[\-_]?(\d+)$/i, "ISO-8859-$1").
        replace(/^win(?:dows)?[\-_]?(\d+)$/i, "WINDOWS-$1").
        replace(/^utf[\-_]?(\d+)$/i, "UTF-$1").
        replace(/^ks_c_5601\-1987$/i, "CP949").
        replace(/^us[\-_]?ascii$/i, "ASCII").
        toUpperCase();
        return name;
    }

    // Expose to the world
    return {
        convert: convert
    };
});