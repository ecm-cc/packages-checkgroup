const axios = require('axios');

/**
 * Checks if a user is in a specific group
 * @param {Object} req Express.js request object
 * @param {String} adminGroup Group to be checked
 * @returns {Boolean} Indicates if a user is in the group
 */
async function load (req, group) {
	let isInGroup = false;
	if(req.headers.cookie) {
		const options = {
			headers: {
				Accept: 'application/hal+json',
				'Content-Type': 'application/hal+json',
				Cookie: req.headers.cookie,
			},
			url: `${req.systemBaseUri}/identityprovider/validate?allowExternalValidation=true`,
		};
		const response = await axios(options);
		if (response.data.groups.some((userGroup) => userGroup.value === group)) {
			isInGroup = true;
		}
	}
	return isInGroup;
}

/**
 * @module checkgroup
 * Checks if a user is in a specific group
 */
module.exports = load;