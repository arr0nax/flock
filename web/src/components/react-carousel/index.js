import React from 'react';

import './index.css';

class ReactCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="react-carousel">
        <button onClick={() => this.props.react('like', this.props.item_id, this.props.type)}>like</button>
        <button onClick={() => this.props.react('love', this.props.item_id, this.props.type)}>love</button>
        <button onClick={() => this.props.react('haha', this.props.item_id, this.props.type)}>haha</button>
        <button onClick={() => this.props.react('wow', this.props.item_id, this.props.type)}>wow</button>
        <button onClick={() => this.props.react('sad', this.props.item_id, this.props.type)}>sad</button>
        <button onClick={() => this.props.react('angry', this.props.item_id, this.props.type)}>angry</button>
      </div>
    );
  }
}

export default ReactCarousel;
