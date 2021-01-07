const express = require("express");
const logging = require("./libraries/logging");
const check_updates = require("./libraries/check_updates");

const port = 17700;
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

function main() {

	app.get("/checkupdate", check_updates.check_update);
	app.get("/getupdate", check_updates.get_update);
	app.use("/software", express.static("./app/data/software")); //Hosts software as static files for easily downloading

	app.listen(port, () => logging.write_log("SERVER", "Simple Software Suite Listening on Port " + port + "!"));

}

main();