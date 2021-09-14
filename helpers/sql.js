const { BadRequestError } = require('../expressError');

// * Helper for updating only certain queries.

// * @param dataToUpdate An object that changes one field value to another value: {field1: newVal, field2: newVal, ...}
// * @param jsToSql An object that maps data to database

// * @returns {Object} {sqlSetCols, dataToUpdate}

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
	const keys = Object.keys(dataToUpdate);
	if (keys.length === 0) throw new BadRequestError('No data');

	// {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
	const cols = keys.map(
		(colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
	);

	return {
		setCols: cols.join(', '),
		values: Object.values(dataToUpdate),
	};
}

module.exports = { sqlForPartialUpdate };
