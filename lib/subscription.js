var Pattern = require( './pattern' )
var crypto = require( 'crypto' )
var debug = require( 'debug' )( 'realizehit:subscription' )
var EventEmitter = require( 'events' ).EventEmitter

function Subscription ( filters ) {
    if ( ! ( this instanceof Subscription ) ) {
        throw new Error( "Subscription is a constructor, call with `new`" )
    }

    var subscription = this

    debug( "creating new Subscription" )

    this.id = undefined
    this.status = Subscription.STATUS.UNSUBSCRIBED

    this.pattern = new Pattern( filters )

    function updateId () {
        subscription.id = crypto
            .createHash( 'md5' )
            .update( subscription.pattern.stringify() )
            .digest( 'hex' )
            .substr( 0, 8 )
    }

    this.pattern.on( 'updated', updateId )

    if ( filters ) {
        updateId()
    }

}

Subscription.prototype = Object.create( EventEmitter.prototype )
Subscription.Pattern = Pattern

module.exports = Subscription

Subscription.prototype.toChannel =
Subscription.prototype.toValue =
Subscription.prototype.toString =
    function () {
        return this.pattern.stringify()
    }

Subscription.prototype.toPatternChannel =
    function () {
        return this.pattern.stringify( true )
    }

// Handle subscription
Subscription.STATUS = {
    UNSUBSCRIBING: -2,
    UNSUBSCRIBED: 0,
    SUBSCRIBING: -1,
    SUBSCRIBED: 1,
}

// Create handlers to check status
// .unsubscribing
// .unsubscribed
// .subscribing
// .subscribed
Object.keys( Subscription.STATUS ).forEach(function ( ACTION ) {
    action = ACTION.toLowerCase()

    Subscription.prototype[ action ] = function () {
        return this.status === Subscription.STATUS[ ACTION ]
    }
})

Subscription.prototype.subscribe = function () {
    if ( this.status === Subscription.STATUS.SUBSCRIBED ) {
        return false
    }

    this.status = Subscription.STATUS.SUBSCRIBING
    this.emit( 'subscribing' )
    this.status = Subscription.STATUS.SUBSCRIBED
    this.emit( 'subscribed' )

    return true
}

Subscription.prototype.unsubscribe = function () {
    if ( this.status === Subscription.STATUS.UNSUBSCRIBED ) {
        return false
    }

    this.status = Subscription.STATUS.UNSUBSCRIBING
    this.emit( 'unsubscribing' )
    this.status = Subscription.STATUS.UNSUBSCRIBED
    this.emit( 'unsubscribed' )

    return true
}
