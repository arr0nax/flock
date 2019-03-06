import {default as React} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View, Button, Image, Text } from 'react-native';

class UserSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.container, (this.props.smallname && styles.smallnamemain)]}>
        <Image source={{ uri: this.props.user.image_url }} style={{ width: 42, height: 42, borderRadius: 21 }} />
        <View style={[{ flex: 1, flexDirection: 'column' }, (this.props.smallname && styles.smallnamecontainer)]}>
          <Text style={(this.props.smallname && styles.smallnametext)}>{this.props.user.first_name} {this.props.user.last_name}</Text>
          <Text></Text>
        </View>
      </View>
    );
  }
}

UserSummary.defaultProps = {
  user: {},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  smallnamemain: {
    position: 'relative',
    maxWidth: 42,
  },
  smallnamecontainer: {
    position: 'absolute',
    left: 50,
    top: -5,
  },
  smallnametext: {

  },
});

export default UserSummary;
