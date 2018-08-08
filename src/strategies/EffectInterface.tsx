import React from 'react';
import { Props, State } from '../components/Swiper';

const throwError = (functionName: string) => {
  throw new Error(`children haven't implement the funciton named ${functionName}`);
}

export default class EffectInterface {
  context: React.Component<Props, State>;
  constructor(context: React.Component<Props, State>) {
    this.context = context;
  }
  getRealIndexInLoop (num: number) {
    const { props } = this.context;
    const total = React.Children.count(props.children);
    if (props.loop) {
      if (num < 0) {
        return num + total;
      }
      return num % total;
    }
    num = Math.min(num, 0);
    num = Math.min(num, total - 1);
    return num;
  }
  getTotalSlideCount () {
    const { props } = this.context;
    let totalSlideCount = React.Children.count(props.children);
    if (props.loop) {
      return totalSlideCount + 2;
    }
    return totalSlideCount;
  }
  getTrackInitialStyle () {
    throwError('getTrackInitialStyle');
  }
  getTranslateX(next?: number) {
    const { props, state } = this.context;
    const { loop } = props;
    const { current, containerWidth } = state;
    const to = typeof next === 'undefined' ? current : next
    const original = containerWidth * -1 * to;

    if (loop) {
      return original - containerWidth;
    }
    return original;
  }
}
