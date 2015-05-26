var chai = require( 'chai' );
var expect = chai.expect;
var PatternChunk = require( '../lib/pattern-chunk' );

describe( 'PatternChunk', function () {

    describe( 'evaluations', function () {

        before(function () {
            this.string = '*';
            this.patternChunk = new PatternChunk( this.string );
        });

        it( 'should compare well with origin string', function () {
            expect( this.patternChunk._string ).to.be.equal( this.string );
        });

        it( 'should be instance of pattern', function () {
            expect( this.patternChunk ).to.be.instanceof( PatternChunk );
        });

        it( 'should be instance of string', function () {
            expect( this.patternChunk ).to.be.instanceof( String );
        });

        it( 'should get "object" from typeof', function () {
            expect( typeof this.patternChunk ).to.be.equal( 'object' );
        });

    });

    describe( 'errors', function () {

        it( 'should throw a TypeError when nothing is given', function () {
            expect(function () {
                return new PatternChunk();
            }).to.throw( TypeError );
        });

        it( 'should throw a TypeError when a non-string is given', function () {
            expect(function () {
                return new PatternChunk( 4 );
            }).to.throw( TypeError );
        });

        it( 'should throw a TypeError on an empty string', function () {
            expect(function () {
                return new PatternChunk( '' );
            }).to.throw( TypeError );
        });

        it( 'should throw a TypeError on an spaced string', function () {
            expect(function () {
                return new PatternChunk( '       ' );
            }).to.throw( TypeError );
        });

    });

});
