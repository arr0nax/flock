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
        <button onClick={() => this.props.react('like', this.props.item, this.props.parent_id)}>like</button>
        <button onClick={() => this.props.react('love', this.props.item, this.props.parent_id)}>love</button>
        <button onClick={() => this.props.react('haha', this.props.item, this.props.parent_id)}>haha</button>
        <button onClick={() => this.props.react('wow', this.props.item, this.props.parent_id)}>wow</button>
        <button onClick={() => this.props.react('sad', this.props.item, this.props.parent_id)}>sad</button>
        <button onClick={() => this.props.react('angry', this.props.item, this.props.parent_id)}>angry</button>
      </div>
    );
  }
}

export default ReactCarousel;
