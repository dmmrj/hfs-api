/** @format */
require('dotenv').config();
const path = require('path');
const { insertLogger } = require('./src/logger.js');
const filePath = path.join(__dirname, './svs_sel/');
const { getJSONFile } = require('./src/utils');
const { getData } = require('./src/fileOperations');
const { createEntry } = require('./src/createOp');

const STATIONS = process.env.STATIONS;
const STATION_NAME = process.argv[2];

function insertStations(name) {
	try {
		console.log(STATION_NAME);
		const sData = getJSONFile(filePath, STATIONS);
		// array with all stations from geojson file
		const vstations = sData.features;

		vstations.forEach((element, index) => {
			if (element.properties.name == name) {
				console.log(element.properties.name);
				createEntry(element, getData(element.properties.name));
			}
		});
	} catch (error) {
		insertLogger.error(error.message);
	}
}

insertStations(STATION_NAME);
