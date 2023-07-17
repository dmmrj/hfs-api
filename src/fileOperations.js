/** @format */

const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '../svs_sel/');
const Station = require('./Station.js');

function getData(value) {
	try {
		// Assuming you want to update the first entry in the response

		let minYear = 0;
		let maxYear = 0;
		let regex = /^\d/;

		let fileMinContent = fs.readFileSync(
			DIR + `min_hydroprd_${value}.txt`,
			'utf-8'
		);
		let minLines = fileMinContent.split('\n');
		let dataSetMin = new Array();

		minLines.forEach(function (line, index) {
			// Process each line here
			if (index == 0 && line.includes('#min')) {
				let varLine = line.split('::');
				minYear = varLine[1].trim();
			} else if (index > 0 && line.charAt(0) != '#' && regex.test(line)) {
				let varLine = line.split(' ');
				dataSetMin.push({
					date: varLine[0],
					dateTime: new Date(varLine[0]),
					valueMin: Number(varLine[1]),
				});
			}
		});

		let fileMaxContent = fs.readFileSync(
			DIR + `max_hydroprd_${value}.txt`,
			'utf-8'
		);
		let maxLines = fileMaxContent.split('\n');
		let dataSetMax = new Array();

		// regex blank line test
		const regex2 = /^\s*$/;

		maxLines.forEach(function (line, index) {
			// Process each line here
			if (index == 0 && line.includes('#max')) {
				let varLine = line.split('::');
				maxYear = varLine[1].trim();
			} else if (index > 0 && line.charAt(0) != '#' && regex.test(line)) {
				let varLine = line.split(' ');
				dataSetMax.push({
					date: varLine[0],
					dateTime: new Date(varLine[0]),
					valueMax: Number(varLine[1]),
				});
			}
		});

		let fileMenContent = fs.readFileSync(
			DIR + `men_hydroprd_${value}.txt`,
			'utf-8'
		);
		let menLines = fileMenContent.split('\n');
		let dataSetMen = new Array();

		menLines.forEach(function (line, index) {
			// Process each line here
			if (line.charAt(0) != ' ' && !regex2.test(line)) {
				let varLine = line.split(' ');
				dataSetMen.push({
					date: varLine[0],
					dateTime: new Date(varLine[0]),
					valueMen: Number(varLine[1]),
					valueHigh: Number(varLine[2]),
					valueLow: Number(varLine[3]),
				});
			}
		});

		let dataGeneral = getStationFileData(value);

		// Prepare the updated data for the entry
		const updatedData = {
			data: {
				overall: {
					men: dataSetMen,
					maxData: dataSetMax,
					minData: dataSetMin,
					maxYear: maxYear,
					minYear: minYear,
				},
				data: dataGeneral,
			},
		};
		return updatedData;
	} catch (error) {
		console.error(
			'Error updating entry:',
			error.response ? error.response.data : error.message
		);
	}
}

