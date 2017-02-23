# uw-lib-mssql.js

Think wrapper around https://www.npmjs.com/package/mssql with some additional connection monitoring.

Note that `mssql` is a peer dependency.

## API

```node
const mssql = require('@utilitywarehouse/uw-lib-mssql.js');

const db = mssql(options, {interval: 10}); //seconds

db.on('connected', () => console.log('connected');
db.on('disconnected', (err) => console.error('disconnected', err);

db.connect();
```
