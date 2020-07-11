import React from 'react';
// import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
// import classNames from 'classnames';
import sheepfault from 'lib/images/smallsheepboi.png'

import './index.css';

class Loading extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            words: [
                "",
                'THIS MIGHT TAKE A WHILE',
                "THIS ISN'T FACEBOOK",
                "PREPARING THE COMMUNITY",
                "WHAT ARE YOU GOING TO POST?"
            ],
            currentWord: 0
        }
    }

    componentDidMount() {
        setInterval(this.changeWords.bind(this), 5000);
    }

    changeWords = () => {
        if (this.state.currentWord > 3) {
            this.setState({currentWord: 0})
        }
        this.setState({
            currentWord: this.state.currentWord + 1
        })
    }

    render() {
        return (
            <div className="loading-rct-component">
                <div className='circle-container'>
                    <img src={sheepfault} />
                </div>
                <div className="loading-text">
                    LOADING
                </div>
                <div className='fun-text'>
                    {this.state.words[this.state.currentWord]}
                </div>
            </div>
        );
    }
}

Loading.propTypes = {
};

Loading.defaultProps = {
};

export default Loading;
