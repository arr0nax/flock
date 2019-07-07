import {default as React} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View, Button, Image, Text } from 'react-native';
import sheepfault from 'mobile/lib/images/smallsheepboi.png';

class UserSummary extends React.Component {
  constructor(props) {
    super(props);
    const color = this.getColor(props.user.first_name)
    this.state = {color};
  }

  getColor(name) {
    let color = '#9ff'
    if (name) {
      var code1 = (name.toUpperCase().charCodeAt(0) - 64) * 10;
      var code2 = (name.toUpperCase().charCodeAt(1) - 64) * 10;
      var code3 = (name.toUpperCase().charCodeAt(2) - 64) * 10;
      color = `rgb(${code1},${code2},${code3})`
    }
    return color
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.first_name !== prevProps.user.first_name) {
      this.setState({color: this.getColor(this.props.user.first_name)})
    }
  }

  render() {
    return (
      <View style={[styles.container, (this.props.smallname && styles.smallnamemain)]}>
        <Image source={require('../lib/images/smallsheepboi.png')} style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: this.state.color }} />
        <View style={[{ flex: 1, flexDirection: 'column',  position: 'absolute', left: 55 }, (this.props.smallname && styles.smallnamecontainer)]}>
          <Text style={[{fontSize: 16}, (this.props.smallname && styles.smallnametext)]}>{this.props.user.first_name} {this.props.user.last_name}</Text>
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
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  smallnamemain: {
    position: 'relative',
    maxWidth: 42,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  smallnamecontainer: {
    position: 'absolute',
    left: 50,
    top: 0,
  },
  smallnametext: {
    fontSize: 12
  },
});

export default UserSummary;
