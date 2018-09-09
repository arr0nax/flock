const path = require('path');
const convict = require('convict');
const Dotenv = require('dotenv');

Dotenv.config({
  silent: true,
});

//  - test
//  - development
//  - staging
//  - production

const defaultPort = 8080;

const config = convict({
  // General
  projectName: {
    doc: 'The project name.',
    format: String,
    default: 'FlowJo Exchange API',
    env: 'PROJECT_NAME',
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'staging', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: defaultPort,
    env: 'PORT',
    arg: 'port',
  },

  // API
  apiURL: {
    doc: 'The api URI.',
    format: 'url',
    default: `http://127.0.0.1:${defaultPort}/`,
    env: 'API_URI',
  },
  clientURL: {
    doc: 'The client URI.',
    format: 'url',
    default: 'http://127.0.0.1:3000/',
    env: 'CLIENT_URI',
  },
  cors: {
    additionalHeaders: {
      doc: 'List of headers for cors.',
      format: Array,
      default: ['X-Access-Token', 'X-Refresh-Token'],
    },
    additionalExposedHeaders: {
      doc: 'The project name.',
      format: Array,
      default: ['X-Access-Token', 'X-Refresh-Token'],
    },
  },
  apiPath: {
    doc: 'Root of API controllers and routes',
    format: String,
    default: path.join(__dirname, '/../src/api'),
  },
  // policyPath: {
  //   doc: 'Root of policies',
  //   format: String,
  //   default: path.join(__dirname, '/../src/policies'),
  // },

  // DB
  db: {
    name: {
      doc: 'Database name',
      format: String,
      default: 'hapi-practice',
      env: 'DB_NAME',
    },
    user: {
      doc: 'Database username',
      format: String,
      default: 'postgres',
      env: 'DB_USER',
    },
    password: {
      doc: 'Database password',
      format: String,
      default: '',
      env: 'DB_PASS',
    },
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: '127.0.0.1',
      env: 'DB_HOST',
    },
    port: {
      doc: 'Database port',
      format: 'port',
      default: 5432,
      env: 'DB_PORT',
    },
  },

  // JWT
  token: {
    secret: {
      doc: 'JWT Secret',
      format: '*',
      default: 'sheep',
      env: 'JWT_SECRET',
    },
  },

});

// Load environment dependent configuration
// const env = config.get('env');
// config.loadFile(`./config/${env}.json`);
// Perform validation
config.validate({
  allowed: 'strict',
});

module.exports = config;
