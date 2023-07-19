/** @format */
require('dotenv').config();
const path = require('path');
const axios = require('axios').default;

const filePath = path.join(__dirname, './svs_sel/');
const { getJSONFile, checkNull } = require('./src/utils');
const { getData } = require('./src/fileOperations');
const { createEntry } = require('./src/createOp');

const STATIONS = process.env.STATIONS;
const BASE_URL = process.env.BASE_URL;
const COLLECTION_NAME = process.env.COLLECTION_NAME;
const TOKEN = process.env.TOKEN;

function insertStations() {
	try {
		const sData = getJSONFile(filePath, STATIONS);
		// array with all stations from geojson file
		const vstations = sData.features;
		const stationNames = new Array();

		vstations.forEach((element, index) => {
			setTimeout(() => {
				console.log(element.properties.name);
				createEntry(element, getData(element.properties.name));
			}, index * 1000);
		});
		return stationNames;
	} catch (err) {
		console.log(err);
	}
}

insertStations();
