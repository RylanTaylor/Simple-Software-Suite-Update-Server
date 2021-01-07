const logging = require("./logging");
const fs = require("fs");
const glob = require("glob");

function get_software_list() {
	return new Promise((resolve, reject) => {
		fs.readdir("./app/data/software/", "utf8", (err, contents) => {
			if (err) reject(err);
			resolve(contents);
		});
	});
}

function get_version_number(software) { //Checks the "ver.txt" of the software to get the most current version
	return new Promise((resolve, reject) => {
		fs.readFile("./app/data/software/" + software + "/ver.txt", "utf8", (err, contents) => {
			if (err) reject(err);
			
			resolve(contents);
		});
	});
}

let check_update = async (req, res) => {

	let user = "UNKNOWN_USER";

	if ("user" in req.query) { //If a user is specified, set it here for logging
		user = req.query["user"];
	}

	if ("software" in req.query && "client_version" in req.query) {

		let software_list;

		try { //Check if the program requested is included in the software folder
			software_list = await get_software_list();
		}
		catch (error) {
			logging.write_log(user, "Invalid update request.");
			res.sendStatus(403);
		}
		if (software_list.includes(req.query["software"])) {

			let current_version = false;
			
			try {
				current_version = await get_version_number(req.query["software"]);
			}
			catch (error) {
				logging.write_log(user, "Error finding version number - " + error);
				res.sendStatus(403);
			}

			if (req.query["client_version"] == current_version) {
				logging.write_log(user, req.query["software"] + " - Using latest version.");
				res.sendStatus(204);
			}
			else {
				logging.write_log(user, req.query["software"] + " - Update required, using \"" + req.query["client_version"] + "\", latest is \"" + current_version + "\".");
				res.sendStatus(200);
			}
		}
		else {
			logging.write_log(user, req.query["software"] + " - Not found in software list.");
			res.sendStatus(403);
		}
	}
	else {
		if ("user" in req.query) {
			logging.write_log(user, "Invalid update request.");
			res.sendStatus(403);
		}
		else {
			logging.write_log(user, "Invalid update request.");
			res.sendStatus(403);
		}
	}

};

let get_directory = function (src, callback) {
	glob(src + "/**/*", callback);
};

let get_update = async (req, res) => { //Gets the path of all the files for a given software and returns them in a JSON format

	let user = "UNKNOWN_USER";

	if ("user" in req.query) {//If a user is specified, set it here for logging
		user = req.query["user"];
	}

	if ("software" in req.query) {

		let software_list = false;

		try { //Check if software requested is in list
			software_list = await get_software_list();
		}
		catch (error) {
			logging.write_log(user, "Invalid update request.");
			res.sendStatus(403);
		}

		let software = req.query["software"];

		if (software_list.includes(req.query["software"])) {
			get_directory("./app/data/software/" + software + "/", (err, data) => {
				if (err) {
					logging.write_log(user, "Error getting directory for " + software + ".");
					res.sendStatus(403);
				}
				else { //Get the files and subfolders in a directory then add them to a "new_data" array
					let new_data = [];
					for (let item in data) {
						new_data.push(data[item].replace("./app/data/software/", "")); //Removes the path to the files
					}
					res.status(200);
					res.send(JSON.stringify(new_data)); //Send "new_data" array to client as a JSON string
					logging.write_log(user, "Sent files for \"" + software + "\".");
				}
			});
		}
		else {
			logging.write_log(user, "Software not found - " + software);
			res.sendStatus(403);
		}
	}
	else {
		logging.write_log(user, "Incorrect query for getting update files.");
		res.send(403);
	}
};

module.exports = {
	check_update,
	get_update
};