import extend from 'extend';
import path from 'path';
import glob from 'glob';
import Mrhorse from 'mrhorse';
import HapiSwagger from 'hapi-swagger';
import Inert from 'inert';
import Vision from 'vision';
import url from 'url';

import GeneralUtil from '../utils/general';
import to from '../utils/to';
import Config from '../../config/config';

class APIPlugin {
  // NAME = 'api';

  constructor() {
    this.registerApi = this.registerApi.bind(this);
    this.register = this.register.bind(this);
  }

  async registerMrHorse(server, config) {
    console.log('register-MrHorse');
    const policyPath = config.get('policyPath');
    console.log(`policyPath ${policyPath}`);

    await server.register([
      Inert,
      Vision,
      {
        plugin: Mrhorse,
        options: {
          policyDirectory: policyPath,
        },
      },
    ]);

    if (config.enablePolicies) {
      await server.plugins.mrhorse.loadPolicies(server, {
        policyDirectory: path.join(__dirname, '/policies'),
      });
    }

    console.log('MrHorse plugin registered');
  }

  async registerHapiSwagger(server, config) {
    console.log('register-HapiSwagger');
    const [err, packageJson] = await to(GeneralUtil.readJson('../../package.json'));

    if (err) {
      this.log.error(err);
    }

    const apiURLString = config.get('apiURL');
    const apiURL = new url.URL(apiURLString);
    const scheme = apiURL.protocol.replace(':', '');
    const {
      host,
    } = apiURL;

    await server.register([{
      plugin: HapiSwagger,
      options: {
        schemes: [scheme],
        host,
        info: {
          title: `${config.get('projectName')} Docs`,
          version: packageJson.version,
        },
      },
    }]);

    console.log('HapiSwagger plugin registered');
  }

  registerApi(server, config) {
    const apiPath = config.get('apiPath');
    console.log(`reading apiPath ${apiPath}`);

    return new Promise((resolve, reject) => {
      glob(`${apiPath}/**/*.js`, (err, files) => {
        if (err) {
          reject(err);
        }
        files.forEach((file) => {
          const fileName = path.basename(file, '.js');

          if (fileName.toLowerCase() === 'routes') {
            console.log(`loading ${file}`);
            // eslint-disable-next-line global-require, import/no-dynamic-require
            require(file)(server);
          }
        });

        resolve();
      });
    });
  }

  async register(server, options) {

    const config = Config;
    extend(true, config, options.config);

    await this.registerHapiSwagger(server, config);

    await this.registerMrHorse(server, config);

    return this.registerApi(server, config);
  }
}

module.exports = (() => {
  const plugin = new APIPlugin();
  return {
    name: 'api',
    register: plugin.register,

    instance: plugin,
    APIPlugin, // testing only
  };
})();
