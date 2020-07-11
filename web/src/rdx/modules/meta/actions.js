import types from 'rdx/modules/meta/types';
import createAction from 'rdx/utils/createAction';

export default {
    getInit: payload => createAction(types.GET_INIT_REQUEST, payload),
    getInitSuccess: payload => createAction(types.GET_INIT_SUCCESS, payload),
    getInitFailure: payload => createAction(types.GET_INIT_FAILURE, payload),
};
