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
   * @name horizon.dashboard.barbican.secrets.create.service
   * @description Service for the secret create modal
   */
  angular
    .module('horizon.dashboard.barbican.secrets')
    .factory('horizon.dashboard.barbican.secrets.create.service', createService);

  createService.$inject = [
    '$location',
    'horizon.app.core.openstack-service-api.barbican',
    'horizon.app.core.openstack-service-api.policy',
    'horizon.framework.util.actions.action-result.service',
    'horizon.framework.util.i18n.gettext',
    'horizon.framework.util.q.extensions',
    'horizon.framework.widgets.toast.service',
    'horizon.dashboard.barbican.secrets.events',
    'horizon.dashboard.barbican.secrets.model',
    'horizon.dashboard.barbican.secrets.resourceType',
    'horizon.dashboard.barbican.secrets.workflow'
  ];

  function createService(
    $location, api, policy, actionResult, gettext, $qExtensions,
    toast, events, model, resourceType, workflow
  ) {

    var message = {
      success: gettext('Secret %s was successfully created.')
    };

    var service = {
      initAction: initAction,
      perform: perform,
      allowed: allowed
    };

    function initAction() {}

    return service;

    /* eslint-disable no-unused-vars */
    function perform(selected) {
      // modal title, buttons
      var title, submitText, submitIcon;
      title = gettext('Create Secret');
      submitText = gettext('Create');
      submitIcon = "fa fa-check";
      model.init();

      var result = workflow.initCreate(title, submitText, submitIcon, model.spec);
      return result.then(submit);
    }

    function allowed() {
      return $qExtensions.booleanAsPromise(true);
      // fixme: if you need to set policy, change as follow
      //return policy.ifAllowed({ rules: [['secret', 'create_secret']] });
    }

    function submit() {
      model.cleanProperties();
      return api.createSecret(model.spec).then(success);
    }

    function success(response) {
      response.data.id = response.data.uuid;
      toast.add('success', interpolate(message.success, [response.data.id]));
      var result = actionResult.getActionResult()
                   .created(resourceType, response.data.id);
      if (result.result.failed.length === 0 && result.result.created.length > 0) {
        $location.path('/project/secrets');
      } else {
        return result.result;
      }
    }
  }
})();
