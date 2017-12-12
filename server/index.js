const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/../fake`));

router.get('/', (request, response) => {
  response.status(200).end('bruh');
});

console.log('listening on port 3000...\n');
app.listen(3000);
