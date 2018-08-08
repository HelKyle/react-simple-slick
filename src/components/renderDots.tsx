import React from 'react';

interface DotsParams {
  count: number,
  current: number,
}

export default (params: DotsParams): JSX.Element[] =>  {
  const { count, current } = params;
  return new Array(count).fill(0).map((item, index) => {
    const className = index === current ? 'dot dot-active' : 'dot';
    return (
      <li className={className} />
    );
  })
}
