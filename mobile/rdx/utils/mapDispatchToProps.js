import { bindActionCreators } from 'redux';
import actionCreators from '../actions';

export default function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
