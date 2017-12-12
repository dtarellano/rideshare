const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/../fake`));

console.log('listening on port 3000...\n');
app.listen(3000);
