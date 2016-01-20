var Util = require( 'findhit-util' )
var PatternChunk = require( './pattern-chunk' )

module.exports = Util.Object.map(

    // Chunks
    {
        ALL: '"*"'
    },

    // handling
    function ( pattern ) {
        return new PatternChunk( pattern )
    }
)
