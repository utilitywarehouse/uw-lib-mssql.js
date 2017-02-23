# uw-lib-mssql.js

Slim wrapper around https://www.npmjs.com/package/mssql offering brute connection monitoring.

Note that `mssql` is a peer dependency.

## API

```node
const mssql = require('@utilitywarehouse/uw-lib-mssql.js');

const db = mssql(options, {interval: 10}); //seconds

db.on('connect', () => console.log('connected');
db.on('disconnect', (err) => console.error('disconnected', err);

db.connect();
```
