import extend from 'extend';
import path from 'path';
import glob from 'glob';

import Config from '../../config/config';

class APIPlugin {
  // NAME = 'api';

  constructor() {
    this.registerApi = this.registerApi.bind(this);
    this.register = this.register.bind(this);
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
