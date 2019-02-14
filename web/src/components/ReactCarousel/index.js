import React from 'react';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import './index.css';

class ReactCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleReact(react, item_id, item_type) {
    console.log(this.state);
    this.setState({open: false});
    this.props.postReact({
      react,
      item_id,
      item_type,
    })
  }

  handleOpenReactCarousel() {
    this.setState({open: !this.state.open})
  }



  render() {
    return (
      <div className={`react-carousel-container ${this.props.className}`}>
        <p onClick={() => this.handleOpenReactCarousel()} className="icon">🐑</p>
        <div className={`react-carousel ${this.state.open && 'open'}`}>
          <div className="react-container">
            <p onClick={() => this.handleReact('like', this.props.item_id, this.props.type)}>👍</p>
          </div>
          <div className="react-container">
            <p onClick={() => this.handleReact('love', this.props.item_id, this.props.type)}>❤️</p>
          </div>
          <div className="react-container">
            <p onClick={() => this.handleReact('haha', this.props.item_id, this.props.type)}>😂</p>
          </div>
          <div className="react-container">
            <p onClick={() => this.handleReact('wow', this.props.item_id, this.props.type)}>😮</p>
          </div>
          <div className="react-container">
            <p onClick={() => this.handleReact('sad', this.props.item_id, this.props.type)}>😢</p>
          </div>
          <div className="react-container">
            <p onClick={() => this.handleReact('angry', this.props.item_id, this.props.type)}>😡</p>
          </div>
        </div>
      </div>
    );
  }
}

const actionsMapper = getRdxActionMapper([
  'postReact',
]);

const stateMapper = getRdxSelectionMapper({
});

export default connect(stateMapper, actionsMapper)(ReactCarousel);
