'use strict';

/*================================================================
Import Angular modules for:
- routes
- controllers
- services
- directives
=================================================================*/
import { default as routesModuleName } from './votingApp.routes.js';
import { default as servicesModuleName } from './services/votingApp.services.js';
import { default as controllersModuleName } from './controllers/votingApp.controllers.js';

/*================================================================
Main App Module Name
=================================================================*/
var moduleName = 'votingApp';


/*================================================================
Main App Angular Module
=================================================================*/
angular.module(moduleName, ['btford.socket-io', 'nvd3ChartDirectives', 
	routesModuleName, servicesModuleName, controllersModuleName]);

export default moduleName;
