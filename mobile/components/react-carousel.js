import {default as React} from 'react';
import { StyleSheet, View, Button } from 'react-native';

class ReactCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.props.react('like', this.props.item_id, this.props.type)} title="like" />
        <Button onPress={() => this.props.react('love', this.props.item_id, this.props.type)} title="love" />
        <Button onPress={() => this.props.react('haha', this.props.item_id, this.props.type)} title="haha" />
        <Button onPress={() => this.props.react('wow', this.props.item_id, this.props.type)} title="wow" />
        <Button onPress={() => this.props.react('sad', this.props.item_id, this.props.type)} title="sad" />
        <Button onPress={() => this.props.react('angry', this.props.item_id, this.props.type)} title="angry" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ReactCarousel;
