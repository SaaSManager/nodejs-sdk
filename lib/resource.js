const request = require('request-promise');
const _ = require('lodash');

function Resource(accessTokenProvider, options){
    this.options = options;
    this.accessTokenProvider = accessTokenProvider;
    if(!options || !!options.componentUrl){
        throw "options.componentUrl must be provided for Resource";
    }
}

Resource.prototype.__exchange = function(method,data,queryParams,url){
    url = url || this.options.componentUrl;
    return this.accessTokenProvider.getAccessToken()
        .then(tenantAccessToken => {
            let qs = _.merge({
                'access_token': tenantAccessToken.access_token
            }, queryParams);

            return request({
                method: method, uri: url, json: true, body:data,
                qs: qs
            })
        });
};

Resource.prototype.get = function(filter, url){
    return this.__exchange('GET', null, {filter : filter}, url);
};

Resource.prototype.patch = function(data, url){
    return this.__exchange('PATCH', data, {}, url);
};

Resource.prototype.put = function(data, url){
    return this.__exchange('PUT', data, {}, url);
};

Resource.prototype.post = function(data, url){
    return this.__exchange('PUT', data, {}, url);
};

module.exports = Resource;
