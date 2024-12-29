/**
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

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
    .module('horizon.dashboard.barbican', [
      'horizon.dashboard.barbican.secrets',
      'ngRoute'
    ])
    .config(config);

  config.$inject = ['$provide', '$windowProvider', '$routeProvider'];

  function config($provide, $windowProvider, $routeProvider) {
    var path = $windowProvider.$get().STATIC_URL + 'dashboard/barbican/';
    $provide.constant('horizon.dashboard.barbican.basePath', path);
    $provide.constant(
      'horizon.dashboard.barbican.offerdValues', {
        bit_length: [64, 128, 256, 1024],
        algorithm: ['aes','des','3des','twofish','sha1','rsa'],
        mode: ['cbc', 'cfb', 'ctr', 'ecb', 'ofb']
      }
    );
  }
  /* eslint-disable no-unused-vars */
})();
