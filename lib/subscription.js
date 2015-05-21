var Util = require( 'findhit-util' ),
    Pattern = require( './pattern' ),
    crypto = require( 'crypto' ),
    debug = require( 'debug' )( 'realizehit:subscription' );

function Subscription () {
    var subscription = this;

    this.id = undefined;
    this.pattern = undefined;
    this.status = Subscription.Status.UNSUBSCRIBED;

    (function () {
        var filters;

        Object.defineProperty( subscription, 'filters', {

            enumerable: true,

            get: function () {
                return filters || undefined;
            },

            set: function ( d ) {
                filters = Util.is.Object( d ) && d || undefined;

                subscription.pattern = subscription.generatePattern( filters );
                subscription.id = subscription.generateId();

                debug(
                    'setted up filters for subscription',
                    subscription.id,
                    subscription.pattern,
                    d
                );
            },

        });
    })();

}

module.exports = Subscription;

Subscription.Status = {
    UNSUBSCRIBED: false,
    SUBSCRIBED: true,
};

Subscription.Patterns = Util.Object.map(
    {
        ALL_CHARS: '*'
    },

    // handling
    function ( pattern ) {
        return new Pattern( pattern );
    }
);

Subscription.prototype.generatePattern = function ( filters ) {
    filters = filters || this.filters || undefined;
    var kfilters;

    if (
        Util.isnt.Object( filters ) ||
        ( kfilters = Object.keys( filters ) ).length === 0
    ) {
        throw new TypeError( "invalid filters provided" );
    }

    kfilters.sort(function ( a, b ) {
        return a > b;
    });

    var pattern;

    pattern = kfilters
        .map(function ( name ) {
            var value = ( filters[ name ] +'' ).trim();

            if (
                value.length === 0
            ) {
                throw new TypeError( "invalid filter.prop value provided" );
            }

            var fpattern =
                name +
                ':' +
                (
                    value instanceof Pattern ?
                    value._string :
                    "\"" + value + "\""
                );

            return fpattern;
        })
        .join( '|' );

    // wrap pattern
    pattern = '['+ pattern +']';

    return pattern;
};

Subscription.prototype.generateId = function ( pattern ) {
    pattern = pattern || this.pattern || undefined;

    if ( ! pattern ) {
        throw new TypeError( "invalid pattern provided" );
    }

    var id = crypto
        .createHash( 'md5' )
        .update( pattern )
        .digest( 'hex' )
        .substr( 0, 8 );

    return id;
};

Subscription.prototype.toPattern =
Subscription.prototype.toValue =
Subscription.prototype.toString =

    function () {
        return this.pattern;
    };

// methods that should be overriden

Subscription.prototype.subscribed = function () {
    return this.status;
};
Subscription.prototype.subscribe = function () {};
Subscription.prototype.unsubscribe = function () {};
