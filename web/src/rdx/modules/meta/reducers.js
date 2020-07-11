import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/modules/meta/types';
import states from 'rdx/modules/meta/states';

export default {
    meta: createReducer(states.DEFAULT_META_STATE, {
        [types.GET_INIT_SUCCESS](state, action) {
            return {
                ...state,
                requested: false,
                error: {},
                data: action.payload
            };
        },
        [types.GET_INIT_REQUEST](state, action) {
            return {
                ...state,
                requested: true,
            };
        },
        [types.GET_INIT_FAILURE](state, action) {
            return {
                ...state,
                requested: false,
                error: action.payload
            };
        },
    }),
};
