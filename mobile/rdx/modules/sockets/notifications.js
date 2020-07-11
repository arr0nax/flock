import { put } from 'redux-saga/effects';
import actions from '../../actions';
//
export default {
  newNotification: (store, data) => { store.dispatch(actions.addNotification(data)) }
}
