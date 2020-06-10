const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const path = require("path");

app.use(require("body-parser").json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "../dist/")));

app.listen(port, () => console.log(`Server listening on ${port}!`));
