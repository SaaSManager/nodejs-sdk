const Users         = require('./lib/users');
//const Profiles      = require('./lib/profiles');
//const Organizations = require('./lib/organizations');
//const Notifications = require('./lib/notifications');
//const Applications  = require('./lib/applications');
//const Plans         = require('./lib/plans');
//const Subscriptions = require('./lib/subscriptions');
const AccessTokenProvider = require('./lib/access-token-provider');

function SaaSMgrSDK(options){
    if(!options){
        throw "options must be provided";
    }

    var accessTokenProvider = new AccessTokenProvider(options);

    this.users = new Users(accessTokenProvider, options);
    //this.profiles = new Profiles(options);
    //this.organizations = new Organizations(options);
    //this.notifications = new Notifications(options);
    //this.applications = new Applications(options);
    //this.plans = new Plans(options);
    //this.subscriptions = new Subscriptions(options);
}

module.exports = SaaSMgrSDK;
