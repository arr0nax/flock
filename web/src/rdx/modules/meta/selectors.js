import { get } from 'lodash';

export default {
    getMeta: state => get(state, 'meta.data'),
    getMetaRequested: state => get(state, 'meta.requested'),
    getMetaError: state => get(state, 'meta.error'),
};
