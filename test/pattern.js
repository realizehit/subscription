var chai = require( 'chai' );
var expect = chai.expect;
var Pattern = require( '../lib/pattern' );

describe( 'Pattern', function () {

    describe( 'evaluations', function () {

        before(function () {
            this.string = '*';
            this.pattern = new Pattern( this.string );
        });

        it( 'should compare well with origin string', function () {
            expect( this.pattern ).to.be.equal( this.pattern );
        });

        it( 'should be instance of pattern', function () {
            expect( this.pattern ).to.be.instanceof( Pattern );
        });

        it( 'should be instance of string', function () {
            expect( this.pattern ).to.be.instanceof( String );
        });

        it( 'should get "object" from typeof', function () {
            expect( typeof this.pattern ).to.be.equal( 'object' );
        });

    });

    describe( 'errors', function () {

        it( 'should throw a TypeError when nothing is given', function () {
            expect(function () {
                return new Pattern();
            }).to.throw( TypeError );
        });

        it( 'should throw a TypeError when a non-string is given', function () {
            expect(function () {
                return new Pattern( 4 );
            }).to.throw( TypeError );
        });

        it( 'should throw a TypeError on an empty string', function () {
            expect(function () {
                return new Pattern( '' );
            }).to.throw( TypeError );
        });

        it( 'should throw a TypeError on an spaced string', function () {
            expect(function () {
                return new Pattern( '       ' );
            }).to.throw( TypeError );
        });

    });

});
