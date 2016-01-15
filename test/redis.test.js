var Redis = require( 'ioredis' )
var Promise = require( 'bluebird' )
var Subscription = require( '../lib/subscription' )
var debug = require( 'debug' )( 'realizehit:test:redis' )

var connections = [ 'sub', 'pub' ]

describe( 'Redis tests', function () {

    // Create redis connections
    beforeEach(function () {
        var context = this

        var host = 'localhost'
        var port = 6379

        connections.forEach(function ( attr ) {
            context[ attr ] = new Redis({
                host: host,
                port: port
            })
        })
    })

    // Destroy redis connections
    afterEach(function () {
        var context = this
        connections.forEach(function ( attr ) {
            context[ attr ].disconnect()
        })
    })

    var testPubSub = Promise.method(function ( subscription, publishChannel ) {
        var context = this

        subscription = new Subscription( subscription )
        publishChannel = new Subscription.Pattern( publishChannel ).stringify()

        var publishMessage = 'hello-modafoca'
        var subscribingChannel = subscription.toChannel()

        var testReceivedSubMessage = new Promise(function ( fulfill ) {
            debug( "Setting up listener for sub messages" )

            context.sub.on( 'message', function ( channel, message ) {
                debug( "Message received from sub listener: %s | %s", channel, message )

                if ( channel !== publishChannel ) {
                    reject( new Error( "Invalid channel" ) )
                }

                if ( message !== publishMessage ) {
                    reject( new Error( "Invalid message" ) )
                }

                fulfill()
            })
        })


        return Promise.cast()
        .then(function () {
            debug( "Subscribing to %s", subscribingChannel )
            return context.sub.subscribe( subscribingChannel )
        })
        .then(function () {
            debug( "Publishing into channel %s | %s", publishChannel, publishMessage )
            return context.pub.publish( publishChannel, publishMessage )
        })
        .then(function () {
            return testReceivedSubMessage
        })
    })

    it( "should work for a subscription with one string pattern", function () {
        return testPubSub.call( this,
            {
                type: 'TVShow'
            },

            {
                type: 'TVShow'
            },

            'The Simpsons'
        )
    })

    it( "should work for a subscription with two string filters", function () {
        return testPubSub.call( this,
            {
                type: 'TVShow',
                name: 'TheSimpsons'
            },

            {
                type: 'TVShow',
                name: 'TheSimpsons'
            },

            'New episode available on Netflix'
        )
    })

    it( "should work for a subscription with one string and one numeric", function () {
        return testPubSub.call( this,
            {
                type: 'TVShow',
                id: 3
            },

            {
                type: 'TVShow',
                id: 3
            },

            'hello modafoca'
        )
    })

    it( "should work for a subscription with one string and one numeric but published as a string", function () {
        return testPubSub.call( this,
            {
                type: 'TVShow',
                id: 3
            },

            {
                type: 'TVShow',
                id: '3'
            },

            'hello modafoca'
        )
    })

    it( "should NOT work for a subscription without patterns", function () {
        return testPubSub.call( this,
            {
            },

            {
            },

            'hello modafoca'
        )
        .then(function () {
            throw new Error( "Expected an error instead" )
        }, function ( err ) {
            // Ignore error, as it was expected
        })
    })

})
