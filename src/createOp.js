/**
 * Create entry to Strapi DB
 *
 * @format
 */

require('dotenv').config();
const path = require('path');
const scriptName = path.basename(__filename);
const axios = require('axios').default;
const { checkNull } = require('../src/utils');
const { insertLogger } = require('./logger.js');

const BASE_URL = process.env.BASE_URL;
const COLLECTION_NAME = process.env.COLLECTION_NAME;
const TOKEN = process.env.TOKEN;

async function createEntry(values, stationData) {
	try {
		const headers = {
			Authorization: `Bearer ${TOKEN}`,
			'Content-Type': 'application/json',
		};

		// Define the updated JSON entry
		const entry = {
			data: {
				code: Number(checkNull('code', values.properties.id)),
				name: checkNull('name', values.properties.name),
				river: checkNull('river', values.properties.river),
				basin: checkNull('basin', values.properties.basin),
				start: checkNull('start', values.properties.s_date),
				last: checkNull('last', values.properties.e_date),
				anomaly: Number(checkNull('anomalia', values.properties.anomalia)),
				sat: checkNull('sat', values.properties.sat),
				value: Number(checkNull('value', values.properties.value)),
				change: Number(checkNull('change', values.properties.change)),
				latitude: Number(
					checkNull('latitude', values.geometry.coordinates[1])
				),
				longitude: Number(
					checkNull('longitude', values.geometry.coordinates[0])
				),
				data: stationData.data.data,
				overall: stationData.data.overall,
			},
		};

		const updateResponse = await axios
			.post(`${BASE_URL}/${COLLECTION_NAME}`, entry, { headers })
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				insertLogger.error(scriptName + ' ' + error.message);
			});
	} catch (error) {
		insertLogger.error(scriptName + ' ' + error.message);
	}
}

module.exports = { createEntry };
