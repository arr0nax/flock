import React, { Component } from 'react';
import { Animated, StyleSheet, View, TouchableOpacity, Text, PanResponder, Dimensions } from 'react-native';
import {connect} from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'mobile/rdx/utils/propsMapping';
import {
  PanGestureHandler,
  LongPressGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';

class ReactCarousel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      react: "react",
    }

    this._height = new Animated.Value(0)
    this._border = new Animated.Value(0)
    this.onPress = this.onPress.bind(this);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder:(evt, gestureState) => true,
      onPanResponderGrant: (evt) => {
        this._height.setValue(50);
        this._border.setValue(1);
        this.props.disableScroll();
      },
      onMoveShouldSetPanResponder:(evt, gestureState) => !!getDirectionAndColor(evt.nativeEvent.locationX, evt.nativeEvent.locationY),
      onPanResponderRelease: (evt) => {
        this._height.setValue(0);
        this._border.setValue(0);
        this.props.enableScroll();
        if (this.state.react !== 'react') this.handleReact();
        this.setState({
          react: 'react',
        })
      },
      onPanResponderMove: (evt, gestureState) => {
        const drag = getDirectionAndColor(evt.nativeEvent.locationX, evt.nativeEvent.locationY);
        this.setState({
          react: drag,
        })
      },
    });
  }

  handleReact() {
    const {item_type, item_id} = this.props;
    const {react} = this.state;
    console.log(react);
    this.props.postReact({
      react,
      item_id,
      item_type,
    })
  }

  onPress() {
    this._height.setValue(50);
    this.setState({
      reacts: 50,
    })
  }

  render() {
    return (
      <View style={[{position: 'relative', height: 20, width: 50}, ((this.props.item_type === 'reply' || this.props.item_type === 'comment') && {marginLeft: 50})]} {...this._panResponder.panHandlers}>
        <View style={[{position: 'absolute', top: 0}]}>
          <Animated.View style={{
            borderWidth: this._border,
            borderColor: 'black',
            backgroundColor: '#fff',
            borderRadius: 50,
            height: this._height,
            maxHeight: this._height,
            width: 300,
            flex: 1,
            flexDirection: 'row',
            overflow: 'hidden',
            position: 'absolute',
            bottom: 20,
            left: 20,

          }}>
            <View style={[styles.box]}><Text style={[styles.text, {transform: [{scale: (this.state.react === 'like' ? 1.5 : 1)}]}]}>👍</Text></View>
            <View style={[styles.box]}><Text style={[styles.text, {transform: [{scale: (this.state.react === 'love' ? 1.5 : 1)}]}]}>❤️</Text></View>
            <View style={[styles.box]}><Text style={[styles.text, {transform: [{scale: (this.state.react === 'haha' ? 1.5 : 1)}]}]}>😂</Text></View>
            <View style={[styles.box]}><Text style={[styles.text, {transform: [{scale: (this.state.react === 'wow' ? 1.5 : 1)}]}]}>😮</Text></View>
            <View style={[styles.box]}><Text style={[styles.text, {transform: [{scale: (this.state.react === 'sad' ? 1.5 : 1)}]}]}>😢</Text></View>
            <View style={[styles.box]}><Text style={[styles.text, {transform: [{scale: (this.state.react === 'angry' ? 1.5 : 1)}]}]}>😡</Text></View>
          </Animated.View>

          <Text style={{position: 'relative', top: 0, color: '#add8e6'}}>{this.state.react}</Text>

        </View>
      </View>
    );
  }
}


const {height, width} = Dimensions.get('window');
const getDirectionAndColor = (locationX, locationY) => {
  const like = locationX >= 0 && locationX <70;
  const love = locationX >= 70 && locationX < 120;
  const haha = locationX >= 120 && locationX < 170;
  const wow = locationX >= 170 && locationX < 220;
  const sad = locationX >= 220 && locationX < 270;
  const angry = locationX >= 270 && locationX < 320;
  const up = locationY < 0 && locationY > -70;
  if (!up) return 'react';
  if (like && up) {
    return 'like'
  } else if (love && up) {
    return 'love'
  } else if (haha && up) {
    return 'haha'
  } else if (wow && up) {
    return 'wow'
  } else if (sad && up) {
    return 'sad'
  } else if (angry && up) {
    return 'angry'
  }



}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    height: 50,
    width: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
  }
});

const actionsMapper = getRdxActionMapper([
  'postReact',
]);

const stateMapper = getRdxSelectionMapper({});

export default connect(stateMapper, actionsMapper)(ReactCarousel);
