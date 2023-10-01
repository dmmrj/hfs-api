/** @format */

/*
  Update to Strapi DB
*/

require('dotenv').config();
const path = require('path');
const scriptName = path.basename(__filename);
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

function checkForChange() {
	try {
		const lastFile = getJSONFile(filePath, `vs_Last.geojson`);
		const currentFile = getJSONFile(filePath, `vs_All.geojson`);
		const features = lastFile.features;
		const featuresCurrent = currentFile.features;
		let updateCount = 0;
		// Stop process if files have diferent numbers of entries
		if (featuresCurrent.length != features.length) {
			throw new Error(
				scriptName +
					' GeoJson files entries size is different! - Last:' +
					features.length +
					' Current:' +
					featuresCurrent.length
			);
		}

		/*
		compares last date between vs_last and vs_all
		if is different add it to new arrayList of stations names
	  */
		const filteredFile = features.filter((element, index) => {
			let lastDate = element.properties.e_date;
			let currentDate = featuresCurrent[index].properties.e_date;
			let lName = element.properties.name;
			let cName = featuresCurrent[index].properties.name;
			return lastDate != currentDate && lName == cName;
		});
		/*
		with the new list of updated stations names
		update the entry of those stations
	*/
		let interval = 2000; // how much time should the delay between two iterations be (in milliseconds)?
		let promise = Promise.resolve();
		filteredFile.forEach((element, index) => {
			promise = promise.then(function () {
				let lName = element.properties.name;
				let updatedData = getData(lName);
				console.log(lName);
				result = updateEntry(element, updatedData);
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
					' updated entries:' +
					updateCount
			);
		});
	} catch (error) {
		console.error(`${error.name}: ${error.message}`);
		updateLogger.error(error.message);
	}
}

checkForChange();
