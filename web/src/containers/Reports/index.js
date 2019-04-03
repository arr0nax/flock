import React from 'react';
// import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
// import classNames from 'classnames';
import { push } from 'connected-react-router'
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import './index.css';

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.props.getReports();

  }

  toggleOpen = () => {
    this.setState({open: !this.state.open})
  }

  viewOriginal(report) {
    this.props.navigate(`/details/post/${report.item_id}`);
  }

  voteKeep(id) {
    this.props.postReportVote({
      report_id: id,
      vote: true,
    });
  }

  voteDelete(id) {
    this.props.postReportVote({
      report_id: id,
      vote: false,
    });
  }

  reports = () => {
    if (!this.props.reports || !this.props.reports.length) return null;
    return this.props.reports.map(report => (
      <div className={`report ${report.new ? 'new' : ''}`} key={`report${report.id}`}>
        <p>{report.item_text}</p>
        <button onClick={() => this.viewOriginal(report)}>view</button>
        <button onClick={() => this.voteKeep(report.id)}>keep</button>
        <button onClick={() => this.voteDelete(report.id)}>delete</button>
      </div>
    ));
  }
  render() {
    return (
      <div className="reports-rct-component">
        <button onClick={this.toggleOpen}>reports</button>
        {this.state.open && (
          this.reports()
        )}
      </div>
    )
  }
}

Reports.propTypes = {
};

Reports.defaultProps = {
};

const actionsMapper = getRdxActionMapper([
  'getReports',
  'postReportVote',
  'navigate'
]);

const stateMapper = getRdxSelectionMapper({
  reports: 'getReports'
});

export default connect(stateMapper, actionsMapper)(Reports);
