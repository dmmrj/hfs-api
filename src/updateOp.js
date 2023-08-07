/**
 * Create entry to Strapi DB
 *
 * @format
 */

require('dotenv').config();
const path = require('path');
const scriptName = path.basename(__filename);
const DIR_DRAINAGE = path.join(__dirname, '../assets/data/drainage/');
const { getJSONFile } = require('../src/utils');

const axios = require('axios').default;
const { updateLogger } = require('./logger.js');

const BASE_URL = process.env.BASE_URL;
const COLLECTION_NAME = process.env.COLLECTION_NAME;
const TOKEN = process.env.TOKEN;

async function updateEntry(element, stationData) {
	try {
		const headers = {
			Authorization: `Bearer ${TOKEN}`,
			'Content-Type': 'application/json',
		};

		let stationName = element.properties.name;

		const response = await axios
			.get(`${BASE_URL}/${COLLECTION_NAME}?filters[name]=${stationName}`)
			.then((response) => {
				const entries = response.data;
				console.log(entries);

				// Assuming you want to update the first entry in the response
				if (entries.meta.pagination.total != 0) {
					const entryId = entries.data[0].id;
					console.log(entryId);
					// Define the updated JSON entry
					const updatedEntry = {
						data: {
							data: stationData.data.data,
							overall: stationData.data.overall,
						},
					};
					// Make a PUT request to update the entry
					const updateResponse = axios
						.put(
							`${BASE_URL}/${COLLECTION_NAME}/${entryId}`,
							updatedEntry,
							{ headers }
						)
						.then((result) => {
							// add object to list of stories
							console.log('StatusCode :' + result.status);
							console.log(result.data.data.id);
						})
						.catch((err) => {
							console.log(err);
							console.log(
								'No entry found with in DB the specified custom specific field.'
							);
						});
				} else {
					console.log(
						'No entry found in DB for: ' + element.properties.name
					);
					updateLogger.info(
						scriptName +
							' No entry found in DB for: ' +
							element.properties.name
					);
				}
			})
			.catch((err) => {
				console.log(err);
				console.log(
					'No entry found with the specified custom specific field.!!!'
				);
				updateLogger.error(
					scriptName +
						' No entry found in DB for: ' +
						element.properties.name
				);
			});
	} catch (error) {
		console.error(`${error.stack}`);
		updateLogger.error(scriptName + ' ' + error.message);
	}
}

async function updateDrainage(element, stationData) {
	try {
		const headers = {
			Authorization: `Bearer ${TOKEN}`,
			'Content-Type': 'application/json',
		};

		let stationName = element.properties.name;

		let dataObject = getJSONFile(
			DIR_DRAINAGE,
			'layer_' + stationName + '.geojson'
		);

		const response = await axios
			.get(`${BASE_URL}/${COLLECTION_NAME}?filters[name]=${stationName}`)
			.then((response) => {
				const entries = response.data;
				console.log(entries);

				// Assuming you want to update the first entry in the response
				if (entries.meta.pagination.total != 0) {
					const entryId = entries.data[0].id;
					console.log(entryId);
					// Define the updated JSON entry
					const updatedEntry = {
						data: {
							drainage: dataObject,
						},
					};
					// Make a PUT request to update the entry
					const updateResponse = axios
						.put(
							`${BASE_URL}/${COLLECTION_NAME}/${entryId}`,
							updatedEntry,
							{ headers }
						)
						.then((result) => {
							// add object to list of stories
							console.log('StatusCode :' + result.status);
							console.log(result.data.data.id);
						})
						.catch((err) => {
							console.log(err);
							console.log(
								'No entry found with in DB the specified custom specific field.'
							);
						});
				} else {
					console.log(
						'No entry found in DB for: ' + element.properties.name
					);
					updateLogger.info(
						scriptName +
							' No entry found in DB for: ' +
							element.properties.name
					);
				}
			})
			.catch((err) => {
				console.log(err);
				console.log(
					'No entry found with the specified custom specific field.!!!'
				);
				updateLogger.error(
					scriptName +
						' No entry found in DB for: ' +
						element.properties.name
				);
			});
	} catch (error) {
		console.error(`${error.stack}`);
		updateLogger.error(scriptName + ' ' + error.message);
	}
}

module.exports = { updateEntry, updateDrainage };
