## API Report File for "@backstage-community/plugin-vault-backend"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
import { BackendFeatureCompat } from '@backstage/backend-plugin-api';
import { Config } from '@backstage/config';
import express from 'express';
import { LoggerService } from '@backstage/backend-plugin-api';
import { RootConfigService } from '@backstage/backend-plugin-api';
import { SchedulerService } from '@backstage/backend-plugin-api';
import { SchedulerServiceTaskRunner } from '@backstage/backend-plugin-api';

// @public
export function createRouter(options: RouterOptions): express.Router;

// @public
export interface RouterOptions {
  // (undocumented)
  config: RootConfigService;
  // (undocumented)
  logger: LoggerService;
  // (undocumented)
  scheduler: SchedulerService;
}

// @public @deprecated
export interface VaultApi {
  getFrontendSecretsUrl(): string;
  listSecrets(
    secretPath: string,
    options?: {
      secretEngine?: string;
    },
  ): Promise<VaultSecret[]>;
  renewToken?(): Promise<void>;
}

// @public
export class VaultBuilder {
  constructor(env: VaultEnvironment);
  build(): VaultBuilderReturn;
  static createBuilder(env: VaultEnvironment): VaultBuilder;
  enableTokenRenew(schedule?: SchedulerServiceTaskRunner): Promise<this>;
  setVaultClient(vaultApi: VaultApi): this;
}

// @public
export type VaultBuilderReturn = {
  router: express.Router;
};

// @public
export class VaultClient implements VaultApi {
  constructor(options: { config: Config });
  // (undocumented)
  getFrontendSecretsUrl(): string;
  // (undocumented)
  listSecrets(
    secretPath: string,
    options?: {
      secretEngine?: string;
    },
  ): Promise<VaultSecret[]>;
  // (undocumented)
  renewToken(): Promise<void>;
}

// @public
export interface VaultEnvironment {
  // (undocumented)
  config: Config;
  // (undocumented)
  logger: LoggerService;
  // (undocumented)
  scheduler: SchedulerService;
}

// @public
const vaultPlugin: BackendFeatureCompat;
export default vaultPlugin;

// @public @deprecated
export type VaultSecret = {
  name: string;
  path: string;
  showUrl: string;
  editUrl: string;
};

// (No @packageDocumentation comment for this package)
```