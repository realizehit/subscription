var Pattern = require( './pattern' ),
    crypto = require( 'crypto' ),
    debug = require( 'debug' )( 'realizehit:subscription' );

function Subscription ( filters ) {
    if ( ! ( this instanceof Subscription ) ) {
        throw new Error( "Subscription is a constructor, call with `new`" );
    }

    var subscription = this;

    debug( "creating new Subscription" );

    this.id = undefined;
    this.pattern = undefined;
    this.status = Subscription.Status.UNSUBSCRIBED;

    this.pattern = new Pattern( filters );

    function updateId () {
        subscription.id = crypto
            .createHash( 'md5' )
            .update( subscription.pattern )
            .digest( 'hex' )
            .substr( 0, 8 );
    }

    this.pattern.on( 'updated', updateId );

    if ( filters ) {
        updateId();
    }

}

Subscription.Pattern = Pattern;

module.exports = Subscription;

Subscription.Status = {
    UNSUBSCRIBED: false,
    SUBSCRIBED: true,
};

Subscription.prototype.toPattern =
Subscription.prototype.toValue =
Subscription.prototype.toString =
    function () {
        return this.pattern.toString();
    };

// methods that should be overriden

Subscription.prototype.subscribed = function () {
    return this.status;
};
Subscription.prototype.unsubscribed = function () {
    return ! this.status;
};
Subscription.prototype.subscribe = function () {
    this.status = Subscription.Status.SUBSCRIBED;
};
Subscription.prototype.unsubscribe = function () {
    this.status = Subscription.Status.UNSUBSCRIBED;
};
