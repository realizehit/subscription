# realizehit-subscription [![Build Status](https://travis-ci.org/realizehit/subscription.svg?branch=master)](https://travis-ci.org/realizehit/subscription)

Subscription pattern handling for realizehit

Probably you might want to use [realizehit/realizehit](https://github.com/realizehit/realizehit) instead.

## Installation

```js
npm install --save realizehit-subscription
```

## Usage

Subscription is used as a lib by other *realizehit* modules.

This lib is intended to generate and drive redis-valid patterns.

```js
var redis = require( 'redis' )( /* ... */ );
var Subscription = require( 'realizehit-subscription' );
var subscription = new Subscription();

// Add a channel filter
subscription.pattern.add( 'channel', 'CNN' );

// Add a show filter
subscription.pattern.add( 'show', 'tvnews' );

// gather the channel needed by redis
redis.psubscribe( subscription.pattern );
```

## FAQ

##### Why is this module separated from the core?

Because it is to be used on both repos.


##### Why don't you never use `subscription` object?

In fact we use it to store `pattern`, but methods on `subscription` should be
handled on `realizehit` (or your app) to contain specific approaches that
interact directly with pattern handling.

We need it as so because `server` and `client` has different methodologies for
actions such as `subscribe`, `unsubscribe` and so on.


##### Pattern? Why Pattern?

We use Pattern Subscription (PSUBSCRIBE) on redis instead of SUBSCRIBE.
It allows us to create a wide subscription methodology!

Example: Subscribe to entire CNN Shows.
```js
var Subscription = require( 'realizehit-subscription' );
var subscription = new Subscription();

// Add a channel filter
subscription.pattern.add( 'channel', 'CNN' );

// Add a show filter
subscription.pattern.add( 'show', Subscription.Pattern.Chunk.ALL );

```
