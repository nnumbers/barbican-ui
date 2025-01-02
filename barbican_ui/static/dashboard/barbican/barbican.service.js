/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function () {
  'use strict';

  angular
    .module('horizon.app.core.openstack-service-api')
    .factory('horizon.app.core.openstack-service-api.barbican', API);

  API.$inject = [
    'horizon.framework.util.http.service',
    'horizon.framework.widgets.toast.service',
    'horizon.framework.util.i18n.gettext'
  ];

  function API(apiService, toastService, gettext) {
    var service = {
      getSecret: getSecret,
      getSecrets: getSecrets,
      createSecret: createSecret,
      updateSecret: updateSecret,
      deleteSecret: deleteSecret,
      getPayload: getPayload
    };

    return service;

    function getSecret(id) {
      return apiService.get('/api/barbican/secrets/' + id)
        .error(function() {
          var msg = gettext('Unable to retrieve the Secret with id: %(id).');
          toastService.add('error', interpolate(msg, {id: id}, true));
        });
    }

    function getPayload(id) {
      return apiService.get('/api/barbican/payload/' + id)
        .error(function() {
          var msg = gettext('Unable to retrieve the Secret Payload with id: %(id).');
          toastService.add('error', interpolate(msg, {id: id}, true));
        });
    }

    function getSecrets() {
      return apiService.get('/api/barbican/secrets/')
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the Secrets.'));
        });
    }

    function createSecret(params) {
      return apiService.put('/api/barbican/secrets/', params)
        .error(function() {
          var msg = gettext('Unable to create the Secret with name: %(name)s');
          toastService.add('error', interpolate(msg, { name: params.name }, true));
        });
    }

    function updateSecret(id, params) {
      return apiService.post('/api/barbican/secrets/' + id, params)
        .error(function(error) {
          var msg = gettext('Unable to update the secret.');
          if('status_code' in error && error.status_code == 409) {
            msg = gettext('Only empty secrets can be updated with a value.');
          }
          toastService.add('error', interpolate(msg, {}, true));
        });
    }

    function deleteSecret(id, suppressError) {
      var promise = apiService.delete('/api/barbican/secrets/', [id]);
      return suppressError ? promise : promise.error(function() {
        var msg = gettext('Unable to delete the Secret with id: %(id)s');
        toastService.add('error', interpolate(msg, { id: id }, true));
      });
    }
  }
}());
