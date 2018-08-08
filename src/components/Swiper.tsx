import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Track from './Track';
import { onTouchStart, onTouchMove, onTouchEnd } from '../helpers/events';
import { Vector } from '../helpers/vector';
import { BOOL_TYPE } from '../constants/index';
import FadeStrategy from '../strategies/FadeStrategy';
import SwipeStrategy from '../strategies/SwipeStrategy';
import { PrevButton, NextButton } from './Navigation';
import { default as defaultRenderDots } from './renderDots';


export interface Props {
  autoplay?: number;
  speed?: number;
  fade?: boolean;
  loop?: boolean;
  ease?: string;
  dots?: boolean;
  navigation?: boolean;
  className?: string;
  children?: any;
}

export interface State {
  dragging: boolean,
  current: number,
  containerWidth: number,
  trackStyle: React.CSSProperties;
  nextSlideStyle: React.CSSProperties;
  scrolling: BOOL_TYPE;
  animating: boolean;
  startPosition: Vector,
  currentPosition: Vector,
  speed: number,
  swiping: boolean,
  delta: number,
}

export default class Swiper extends React.PureComponent<Props, State> {
  static propTypes = {
    fade: PropTypes.bool,
    speed: PropTypes.number,
    autoplay: PropTypes.number,
    loop: PropTypes.bool,
    ease: PropTypes.string,
    navigation: PropTypes.bool,
  };
  static defaultProps = {
    fade: false,
    speed: 300,
    loop: false,
    autoplay: 0,
    ease: 'ease',
    navigation: false,
  };
  effectStrategy: any;
  autoplayTimer: any;
  container: any = null;
  state = {
    dragging: false,
    containerWidth: 0,
    trackStyle: {},
    nextSlideStyle: {},
    prevSlideStyle: {},
    current: 0,
    scrolling: BOOL_TYPE.Undefined,
    animating: false,
    startPosition: new Vector(0, 0),
    currentPosition: new Vector(0, 0),
    speed: 0,
    swiping: false,
    delta: 0,
  };
  componentDidMount() {
    this.attachEvents();
    this.onResize();
    this.autoplay();
  }
  componentWillMount() {
    this.effectStrategy = this.props.fade ? new FadeStrategy(this) : new SwipeStrategy(this);
    this.detachEvents();
  }
  UNSAFE_componentWillMount() {
    this.detachEvents();
  }

  attachEvents() {
    window.addEventListener('resize', this.onResize);
    this.container.addEventListener('mousedown', this.handleTouchStart, { passive: true });
    this.container.addEventListener('mousemove', this.handleTouchMove, { passive: false });
    document.addEventListener('mouseup', this.handleTouchEnd, { passive: true });
    this.container.addEventListener('touchstart', this.handleTouchStart, { passive: true });
    this.container.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    document.addEventListener('touchend', this.handleTouchEnd, { passive: true });
  }
  detachEvents() {
  }
  onResize = () => {
    this.state.containerWidth = this.container.offsetWidth;
    this.setState({
      trackStyle: this.effectStrategy.getTrackInitialStyle(),
    });
  }

  next = () => {
    this.move(1);
  }

  prev = () => {
    this.move(-1);
  }
  move(delta: number) {
    if (this.state.animating) {
      return
    }
    const count = React.Children.count(this.props.children);
    let nextIndex = this.state.current + delta;
    if (this.props.loop && this.props.fade) {
      if (nextIndex < 0) {
        nextIndex = nextIndex + count;
      } else {
        nextIndex = nextIndex % count;
      }
      this.goto(nextIndex);
      return;
    }
    nextIndex = this.props.loop
      ? nextIndex
      : (nextIndex < 0 || nextIndex >= count)
        ? this.state.current
        : nextIndex

    if (!this.state.dragging && nextIndex === this.state.current) {
      return
    }
    this.goto(nextIndex);
  }
  goto(index: number) {
    const newState = this.effectStrategy.goto(index);
    this.setState({
      current: index,
      speed: this.props.speed,
      animating: true,
      ...newState,
    })
    setTimeout(() => {
      this.handleTransitionEnd();
    }, this.props.speed);
  }
  handleTouchStart = (event: Event) => {
    this.pause();
    if (this.state.animating) {
      return;
    }
    const newState = onTouchStart(event);
    this.setState({
      ...newState,
      dragging: true,
    })
  }
  followMouse = (delta: Vector) => {
    const newState = this.effectStrategy.onProgress(delta, this.props, this.state);
    this.setState({
      delta: delta.x,
      ...newState
    });
  }
  handleTouchMove = (event: Event) => {
    if (!this.state.dragging || this.state.animating) {
      return false;
    }
    const { startPosition } = this.state;
    const { currentPosition } = onTouchMove(event);
    const delta = Vector.sub(currentPosition, startPosition);

    let swiping = this.state.swiping;

    this.setState({
      currentPosition,
    });
    if (this.state.scrolling === BOOL_TYPE.Undefined) {
      if (delta.distance() >= 3) {
        if (!swiping
          && Vector.isVertial(delta)
        ) {
          this.setState({
            scrolling: BOOL_TYPE.True,
          })
        } else {
          swiping = true;
          this.setState({
            swiping: true
          })
        }
      }
    }
    if (swiping) {
      this.followMouse(delta);
      event.preventDefault();
    }
  }

