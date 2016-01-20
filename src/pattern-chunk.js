var Util = require( 'findhit-util' )

function Pattern ( pattern ) {

    if (
        typeof pattern !== 'string' ||
        ( pattern = pattern.trim() ).length === 0
    ) {
        throw new TypeError( "please provide a valid pattern" )
    }

    Util.extend( this, pattern )
    this._string = pattern
}

module.exports = Pattern

// Inherit prototype from String
Pattern.prototype = Object.create( String.prototype )

Pattern.prototype.valueOf =
Pattern.prototype.toString = function () {
    return this._string
}
