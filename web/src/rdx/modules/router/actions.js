import { push } from 'connected-react-router';
// import types from 'rdx/modules/router/types';
// import createAction from 'rdx/utils/createAction';

export default {
  navigate: (url) => push(url),
};
