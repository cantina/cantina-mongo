cantina-mongo
=============

MongoDB for Cantina applications

Provides
--------

- **app.mongo** - an initialized MongoDB object

Configuration
-------------

- **mongo** - Options for creating the MongoDB client
  - **hosts** - `String` or `Array` of `host[:port]` combinations. `port` is optional. (default: `localhost:27017`)
  - **db** - `String` name of the database (default: `cantina`)
  - **auth** - `Object` hash containing `username` and `password` (default: none)
  - **options** - `Object` hash of [connection specific options](http://docs.mongodb.org/manual/reference/connection-string/#connections-connection-options) (default: none)

**Defaults**

```js
{
  mongo: {
    hosts: 'localhost:27017',
    db: 'cantina'
  }
}
```

- - -

### Developed by [TerraEclipse](https://github.com/TerraEclipse)

Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Santa Cruz, CA and Washington, D.C.

- - -

Copyright (C) 2014 Terra Eclipse, Inc. ([http://www.terraeclipse.com](http://www.terraeclipse.com))
All rights reserved.