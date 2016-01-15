var chai = require( 'chai' )
var expect = chai.expect
var Pattern = require( '../lib/pattern' )

describe( 'Pattern', function () {

    it( 'should stringify pattern from filter values with quotes', function () {
        var pattern = new Pattern()

        pattern.add( 'channel', 'testing' )

        expect( pattern.stringify() ).to.be.equal( "channel:testing" )
    })

    it( 'should be able to use multiple filters', function () {
        var pattern = new Pattern()

        pattern.add( 'channel', 'testing' )
        pattern.add( 'event', 'somethint' )

        expect( pattern.stringify() ).to.be.equal( "channel:testing|event:somethint" )
    })

    it( 'should maintain same pattern by sorting filters', function () {
        var pattern = new Pattern()

        pattern.add( 'event', 'somethint' )
        pattern.add( 'channel', 'testing' )

        expect( pattern.stringify() ).to.be.equal( "channel:testing|event:somethint" )
    })

    // NOTE:
    // Skip tests until we support magic chunks
    it.skip( 'should use pattern chunks without quotes', function () {
        var pattern = new Pattern()
        var chunk = Pattern.Chunk.ALL

        pattern.add( 'user', chunk )

        expect( pattern.stringify() ).to.be.equal( "user:"+ chunk )
    })

    it( 'should throw errors adding empty filters', function () {
        var pattern = new Pattern()

        expect(function () {
            pattern.add( 'channel', '' )
        }).to.throw( Error )
    })

    it( 'should throw errors adding spaced filters', function () {
        var pattern = new Pattern()

        expect(function () {
            pattern.add( 'channel', '      ' )
        }).to.throw( Error )
    })

    it( 'should throw errors adding tabed filters', function () {
        var pattern = new Pattern()

        expect(function () {
            pattern.add( 'channel', "\t\t\t\t" )
        }).to.throw( Error )
    })

    it( 'should throw errors adding spaced and tabed filters', function () {
        var pattern = new Pattern()

        expect(function () {
            pattern.add( 'channel', '   \t\t  \t   ' )
        }).to.throw( Error )
    })

})
