/** @format */
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

function insertStations() {
	try {
		const sData = getJSONFile(filePath, STATIONS);
		//console.log(sData.features);
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

async function createEntry(values, stationData) {
	try {
		const headers = {
			Authorization: `Bearer ${TOKEN}`,
			'Content-Type': 'application/json',
		};

		// Define the collection name and the custom specific field you want to use
		const collectionName = COLLECTION_NAME;

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
			.catch((error) => error);
		console.log('Entry created successfully:', updateResponse.data);
	} catch (err) {
		console.log(err);
	}
}

insertStations();
