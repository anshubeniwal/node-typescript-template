import { cwd } from 'process';
require('dotenv').config({ path: cwd() + '/.env' });
import fs from 'fs';
import { IConfigApp, DeepPartial } from '@config/constraint';
import defaultConstants from '@config/default';
import customEvnVariables from '@config/custom-environment-variables';
import { flattenObject, unFlattenObject, mergeDeep } from '@/helpers';

const configDir = process.env.CONFIG_DIR || 'src/config';
const nonEnvFiles = ['constraint', 'custom-environment-variables', 'default'];
const availableEnvironments: string[] = fs
  .readdirSync(configDir)
  .map(file => {
    const fileName: string = file.split('.')[0];
    if (!nonEnvFiles.includes(fileName)) {
      return fileName;
    }
    return null;
  })
  .filter(fileName => fileName !== null);

function assignEnvs(customEvnVariables: object, nodeEnvObject: Object) {
  const flattedObject = flattenObject(customEvnVariables);
  Object.keys(flattedObject).forEach(variable => {
    if (nodeEnvObject[flattedObject[variable]] !== undefined) {
      const value = nodeEnvObject[flattedObject[variable]];
      const isNumber = /^\d+\.\d+$|^\d+$/.test(value);
      flattedObject[variable] = isNumber
        ? parseFloat(nodeEnvObject[flattedObject[variable]])
        : nodeEnvObject[flattedObject[variable]];
      const isBoolean = /^(true|false)$/.test(value);
      if (isBoolean) {
        flattedObject[variable] = value.trim() === 'true';
      }
    } else {
      throw new Error(`Env variable ${flattedObject[variable]}, is not defined`);
    }
  });
  const result = unFlattenObject(flattedObject);
  return result;
}

function getEnvironmentVariables() {
  const nodeEnvs = process.env;
  return assignEnvs(customEvnVariables, nodeEnvs);
}

function getEnvironmentConstants(environment: string): DeepPartial<IConfigApp> {
  if (availableEnvironments.includes(environment)) return require(`./config/${environment}`);
  return {};
}

const configInitialized = () => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  let constants: IConfigApp = defaultConstants;
  const environmentVariables = getEnvironmentVariables();
  const environmentConstants: DeepPartial<IConfigApp> = getEnvironmentConstants(nodeEnv);
  constants = mergeDeep(constants, environmentConstants, environmentVariables);
  return constants;
};
const config = configInitialized();

export { config };
