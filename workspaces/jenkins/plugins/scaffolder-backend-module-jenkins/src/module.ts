/*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';
import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node/alpha';
import {
  buildJob,
  copyJob,
  createJob,
  destroyJob,
  disableJob,
  enableJob,
} from './actions/job/';
import { buildJenkinsClient } from './config';

/**
 * @public
 *
 * A backend module that registers the action into the scaffolder
 */
export const scaffolderBackendModuleJenkins = createBackendModule({
  pluginId: 'scaffolder',
  moduleId: 'jenkins',
  register({ registerInit }) {
    registerInit({
      deps: {
        scaffolderActions: scaffolderActionsExtensionPoint,
        config: coreServices.rootConfig,
        logger: coreServices.logger,
      },
      async init({ config, logger, scaffolderActions }) {
        const jenkinsClient = buildJenkinsClient(config);

        scaffolderActions.addActions(createJob(jenkinsClient, config));
        scaffolderActions.addActions(copyJob(jenkinsClient));
        scaffolderActions.addActions(buildJob(jenkinsClient));
        scaffolderActions.addActions(enableJob(jenkinsClient));
        scaffolderActions.addActions(disableJob(jenkinsClient));
        scaffolderActions.addActions(destroyJob(jenkinsClient));

        logger.info('Jenkins actions module started successfully');
      },
    });
  },
});
