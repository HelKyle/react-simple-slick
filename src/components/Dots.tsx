import React from 'react';
import PropTypes from 'prop-types';

export interface Props {
  count: number,
  current: number,
  onChange: (index: number) => void
}


const Dots: React.SFC<Props> = ({count, current, onChange}) => {
  const renderChildren = () => {
    const dots = []
    for(let i = 0; i < count; i ++) {
      const className = i === current ? 'dot dot-active' : 'dot';
      dots.push(<li className={className} key={`dot-${i}`} onClick={() => onChange(i)} />);
    }
    return dots;
  }
  return (
    <ul className="dots">
      {renderChildren()}
    </ul>
  )
}

Dots.propTypes = {
  count: PropTypes.number,
  current: PropTypes.number,
  onChange: PropTypes.func,
}

export default Dots;
