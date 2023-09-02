const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const typeRoutes = require("./routes/type");
const groupRoutes = require("./routes/group");
const closeDayRoutes = require("./routes/closeDay");
const winNumberRoutes = require("./routes/winNumber");
const { connectToMongoDB } = require("./config/db");

const app = express();

// const expressWs = require("express-ws")(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());
app.use(cors());

connectToMongoDB();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/type", typeRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/close_day", closeDayRoutes);
app.use("/api/win_number", winNumberRoutes);

app.listen(8000, () => {
	console.log("App listening at 8000...");
});
