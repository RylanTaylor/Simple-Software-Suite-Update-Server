const fs = require("fs");

async function write_log(user, message) {
	message = message.replace(/(\r\n|\n|\r)/gm, ""); //Strip newlines
	let output = user + ": " + message;
	let stream = fs.createWriteStream("./app/data/logs/update_server.log", {flags:"a"});
	stream.write("(" + Date.now() + ") " +output + "\n");
	stream.end();
	console.log(output);
}

module.exports = {
	write_log
};