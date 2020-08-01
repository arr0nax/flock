import React from 'react';
import PropTypes from 'prop-types';
import Microlink from '@microlink/react'
// import customPropTypes from 'lib/customPropTypes';
import classNames from 'classnames';

import './index.css';
var linkify = require('linkify-it')();

const LinkPreviewText = (props) => {
  const { className, text } = props;
  const urls = linkify.match(text);
  let text1=text;
  let text2=null;
  let url=null;
  if (urls) {
    url = urls[0].url;
    const burl = urls[0];
    text1 = text.slice(0, burl.index);
    text2= text.slice(burl.lastIndex, text.length);
  }

  return (
    <div className="link-preview-text-rct-component">
      {className === 'post' ? (
        <h3>{text1}<a href={url} target="_">{url}</a>{text2}</h3>
      ) : (
        <p className="comment-text">{text1}<a href={url} target="_" className="link">{url}</a>{text2}</p>
      )}
      {urls && <Microlink className="microlink" url={urls[0].url} />}
    </div>
  );
}

LinkPreviewText.propTypes = {
  className: PropTypes.string,
};

LinkPreviewText.defaultProps = {
  className: '',
  text: '',
};

export default LinkPreviewText;
