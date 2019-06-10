import { push } from 'connected-react-router';
// import types from 'mobile/rdx/modules/router/types';
// import createAction from 'mobile/rdx/utils/createAction';

export default {
  navigate: (url) => push(url),
};
