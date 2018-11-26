import { bindActionCreators } from 'redux';
import actionCreators from 'mobile/rdx/actions';

export default function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
