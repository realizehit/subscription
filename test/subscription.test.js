var chai = require( 'chai' )
var expect = chai.expect
var Subscription = require( '../lib/subscription' )

describe( "Subscription", function () {

    describe( "status related", function () {

        beforeEach(function () {
            this.subscription = new Subscription()
        })

        it( "should be unsubscribed after construction", function () {
            expect(
                this.subscription.subscribed()
            ).to.be.equal( false )
        })

        it( "should be subscribed after `subscribe`", function () {
            this.subscription.subscribe()

            expect(
                this.subscription.subscribed()
            ).to.be.equal( true )
        })

        it( "should be unsubscribed after `unsubscribe`", function () {
            this.subscription.unsubscribe()

            expect(
                this.subscription.subscribed()
            ).to.be.equal( false )
        })

    })

})
