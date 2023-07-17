/** @format */

/*
  Update to Strapi Files
*/

require('dotenv').config();
const path = require('path');
const axios = require('axios').default;

const filePath = path.join(__dirname, './svs_sel/');
const { getJSONFile, checkNull } = require('./src/utils');
const { getData } = require('./src/fileOperations');

const STATIONS = process.env.STATIONS;
const BASE_URL = process.env.BASE_URL;
const COLLECTION_NAME = process.env.COLLECTION_NAME;
const TOKEN = process.env.TOKEN;

function checkForChange() {
	const lastFile = getJSONFile(filePath, `vs_last.geojson`);
	const currentFile = getJSONFile(filePath, `vs_All.geojson`);
	const features = lastFile.features;
	const featuresCurrent = currentFile.features;
	console.log(featuresCurrent.length);
	console.log(features.length);

	const filteredFile = features.filter((element, index) => {
		let lastDate = element.properties.e_date;
		let currentDate = featuresCurrent[index].properties.e_date;
		let lName = element.properties.name;
		let cName = featuresCurrent[index].properties.name;
		return lastDate != currentDate && lName == cName;
	});

	filteredFile.forEach((element, index) => {
		setTimeout(() => {
			let lName = element.properties.name;
			let updatedData = getData(lName);
			updateEntry(element, updatedData);
		}, index * 2000);
	});
}

async function updateEntry(element, stationData) {
	try {
		const headers = {
			Authorization: `Bearer ${TOKEN}`,
			'Content-Type': 'application/json',
		};

		let stationName = element.properties.name;

		const response = await axios.get(
			`${BASE_URL}/${COLLECTION_NAME}?filters[name]=${stationName}`
		);
		const entries = response.data;
		console.log(entries);

		// Assuming you want to update the first entry in the response
		if (entries) {
			const entryId = entries.data[0].id;

			// Define the updated JSON entry
			const updatedEntry = {
				data: {
					data: stationData.data.data,
					overall: stationData.data.overall,
				},
			};
			// Make a PUT request to update the entry
			const updateResponse = await axios.put(
				`${BASE_URL}/${COLLECTION_NAME}/${entryId}`,
				updatedEntry,
				{ headers }
			);

			console.log('Entry created successfully:', updateResponse.data);
		} else {
			console.log(
				'No entry found with the specified custom specific field.'
			);
		}
	} catch (err) {
		console.log(err);
	}
}

checkForChange();
