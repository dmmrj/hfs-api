/** @format */

const { createLogger, format, transports, config } = require('winston');
const winston = require('winston');
const path = require('path');
const output = path.join(__dirname, '../logs/');

const formatInfo = winston.format.combine(
	format.label({
		label: `Update-API-Data 🏷️`,
	}),
	format.timestamp({
		format: 'MMM-DD-YYYY HH:mm:ss',
	}),
	format.printf(
		(info) =>
			`${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`
	)
);

const formatError = winston.format.combine(
	format.label({
		label: `Update-API-Data 🏷️`,
	}),
	format.timestamp({
		format: 'MMM-DD-YYYY HH:mm:ss',
	}),
	format.printf(
		(info) =>
			`${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`
	)
);

const logUpdate = {
	transports: [
		new transports.Console({
			level: 'info',
			format: formatInfo,
		}),
		new transports.File({
			level: 'info',
			// Create the log directory if it does not exist
			filename: output + 'update.log',
			format: formatInfo,
		}),
		new transports.File({
			level: 'error',
			// Create the log directory if it does not exist
			filename: output + 'update-error.log',
			format: formatError,
		}),
	],
};

const logCreate = {
	transports: [
		new transports.Console({
			level: 'info',
		}),
		new transports.File({
			level: 'info',
			// Create the log directory if it does not exist
			filename: output + 'create.log',
		}),
		new transports.File({
			level: 'error',
			// Create the log directory if it does not exist
			filename: output + 'create-error.log',
		}),
	],
	format: format.combine(
		format.label({
			label: `Stations-JSON🏷️`,
		}),
		format.timestamp({
			format: 'MMM-DD-YYYY HH:mm:ss',
		}),
		format.printf(
			(info) =>
				`${info.level}: ${info.label}: ${[info.timestamp]}: ${
					info.message
				}`
		)
	),
};

const updateLogger = createLogger(logUpdate);
const insertLogger = createLogger(logCreate);

module.exports = {
	updateLog: updateLogger,
	insertLogger: insertLogger,
};