function getStationFileData(fileString) {
	try {
		var fileContent = fs.readFileSync(
			DIR + `hydroprd_${fileString}.txt`,
			'utf-8'
		);
		var lines = fileContent.split('\n');
		var stationObj = new Station();
		var varLine;
		let dataSet = new Array();
		let regex = /^\d/;

		lines.forEach(function (line, index) {
			// Process each line here
			if (index == 0 && line.includes('#BASIN')) {
				varLine = line.split('::');
				stationObj.basin = varLine[1].trim();
			} else if (index == 1 && line.includes('#RIVER')) {
				varLine = line.split('::');
				stationObj.river = varLine[1].trim();
			} else if (index == 2 && line.includes('#ID')) {
				varLine = line.split('::');
				stationObj.id = varLine[1].trim();
			} else if (index == 3 && line.includes('#TRIBUTARY')) {
				varLine = line.split('::');
				stationObj.tributaryOf = varLine[1].trim();
			} else if (index == 4 && line.includes('#APPROX')) {
				varLine = line.split('::');
				stationObj.apprWidthReach = varLine[1].trim();
			} else if (index == 5 && line.includes('#SURFACE')) {
				varLine = line.split('::');
				stationObj.surfUpstreamWatershed = varLine[1].trim();
			} else if (index == 6 && line.includes('#RATING')) {
				varLine = line.split('::');
				stationObj.ratingCurve = varLine[1].trim();
			} else if (index == 7 && line.includes('#REFERENCE ELLIPSOID')) {
				varLine = line.split('::');
				stationObj.refEllipsoid = varLine[1].trim();
			} else if (index == 8 && line.includes('#REFERENCE LONGITUDE')) {
				varLine = line.split('::');
				stationObj.refLongitude = varLine[1].trim();
			} else if (index == 9 && line.includes('#REFERENCE LATITUDE')) {
				varLine = line.split('::');
				stationObj.refLatitude = varLine[1].trim();
			} else if (index == 10 && line.includes('#REFERENCE DISTANCE')) {
				varLine = line.split('::');
				stationObj.refDistance = varLine[1].trim();
			} else if (index == 11 && line.includes('#GEOID MODEL')) {
				varLine = line.split('::');
				stationObj.geoidModel = varLine[1].trim();
			} else if (index == 12 && line.includes('#GEOID ONDULATION')) {
				varLine = line.split('::');
				stationObj.geoidOndulation = varLine[1].trim();
			} else if (index == 13 && line.includes('#MISSION')) {
				varLine = line.split('::');
				stationObj.missionTrack = varLine[1].trim();
			} else if (index == 14 && line.includes('#STATUS')) {
				varLine = line.split('::');
				stationObj.status = varLine[1].trim();
			} else if (index == 15 && line.includes('#VALIDATION')) {
				varLine = line.split('::');
				stationObj.validation = varLine[1].trim();
			} else if (index == 16 && line.includes('#MEAN ALTITUDE')) {
				varLine = line.split('::');
				stationObj.meanAltitude = varLine[1].trim();
			} else if (index == 17 && line.includes('#MEAN SLOPE')) {
				varLine = line.split('::');
				stationObj.meanSlope = varLine[1].trim();
			} else if (index == 18 && line.includes('#NUMBER')) {
				varLine = line.split('::');
				stationObj.numMeasurements = varLine[1].trim();
			} else if (index == 19 && line.includes('#FIRST')) {
				varLine = line.split('::');
				stationObj.firstDate = varLine[1].trim();
			} else if (index == 20 && line.includes('#LAST')) {
				varLine = line.split('::');
				stationObj.lastDate = varLine[1].trim();
			} else if (index == 21 && line.includes('#DISTANCE MIN')) {
				varLine = line.split('::');
				stationObj.distanceMin = varLine[1].trim();
			} else if (index == 22 && line.includes('#DISTANCE MAX')) {
				varLine = line.split('::');
				stationObj.distanceMax = varLine[1].trim();
			} else if (index == 23 && line.includes('#PRODUCTION')) {
				varLine = line.split('::');
				stationObj.prodDate = varLine[1].trim();
			} else if (index == 24 && line.includes('#PRODUCT VERSION')) {
				varLine = line.split('::');
				stationObj.prodVersion = varLine[1].trim();
			} else if (index == 25 && line.includes('#PRODUCT CITATION')) {
				varLine = line.split('::');
				stationObj.prodCitation = varLine[1].trim();
			} else if (index == 26 && line.includes('#SOURCES')) {
				varLine = line.split('::');
				stationObj.sources = varLine[1].trim();
			} else if (index == 27 && line.includes('#PRODUCT CONTENT')) {
				varLine = line.split('::');
				stationObj.prodContent = varLine[1].trim();
			} else if (index > 28 && line.charAt(0) != '#' && regex.test(line)) {
				varLine = line.split(' ');
				let uncertainty = varLine[3];
				let height = varLine[2];
				let time = varLine[1];
				let date = varLine[0];
				let dateparts = date.split('-'); // Split the string into an array of parts
				let timeparts = time.split(':');
				// Note: JavaScript months are zero-based, so we subtract 1 from the month value
				let year = parseInt(dateparts[0]);
				let month = parseInt(dateparts[1]) - 1;
				let day = parseInt(dateparts[2]);
				let hour = parseInt(timeparts[0]);
				let minute = parseInt(timeparts[1]);

				let dateTime = new Date(year, month, day, hour, minute);

				stationObj._dataSet.push({
					date: dateTime,
					height: height,
					uncertainty: uncertainty,
				});
			}
		});
		return stationObj;
	} catch (err) {
		console.error('Error reading file:', err);
	}
}

module.exports = { getData };
