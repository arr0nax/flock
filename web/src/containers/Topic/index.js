import React from 'react';
// import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import './index.css';

class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }

    // props.getUserGroup(props.user.group_id);
  }
  render() {
    const {group, user, topic, users} = this.props;
    return (
      <div className="topic-rct-component">
        {group.topic_chosen ? (
          <div>
            <h2> Today's topic is: <i>{topic.text}</i></h2>
            {users[topic.user_id] &&
              <h4>Chosen by {users[topic.user_id].first_name} {users[topic.user_id].last_name}</h4>
            }
          </div>
        ) : (
          <div>
          {group.topic_choser_id === user.id ? (
            <div>
              <h2>you get to choose the topic today!</h2>
              <input value={this.state.text} onChange={(e) => this.setState({text: e.target.value})}/>
              <button onClick={() => this.props.postTopic(this.state.text)}>set topic</button>
            </div>
          ) : (
            <div>
              <p>no topic yet! until then the topic is still: <i>{topic.text}</i></p>
            </div>
          )}
          </div>
        )}
      </div>
    );
  }
}

Topic.propTypes = {
};

Topic.defaultProps = {
};

const actionsMapper = getRdxActionMapper([
  'getUserGroup',
  'postTopic'
]);

const stateMapper = getRdxSelectionMapper({
  group: 'getGroup',
  user: 'getUser',
  users: 'getUsers',
  topic: 'getTopic',
});

export default connect(stateMapper, actionsMapper)(Topic);
