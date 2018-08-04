import React from 'react';
import PropTypes from 'prop-types';
import Slide from './Slide';

export interface Props {
  style?: React.CSSProperties;
  [key: string]: any;
}

export default class Track extends React.Component<Props, {}> {
  render() {
    const { children, ...otherProps } = this.props;
    return (
      <div className="track" {...otherProps}>
        {children}
      </div>
    );
  }
}
