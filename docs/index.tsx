import React from 'react';
import ReactDOM from 'react-dom';
import Swiper from '../src/index';

require('./style.scss');

const App = () => {
  return (
    <div className="swiper-container">
      <Swiper speed={1000} dots fade loop navigation >
        <img src="https://images.unsplash.com/photo-1460626399219-57a00a2361cb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f2b0dbaff97285326c81f4a467b65f4c&auto=format&fit=crop&w=1350&q=80" alt=""/>
        <img src="https://images.unsplash.com/photo-1460750860062-82a52139a0d6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ad6f8d20e4b6da905c5bb18ea656ce60&auto=format&fit=crop&w=1350&q=80" alt=""/>
        <img src="https://images.unsplash.com/photo-1460899960812-f6ee1ecaf117?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ca521434f696c245d7d9d37c9f9e2940&auto=format&fit=crop&w=1300&q=80" alt=""/>
        <img src="https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjI0MX0&s=ae291ff35d1737fae7461e08bd51ac60&auto=format&fit=crop&w=1344&q=80" alt=""/>
      </Swiper>
      <Swiper speed={1000} fade loop >
        <img src="https://images.unsplash.com/photo-1460626399219-57a00a2361cb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f2b0dbaff97285326c81f4a467b65f4c&auto=format&fit=crop&w=1350&q=80" alt=""/>
        <img src="https://images.unsplash.com/photo-1460750860062-82a52139a0d6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ad6f8d20e4b6da905c5bb18ea656ce60&auto=format&fit=crop&w=1350&q=80" alt=""/>
        <img src="https://images.unsplash.com/photo-1460899960812-f6ee1ecaf117?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ca521434f696c245d7d9d37c9f9e2940&auto=format&fit=crop&w=1300&q=80" alt=""/>
        <img src="https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjI0MX0&s=ae291ff35d1737fae7461e08bd51ac60&auto=format&fit=crop&w=1344&q=80" alt=""/>
      </Swiper>
      <Swiper speed={300} dots>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Swiper>
      <Swiper speed={300} dots autoplay={3000} loop>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Swiper>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.querySelector('#root'),
);
