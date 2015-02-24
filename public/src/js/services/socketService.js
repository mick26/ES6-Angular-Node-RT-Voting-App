'use strict';

/*
 * Make the socket instance
 */

/*================================================================
- Define a class
- The class will be registered as a controller
=================================================================*/
export default class socket {
	constructor(socketFactory) {
		return socketFactory();
	};
};
