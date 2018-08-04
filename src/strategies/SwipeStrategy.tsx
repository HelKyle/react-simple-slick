import EffectInterface from './EffectInterface';
import { Vector } from '../helpers/vector';
import React from 'react';

export default class SwipeStrategy extends EffectInterface {
  getSlideInitialStyle () {
    return {};
  }
  getTrackInitialStyle () {
    const { props, state } = this.context;
    const width = this.getTotalSlideCount() * state.containerWidth;
    const currentTranslateX = this.getTranslateX();
    if (props.loop) {
      return {
        transition: `0s`,
        transform: `translateX(${currentTranslateX}px)`,
        width,
      }
    }
    return {
      width,
    }
  }
  onProgress(delta: Vector) {
    const { state } = this.context;
    const currentTranslateX = this.getTranslateX();
    const translateX = currentTranslateX + delta.x;

    return {
      delta: delta.x,
      trackStyle: {
        ...state.trackStyle,
        transition: `0s`,
        transform: `translateX(${translateX}px)`,
      },
    };
  }
  goto(index: number) {
    const { props, state } = this.context;
    const { speed, ease } = props;

    return {
      trackStyle: {
        ...state.trackStyle,
        transition: `transform ${speed}ms ${ease}`,
        transform: `translateX(${this.getTranslateX(index)}px)`,
      }
    }
  }
  getCurrentState() {
    const { props, state } = this.context;
    const { speed } = state;

    return {
      trackStyle: {
        ...state.trackStyle,
        transition: `transform ${speed}ms`,
        transform: `translateX(${this.getTranslateX()}px)`,
      }
    }
  }
}
