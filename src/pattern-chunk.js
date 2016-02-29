var assign = require( 'object-assign' )

function Pattern ( pattern ) {

    if (
        typeof pattern !== 'string' ||
        ( pattern = pattern.trim() ).length === 0
    ) {
        throw new TypeError( "please provide a valid pattern" )
    }

    assign( this, pattern )
    this._string = pattern
}

module.exports = Pattern

// Inherit prototype from String
Pattern.prototype = Object.create( String.prototype )

Pattern.prototype.valueOf =
Pattern.prototype.toString = function () {
    return this._string
}
