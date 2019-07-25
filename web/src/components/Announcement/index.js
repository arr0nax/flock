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

  markAsSeen(id) {
    this.props.postAnnouncementSeen(id)
  }



  render() {
    const { announcement } = this.props;
    return (
      <div className={`announcement ${announcement.new ? 'new' : ''}`} key={`announcement${announcement.id}`}>
        <p>{announcement.text}</p>
        <div className="delete-announcement-button" onClick={() => this.markAsSeen(announcement.id)}>x</div>
      </div>
    );
  }
}

const actionsMapper = getRdxActionMapper([
  'postAnnouncementSeen',
]);

const stateMapper = getRdxSelectionMapper({
});

export default connect(stateMapper, actionsMapper)(ReactCarousel);