  handleTouchEnd = (event: Event) => {
    if (!this.state.dragging) {
      return false
    }
    const { startPosition } = this.state;
    const { currentPosition } = this.state;
    const delta = Vector.sub(currentPosition, startPosition);

    if (this.state.swiping) {
      if (delta.x < -80) {
        this.next();
      } else if (delta.x > 80) {
        this.prev();
      } else {
        this.move(0);
      }
    }
    this.setState({
      dragging: false,
      swiping: false,
      scrolling: BOOL_TYPE.Undefined
    });
  }

  handleTransitionEnd () {
    this.autoplay();
    const count = React.Children.count(this.props.children);
    this.setState(prevState => ({
      speed: 0,
      current: (prevState.current + count) % count,
    }), () => {
      const currentState = this.effectStrategy.getCurrentState();
      this.setState({
        ...currentState,
        animating: false,
      });
    })
  }

  autoplay = () => {
    if (!this.props.autoplay) {
      return;
    }
    this.pause();
    this.autoplayTimer = setInterval(() => {
      this.next();
    }, this.props.autoplay);
  }
  pause = () => {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
    }
  }

  renderSlides() {
    const { children, loop, fade } = this.props;
    const { containerWidth, nextSlideStyle, delta } = this.state;
    const prevCloned = [];
    const postCloned = [];
    const childStyle = {
      width: containerWidth
    }
    const newChildren = React.Children.map(children, (child: any, index: number) => {
      const isCurrent = index === this.state.current;
      const isNext = delta <= 0
        ? index === this.effectStrategy.getRealIndexInLoop(this.state.current + 1)
        : index === this.effectStrategy.getRealIndexInLoop(this.state.current - 1);
      const isPrev = delta <= 0
      ? index === this.effectStrategy.getRealIndexInLoop(this.state.current - 1)
      : index === this.effectStrategy.getRealIndexInLoop(this.state.current + 1);

      const style = {
        ...this.effectStrategy.getSlideInitialStyle(),
        ...childStyle,
        ...child.style,
      }
      if (isNext) {
        Object.assign(style, nextSlideStyle)
      }

      return React.cloneElement(child, {
        className: classNames(
          'slide',
          child.props.className,
          {
            'slide-prev': isPrev,
            'slide-active': isCurrent,
            'slide-next': isNext,
          }
        ),
        style,
      });
    });

    if (loop && !fade) {
      prevCloned.push(React.cloneElement(newChildren[newChildren.length - 1], {
        key: `prev-${1}`
      }))
      postCloned.push(React.cloneElement(newChildren[0], {
        key: `post-${1}`
      }))
    }
    return [
      ...prevCloned,
      ...newChildren,
      ...postCloned
    ];
  }

  renderDots() {
    const { current } = this.state;
    const count = React.Children.count(this.props.children);
    const dots = defaultRenderDots({ count, current });
    const children = React.Children.map(dots, (child: any, index: number) => {
      return React.cloneElement(child,
        {
          onClick: () => this.goto(index),
        }
      );
    });
    return (
      <ul className="dots">
        {children}
      </ul>
    )
    // return <Dots count={count} current={this.state.current} onChange={(newIndex) => this.goto(newIndex)} />
  }

  renderNavigation() {
    return (
      <div className="navigation">
        <PrevButton onClick={this.prev}/>
        <NextButton onClick={this.next}/>
      </div>
    );
  }
  render() {
    const { trackStyle } = this.state;

    const {
      className,
      fade,
    } = this.props;
    const cls = classNames(
      'swiper',
      {
        fade,
      },
      className,
    );
    return (
      <div
        className={cls}
        ref={c => this.container = c}
      >
        <Track style={trackStyle}>
          {this.renderSlides()}
        </Track>
        { this.props.dots ? this.renderDots() : null}
        { this.props.navigation ? this.renderNavigation() : null}
      </div>
    );
  }
}
