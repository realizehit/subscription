var PatternChunk = require( './pattern-chunk' ),
    Util = require( 'findhit-util' ),
    EventEmitter = require( 'events' ).EventEmitter;

function Pattern ( filters ) {
    this.reset( filters );
}

Pattern.prototype = Object.create( EventEmitter.prototype );

Pattern.Chunk = require( './pattern-chunks' );

module.exports = Pattern;

Pattern.prototype.has = function ( filter ) {
    return typeof this.filters[ filter ] !== 'undefined';
};

Pattern.prototype.add = function ( filter, chunk ) {

    if ( typeof chunk === 'undefined' ) {
        throw new Error( "chunk not defined" );
    }

    if ( this.has( filter ) ) {
        throw new Error( "filter already exist" );
    }

    this.filters[ filter ] = chunk;

    return this;
};

Pattern.prototype.remove = function ( filter ) {

    if ( ! this.has( filter ) ) {
        throw new Error( "filter doesn't exist" );
    }

    delete this.filters[ filter ];

    return this;
};

Pattern.prototype.reset = function ( filters ) {
    this.filters = {};

    if ( filters ) {
        this.update( filters );
    }

    this.emit( 'created' );
    return this;
};

Pattern.prototype.update = function ( filters ) {

    if ( Util.isnt.Object( filters ) ) {
        throw new TypeError( "invalid filters provided" );
    }

    Util.Object.each( filters, this.add, this );
    this.parse();
    this.emit( 'updated' );

    return this;
};

Pattern.prototype.parse = function () {
    var filters = this.filters,
        keys = Object.keys( filters ),
        string;

    keys.sort(function ( a, b ) {
        return a > b;
    });

    string = keys
        .map(function ( name ) {
            var value =
                filters[ name ] instanceof PatternChunk ? filters[ name ] :
                "\"" + ( filters[ name ] +'' ).trim() + "\"";

            if ( value.length === 2 ) {
                throw new TypeError( "invalid filter.prop value provided" );
            }

            return name + ':' + value;
        })
        .join( '|' );

    this._string = string;
    return string;
};

Pattern.prototype.valueOf =
Pattern.prototype.toString = function () {
    return this._string;
};
