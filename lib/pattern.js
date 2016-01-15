var PatternChunk = require( './pattern-chunk' )
var Util = require( 'findhit-util' )
var EventEmitter = require( 'events' ).EventEmitter
var debug = require( 'debug' )( 'realizehit:subscription' )

function Pattern ( filters ) {
    debug( "creating new pattern" )
    this.reset( filters )
}

Pattern.prototype = Object.create( EventEmitter.prototype )

Pattern.Chunk = require( './pattern-chunks' )
Pattern.RegExp = {
    filter: /^[0-9A-Za-z]*$/,
    chunk: /^[0-9A-Za-z]*$/,
}

module.exports = Pattern

Pattern.prototype.has = function ( filter ) {
    return typeof this.filters[ filter ] !== 'undefined'
}

Pattern.prototype.add = function ( filter, chunk ) {
    debug( "adding filter to pattern %s:%s", filter, chunk )

    if ( ! filter ) {
        throw new Error( "chunk not defined" )
    } else {
        filter = filter+''
    }

    if ( ! filter.match( Pattern.RegExp.filter ) ) {
        throw new TypeError( "invalid filter provided" )
    }

    if ( ! chunk ) {
        throw new Error( "chunk not defined" )
    } else {
        chunk = chunk+''
    }

    if ( this.has( filter ) ) {
        throw new Error( "filter already exist" )
    }

    if (
        ! chunk.match( Pattern.RegExp.filter ) &&
        ! ( chunk instanceof PatternChunk )
    ) {
        throw new TypeError( "invalid chunk provided" )
    }

    this.filters[ filter ] = chunk

    return this
}

Pattern.prototype.remove = function ( filter ) {

    if ( ! this.has( filter ) ) {
        throw new Error( "filter doesn't exist" )
    }

    delete this.filters[ filter ]

    return this
}

Pattern.prototype.reset = function ( filters ) {
    this.filters = {}

    if ( filters ) {
        this.update( filters )
    }

    this.emit( 'created' )
    return this
}

Pattern.prototype.update = function ( filters ) {

    if ( Util.isnt.Object( filters ) ) {
        throw new TypeError( "invalid filters provided" )
    }

    for ( var filter in filters ) {
        if ( filters.hasOwnProperty( filter ) ) {
            this.add( filter, filters[ filter ] )
        }
    }

    this.stringify()
    this.emit( 'updated' )

    return this
}

Pattern.prototype.stringify = function ( forSubscribe ) {
    var filters = this.filters
    var keys = Object.keys( filters )

    if ( keys.length === 0 ) {
        throw new Error( "Cannot stringify without having filters" )
    }

    var string

    keys.sort(function ( a, b ) {
        return a > b
    })

    string = keys
        .map(function ( name ) {
            var chunk =
                filters[ name ] instanceof PatternChunk ? filters[ name ] :
                ( filters[ name ] +'' ).trim()

            if ( chunk.length === 2 ) {
                throw new TypeError( "invalid filter.prop chunk provided" )
            }

            return name + ( forSubscribe && '\\:'|| ':' ) + chunk
        })
        .join( ( forSubscribe && '\\|'|| '|' ) )

    this._string = string
    return string
}

Pattern.prototype.valueOf =
Pattern.prototype.toString = function () {
    return this._string
}
