import EffectInterface from './EffectInterface';
import { Vector } from '../helpers/vector';


export default class FadeStrategy extends EffectInterface {
  getSlideInitialStyle () {
    const { props, state } = this.context;
    const { speed } = props;
    return {
      transition: `opacity ${speed}ms`,
    }
  }
  getTrackInitialStyle () {
    const { state } = this.context;
    return {
      width: state.containerWidth,
    }
  }
  onProgress(delta: Vector) {
    const { state } = this.context;
    const { containerWidth, current } = state;
    return {
      delta: delta.x,
      nextSlideStyle: {
        transition: `opacity 0s`,
        opacity: Math.abs(delta.x / containerWidth),
      }
    };
  }
  goto(index: number) {
    const { props, state } = this.context;
    const { speed } = props;
    return {
      nextSlideStyle: {
        transition: `opacity ${speed}ms`,
        opacity: 0,
      }
    }
  }
  getCurrentState() {
    const { props, state } = this.context;
    const { speed } = props;

    return {
      nextSlideStyle: {
        ...state.trackStyle,
        transition: `opacity ${speed}ms`,
        opacity: 0,
      }
    }
  }
}
