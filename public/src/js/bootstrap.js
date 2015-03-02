
/*================================================================
Bootstrap.js file loads the main AngularJS module 
and manually bootstraps the Angular app. 
We cannot use ng-app to bootstrap the application as 
modules are loaded asynchronously.
The main App Module is 'votingModule'
=================================================================*/ 
'use strict';

import { default as votingApp} from './app.js';

angular.bootstrap(document, [votingApp]);

//import { default as votingModule} from './js/app.js';
//angular.bootstrap(document, [votingModule]);
