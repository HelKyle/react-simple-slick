import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export interface Props {
  style: React.CSSProperties;
}

export default class Slide extends React.PureComponent<Props, {}> {
  static propTypes = {
    style: PropTypes.object,
  };
  render() {
    const { style } = this.props;
    const newChildren = React.Children.map(this.props.children, (child: any) => {
      return React.cloneElement(child, {
        className: classnames(['slide', child.props.className]),
        style: {
          ...style,
          ...child.style,
        },
      });
    })
    return React.Children.only(newChildren[0]);
  }
}
