var chai = require( 'chai' );
var expect = chai.expect;
var Pattern = require( '../lib/pattern' );

describe( 'Pattern', function () {

    it( 'should parse pattern from filter values with quotes', function () {
        var pattern = new Pattern();

        pattern.add( 'channel', 'testing' );

        expect( pattern.parse() ).to.be.equal( "channel:\"testing\"" );
    });

    it( 'should be able to use multiple filters', function () {
        var pattern = new Pattern();

        pattern.add( 'channel', 'testing' );
        pattern.add( 'event', 'somethint' );

        expect( pattern.parse() ).to.be.equal( "channel:\"testing\"|event:\"somethint\"" );
    });

    it( 'should maintain same pattern by sorting filters', function () {
        var pattern = new Pattern();

        pattern.add( 'event', 'somethint' );
        pattern.add( 'channel', 'testing' );

        expect( pattern.parse() ).to.be.equal( "channel:\"testing\"|event:\"somethint\"" );
    });


    it( 'should use pattern chunks without quotes', function () {
        var pattern = new Pattern();
        var chunk = Pattern.Chunk.ALL;

        pattern.add( 'user', chunk );

        expect( pattern.parse() ).to.be.equal( "user:"+ chunk );
    });

    it( 'should throw errors parsing empty filters', function () {
        var pattern = new Pattern();

        pattern.add( 'channel', '' );

        expect(function () {
            return pattern.parse();
        }).to.throw( TypeError );    });

    it( 'should throw errors parsing spaced filters', function () {
        var pattern = new Pattern();

        pattern.add( 'channel', '      ' );

        expect(function () {
            return pattern.parse();
        }).to.throw( TypeError );
    });

    it( 'should throw errors parsing tabed filters', function () {
        var pattern = new Pattern();

        pattern.add( 'channel', "\t\t\t\t" );

        expect(function () {
            return pattern.parse();
        }).to.throw( TypeError );
    });

    it( 'should throw errors parsing spaced and tabed filters', function () {
        var pattern = new Pattern();

        pattern.add( 'channel', '   \t\t  \t   ' );

        expect(function () {
            return pattern.parse();
        }).to.throw( TypeError );
    });

});
