const request = require('request-promise');

/**
 *
 * @param {AccessTokenProvider} accessTokenProvider
 * @param {Object} options - Configuration
 * @param {string} options.componentUrl - Base url for appUsers endpoint
 * @constructor
 */
function Users(accessTokenProvider, options){
    this.options = options;
    this.accessTokenProvider = accessTokenProvider;
    if(!options){
        throw "options must be provided for Users component";
    }

    if(!options.componentUrl){
        options.componentUrl = 'https://usersapp-auth.saasmgr.com/api/appUsers';
    }
}

/**
 *
 * @param {Object} registration - Registration data
 * @param {string} registration.username
 * @returns {Promise.<TResult>}
 */
Users.prototype.register = function(registration){
    const registrationUrl = options.componentUrl+'/'+'register';
    return this.accessTokenProvider.getAccessToken()
        .then(tenantAccessToken => {
            return request({
                method: 'POST', uri: registrationUrl, json: true, body: registration,
                qs: {
                    'access_token': tenantAccessToken.access_token
                }
            })
        })
};

Users.prototype.token = function(grant){
    const tokenUrl = this.options.componentUrl+'/oauth/token';
    return this.accessTokenProvider.getAccessToken()
        .then(tenantAccessToken => {
            return request({
                method: 'POST', uri: tokenUrl, json: true, body: grant,
                qs: {
                    'access_token': tenantAccessToken.access_token
                }
            });
        })
};

Users.prototype.tokenInfo = function(token){
    const tokenInfoUrl = this.options.componentUrl+'/oauth/tokeninfo';
    return this.accessTokenProvider.getAccessToken()
        .then(tenantAccessToken => {
            return request({
                method: 'GET', uri: tokenInfoUrl, json: true,
                qs: {
                    token : token,
                    'access_token': tenantAccessToken.access_token
                }
            });
        })
};

Users.prototype.list = function(token){
    const tokenInfoUrl = this.options.componentUrl+'/oauth/tokeninfo';
    return this.accessTokenProvider.getAccessToken()
        .then(tenantAccessToken => {
            return request({
                method: 'GET', uri: tokenInfoUrl, json: true,
                qs: {
                    token : token,
                    'access_token': tenantAccessToken.access_token
                }
            });
        })
};

module.exports = Users;
