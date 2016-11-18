'use strict';

const plugin = require('../hapi-ot-hobknob-init');
const expect = require('expect.js');

describe('hobknob plugin ', () => {
    describe('-- happy path', () => {
        describe('plugin initialised ', () => {

            const server = {
                log: function(){},
                plugins: {
                  'hapi-ot-hobknob-init' : { }
                },
                expose: function(key, value){
                    this.plugins['hapi-ot-hobknob-init'][key] = value;
                }
            };

            const Hobknob = {
              etcdPort: 4001,
              cacheIntervalMs: 30000,
              etcdHost: 'hobknob-etcd-qa.otenv.com'
            }

            const options = {
                applicationName: 'cuisine-test',
                Hobknob
            };

            before(next => {
              plugin.register(server, options, err => {
                  next(err);
                });
            });


            it('should expose client', () => {
              expect(server.plugins).to.have.property('hapi-ot-hobknob-init');
              expect(server.plugins['hapi-ot-hobknob-init'].getOrDefault).to.be.a('function');
            });
        });
    });

    describe('-- unhappy path', () => {
        describe('plugin not initialised when hobknob config missing', () => {

            const server = {
                log: function(){},
                plugins: {},
                expose: function(key, value){
                    this.plugins[key] = value;
                }
            };

            const options = {
                applicationName: 'cuisine-test'
            };

            before(next => {
              plugin.register(server, options, err => {
                  next(err);
                });
            });

            it('should not have plugin with matching name', () => {
              expect(server.plugins).to.not.have.property('hapi-ot-hobknob-init');
            });
        });
    });
});