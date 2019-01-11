import Sinon from 'sinon';
import chai from 'chai';
import faker from 'faker';

import DBHelper from '../../src/utils/db';
import DB from '../../src/models/db';
import Server from '../../src';
import Token from '../../src/utils/token';
import User from '../../src/models/user';

import Role from '../../src/models/role';
import RoleActions from '../../src/api/role/actions';

const {
  expect,
} = chai;

const mock = Sinon.mock(Role);

const NAME = 'Role';
const TABLE = 'roles';
const Actions = RoleActions;

describe(`${NAME} API`, () => {
  const password = 'password';

  const newUser = {
    id: 101,
    email: 'new@example.com',
    password: User.encrypt(password),
    uuid: '9188e163-e62e-4765-997e-31406df39df6',
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    is_active: true,
  };

  const newRole = {
    id: 2,
    name: 'Admin',
    description: 'A user with advanced permissions.',
  };

  const newModel = newRole;

  // --------------------------------------

  before(async () => {
    await DBHelper.clean(DB.knex);
    await Promise.all([
      DB.knex(TABLE).insert([newModel]),
      DB.knex('users').insert([newUser]),
    ]);
  });

  after(async () => {
    mock.restore();
  });

  // --------------------------------------

  it(`should create a/an ${NAME}`, async () => {
    const jwt = await Token.createTokenByUser(newUser, ['Admin']);
    const model = Object.assign({}, newModel);
    delete model.id;
    model.name = 'USS';
    const action = Actions.create(model);

    const options = {
      method: 'POST',
      url: `/${TABLE}`,
      payload: action,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    };

    const s = await Server;
    const response = await s.inject(options);
    expect(response.statusCode).to.equal(200);
    expect(response.result).to.be.an('Object');
    expect(response.result.name).to.equal(model.name);
  });

  it(`should get a/an ${NAME}`, async () => {
    const jwt = await Token.createTokenByUser(newUser, ['Admin']);
    const action = Actions.getOne(newModel.id);
    const options = {
      method: 'GET',
      url: `/${TABLE}/${newModel.id}`,
      payload: action,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    };

    const s = await Server;
    const response = await s.inject(options);
    expect(response.statusCode).to.equal(200);
    expect(response.result).to.be.an('Object');
    expect(response.result.city).to.equal(newModel.city);
  });

  it(`should update a/an ${NAME}`, async () => {
    const jwt = await Token.createTokenByUser(newUser, ['Admin']);
    const action = Actions.update({
      name: 'AAA',
    });
    const options = {
      method: 'PATCH',
      url: `/${TABLE}/${newModel.id}`,
      payload: action,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    };

    const s = await Server;
    const response = await s.inject(options);
    expect(response.statusCode).to.equal(200);
    expect(response.result).to.be.an('Object');
    expect(response.result.name).to.equal('AAA');
  });

  it(`should delete a/an ${NAME}`, async () => {
    const jwt = await Token.createTokenByUser(newUser, ['Admin']);
    const action = Actions.delete();
    const options = {
      method: 'DELETE',
      url: `/${TABLE}/${newModel.id}`,
      payload: action,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    };

    const s = await Server;
    const response = await s.inject(options);
    expect(response.statusCode).to.equal(200);
  });

  it(`should get a list of existing ${NAME}`, async () => {
    const jwt = await Token.createTokenByUser(newUser, ['Admin']);
    const action = Actions.list();
    const options = {
      method: 'GET',
      url: `/${TABLE}`,
      payload: action,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    };

    const s = await Server;
    const response = await s.inject(options);
    expect(response.statusCode).to.equal(200);
    expect(response.result).to.have.property('items');
    expect(response.result).to.have.property('pagination');
  });
});
