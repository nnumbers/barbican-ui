(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name horizon.dashboard.barbican
   * @description
   * Dashboard module to host various barbican panels.
   */
  // fixme: if ngRoute and $routeProvider are unnecessary, remove them
  /* eslint-disable no-unused-vars */

  angular
      .module('horizon.dashboard.barbican.secrets')
      .factory('horizon.dashboard.barbican.secrets.workflow.schemaFactory', schemaFactory);

  schemaFactory.$inject = [
    'horizon.dashboard.barbican.offerdValues',
  ];

  function schemaFactory($provide) {
    var factory = {
        init: init
    };

    function init(mode) {
      var schema = {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          secret_type: {
            type: 'string',
            default: 'opaque'
          },
          expirationDate: {
            type: 'Date'
          },
          expirationTime: {
            type: 'Date',
            default: new Date('1970-01-01T00:00:00')
          },
          payload_content_type: {
            type: 'string',
            default: ''
          },
          payload: {
            type: 'string'
          },
          payloadFile: {
            type: 'string',
            format: 'base64',
            maxSize: 65535
          },
          algorithm: {
            type: 'string',
            default: ''
          },
          custom_algorithm: {
            type: 'string',
            default: '',
            required: true
          },
          mode: {
            type: 'string',
            default: ''
          },
          custom_mode: {
            type: 'string',
            required: true
          },
          bit_length: {
            type: 'string',
            default: ''
          },
          custom_bit_length: {
            type: 'number',
            default: 4096,
            required: true
          }
        }
      };

      if(mode == 'update') {
        schema.properties.payload_content_type.default = 'text/plain';
      }

      return schema;
    }
    return factory;
  }
  /* eslint-disable no-unused-vars */
})();
