'use strict';

let Client = require('hobknob-client-nodejs');

const init = function(server, config, next){

    const client = new Client(config.applicationName, config.Hobknob);

    client.on('error', function(err){
        server.log(['hobknob', 'error'], err);
    });

    client.initialise(function(err){

      if(err){
        console.log('init failed');
        server.log(['hobknob', 'error'], err);
      }

      server.expose('getOrDefault', function (name, defaultValue) {
          return client.getOrDefault(name, defaultValue);
      });

      next(err);
    });
};

module.exports.register = function(server, config, next){

  if(config.Hobknob){
      return init(server, config, next);
  }

  server.log(['hobknob', 'error'], 'hobknob config not found');

  next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
