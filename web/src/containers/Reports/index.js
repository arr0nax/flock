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
      open: true
    }
    this.props.getReports();
    this.props.getReportVotes();

  }

  toggleOpen = () => {
    this.setState({open: !this.state.open})
  }

  viewOriginal(report) {
    this.props.navigate(`/reports/${report.item_type}/${report.item_id}`);
  }

  goHome() {
    this.props.navigate('/');
  }

  sendVote(vote, existingVote, report_id) {
    if (existingVote && (existingVote.vote === vote) ) {
      this.props.deleteReportVote(existingVote.id)
    } else if (existingVote) {
      this.props.patchReportVote({
        id: existingVote.id,
        vote,
      });
    } else {
      this.props.postReportVote({
        report_id,
        vote,
      });
    }
  }

  reports = () => {
    if (!this.props.reports || !this.props.reports.length) return <div className="no-reports"><p>no reports!</p><button onClick={() => this.goHome()}>home</button></div>;
    return this.props.reports.map(report => {
      const vote = this.props.reportVotes.find(vote => vote.report_id === report.id);
      return (
        <div className={`report ${report.new ? 'new' : ''}`} key={`report${report.id}`}>
          <p>{report.item_text}</p>
          <button onClick={() => this.viewOriginal(report)}>view</button>
          <button className={`${(vote && (vote.vote === true)) && 'highlight'}`} onClick={() => this.sendVote(true, vote, report.id)}>keep</button>
          <button className={`${(vote && (vote.vote === false)) && 'highlight'}`} onClick={() => this.sendVote(false, vote, report.id)}>delete</button>
        </div>
      )
    });
  }
  render() {
    return (
      <div className="reports-rct-component">
        {/*<button onClick={this.toggleOpen}>reports</button>*/}
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
  'getReportVotes',
  'postReportVote',
  'patchReportVote',
  'deleteReportVote',
  'navigate'
]);

const stateMapper = getRdxSelectionMapper({
  reports: 'getReports',
  reportVotes: 'getReportVotes',
});

export default connect(stateMapper, actionsMapper)(Reports);
