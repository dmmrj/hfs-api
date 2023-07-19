/** @format */
require('dotenv').config();
const path = require('path');
const axios = require('axios').default;
const { insertLogger } = require('./src/logger.js');
const filePath = path.join(__dirname, './svs_sel/');
const { getJSONFile, checkNull } = require('./src/utils');
const { getData } = require('./src/fileOperations');
const { createEntry } = require('./src/createOp');

const STATIONS = process.env.STATIONS;

function insertStations() {
	try {
		const sData = getJSONFile(filePath, STATIONS);
		// array with all stations from geojson file
		const vstations = sData.features;

		let updateCount = 0;
		let interval = 1000; // how much time should the delay between two iterations be (in milliseconds)?
		let promise = Promise.resolve();
		vstations.forEach((element, index) => {
			promise = promise.then(function () {
				createEntry(element, getData(element.properties.name));
				updateCount++;
				return new Promise(function (resolve) {
					setTimeout(resolve, interval);
				});
			});
		});
		promise.then(function () {
			updateLogger.info(
				'Database updated - Number of entries:' +
					features.length +
					' inserted entries:' +
					updateCount
			);
		});
	} catch (err) {
		console.log(err);
	}
}

insertStations();
