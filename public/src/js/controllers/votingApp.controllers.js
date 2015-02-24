/*================================================
Define the Controllers
================================================ */
'use strict';


/*================================================================
import the files containing the classes 
that are to be registered as controllers
=================================================================*/
import PollListCtrl from './listVotesController.js';
import PollNewCtrl from './newVoteController.js';
import PollItemCtrl from './voteController.js';

var moduleName = 'votingApp.controllers';

/*================================================================
create an Angular Module to contain the controllers
Register the classes as controllers
=================================================================*/
angular.module(moduleName, [])
    .controller('votingApp.pollListCtrl', PollListCtrl)
    .controller('votingApp.pollNewCtrl', PollNewCtrl)
    .controller('votingApp.pollItemCtrl', PollItemCtrl);

export default moduleName;

