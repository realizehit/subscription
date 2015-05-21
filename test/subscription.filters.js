var chai = require( 'chai' );
var expect = chai.expect;
var Subscription = require( '../lib/subscription' );

describe( 'Subscription', function () {

    describe( 'filters', function () {

        describe( 'pattern', function () {

            it( 'should parse pattern from filter values with quotes', function () {
                var subscription = new Subscription();
                var filters = {};

                filters.channel = 'testing';

                subscription.filters = filters;
                expect( subscription.pattern ).to.be.equal( "[channel:\"testing\"]" );
            });

            it( 'should be able to use multiple filters', function () {
                var subscription = new Subscription();
                var filters = {};

                filters.channel = 'testing';
                filters.event = 'somethint';

                subscription.filters = filters;
                expect( subscription.pattern ).to.be.equal( "[channel:\"testing\"|event:\"somethint\"]" );
            });

            it( 'should maintain same pattern by sorting filters', function () {
                var subscription = new Subscription();
                var filters = {};

                filters.event = 'somethint';
                filters.channel = 'testing';

                subscription.filters = filters;
                expect( subscription.pattern ).to.be.equal( "[channel:\"testing\"|event:\"somethint\"]" );
            });

        });

        it( 'should use pattern chunks without quotes' );
        it( 'should throw errors parsing empty filters' );

    });

});
