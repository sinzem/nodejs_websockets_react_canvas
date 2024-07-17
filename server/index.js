const express = require('express');
const WSServer = require('express-ws');

const app = express();

WSServer(app); /* (запускаем вебсокет-сервер) */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


