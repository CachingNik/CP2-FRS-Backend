const express = require("express");
const flights = require("./routes/flights");

const app = express();

app.use(express.json());
app.use("/api/flights", flights);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
