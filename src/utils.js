/** @format */
const fs = require('fs');

function checkNull(name, property) {
	if (property === null || property === undefined) {
		console.log(property);
		throw new Error('Entry is null. Property ' + name + ' is ' + property);
	}
	return property;
}

function getJSONFile(path, fileName) {
	try {
		const data = fs.readFileSync(path + fileName, {
			encoding: 'utf8',
			flag: 'r',
		});
		return JSON.parse(data);
	} catch (err) {
		console.log('Error loading file: ' + err);
	}
}

module.exports = { getJSONFile, checkNull };
