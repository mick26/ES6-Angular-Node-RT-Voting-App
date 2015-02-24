
'use strict';

/* ================================================================
Module that will hold all the factory services
================================================================ */
var moduleName = 'votingApp.services';


/*================================================================
import the files containing the classes 
that are to be registered as services
=================================================================*/
import dataFormatService from './dataFormatService.js';
import socket from './socketService.js';
import votingService from './votingService.js';

/*================================================================
Create an Angular Module 'votingApp.services' 
'votingApp.services' will hold all the services 
Here the classes are registered as factory services
=================================================================*/
angular.module(moduleName, [])
    .factory('dataFormatService', dataFormatService)
    .factory('socket', socket)
    .factory('votingService', votingService);

export default moduleName;
