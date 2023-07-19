/** @format */

/*
  Update to Strapi DB
*/

require('dotenv').config();
const path = require('path');
const axios = require('axios').default;
const { updateLogger } = require('./src/logger.js');
const filePath = path.join(__dirname, './svs_sel/');
const { getJSONFile } = require('./src/utils');
const { getData } = require('./src/fileOperations');
const { updateEntry } = require('./src/updateOp');

const STATIONS = process.env.STATIONS;
const BASE_URL = process.env.BASE_URL;
const COLLECTION_NAME = process.env.COLLECTION_NAME;
const TOKEN = process.env.TOKEN;

function updadeAll() {
	// Load stations general information from geojson
	const currentFile = getJSONFile(filePath, STATIONS);
	/* Select array of features from Geojson
     ex.: [{ "type": "Feature", "properties": { "name": "R_AMAZONAS_ABACAXIS-TRIB01_KM1220", "id": ...
  */
	const featuresCurrent = currentFile.features;
	console.log(featuresCurrent.length);

	/*
		Update all stations  entries
		setTimout to not spam async fetch functions to quickly to the REST API  
	*/
	featuresCurrent.forEach((element, index) => {
		setTimeout(() => {
			let stationName = element.properties.name;
			let updatedData = getData(stationName);
			updateEntry(element, updatedData);
		}, index * 2000);
	});
}

updadeAll();
