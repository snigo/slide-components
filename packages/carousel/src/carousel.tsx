import * as React from 'react';
import { FunctionComponent } from 'react';

import css from './carousel.module.scss';

interface CarouselProps {}

const Carousel: FunctionComponent<CarouselProps> = ({ children }) => {
  const s = 's';
  return (
    <div className={css.carousel}>
      This is my carousel, how do you like it?
      <span>{ s }</span>
      <div>
        { children }
      </div>
    </div>
  );
};

export default Carousel;
