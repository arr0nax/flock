import {default as React} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View, Button, Text } from 'react-native';
import { getRdxActionMapper, getRdxSelectionMapper } from 'mobile/rdx/utils/propsMapping';


class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    props.getNotifications();
  }

  notifications() {
    if (this.state.open) {
      return this.props.notifications.map(notif => (
        <View className={`notification ${notif.new ? 'new' : ''}`} key={`notif${notif.id}`}>
        <Text>{notif.made_by} left a {notif.item_type} on your {notif.parent_type}</Text>
        </View>
      ))
    } else {
      return null;
    }

  }

  render() {
    return (
      <View>
        <Button
          onPress={() => this.setState({open: !this.state.open})}
          title="notifications"
          color="#841584"
        />
        {this.notifications()}
      </View>
    );
  }
}

const actionsMapper = getRdxActionMapper([
  'getNotifications',
]);

const stateMapper = getRdxSelectionMapper({
  notifications: 'getNotifications',
  notificationsRequested: 'getNotificationsRequested',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(stateMapper, actionsMapper)(Notifications);
