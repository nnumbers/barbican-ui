#    Copyright (c) 2013 Mirantis, Inc.
#
#    Licensed under the Apache License, Version 2.0 (the "License"); you may
#    not use this file except in compliance with the License. You may obtain
#    a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
#    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
#    License for the specific language governing permissions and limitations
#    under the License.

from django.conf import settings
from django.utils.translation import gettext_lazy as _
import horizon

# Load the api rest services into Horizon
import barbican_ui.api.rest_api  # noqa


class BarbicanUI(horizon.Dashboard):
    name = getattr(settings, 'BARBICAN_DASHBOARD_NAME', _("Barbican"))
    slug = "barbican"
    default_panel = "secrets"
    supports_tenants = True


try:
    horizon.base.Horizon.registered('barbican')
except horizon.base.NotRegistered:
    horizon.register(BarbicanUI)