import { push } from 'connected-react-router';
// import types from '../../modules/router/types';
// import createAction from '../../utils/createAction';

export default {
  navigate: (url) => push(url),
};
