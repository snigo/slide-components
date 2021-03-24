import * as React from 'react';
import {
  FunctionComponent,
  Fragment,
  ReactNode,
  useState,
  useRef,
  useEffect,
  MouseEvent,
  TouchEvent,
  KeyboardEvent,
  CSSProperties,
} from 'react';
import { clamp, mod } from './lib';

import css from './carousel.module.scss';

interface CarouselProps {
  start?: number;
  autoplay?: number;
  loop?: boolean;
  threshold?: number;
  showDots?: boolean;
  showArrows?: boolean;
  allowSwipe?: boolean;
  allowDotClick?: boolean;
  onStart?: (n?: number, of?: number) => void;
  onEnd?: (n?: number, of?: number) => void;
  onApproach?: (n?: number, of?: number) => void;
  onChange?: (from?: number, to?: number, of?: number) => void;
}

interface Dimentions {
  width: number;
  height: number;
}

const DEFAULT_DIMENSIONS: Dimentions = {
  width: 0,
  height: 0,
};

const Carousel: FunctionComponent<CarouselProps> = ({
  start = 0,
  loop = false,
  autoplay = 0,
  threshold = 40,
  showDots = true,
  showArrows = true,
  allowSwipe = true,
  allowDotClick = true,
  onApproach,
  onStart,
  onEnd,
  onChange,
  children,
}) => {
  let slides: ReactNode[];
  if (Array.isArray(children)) {
    slides = children;
  } else if (typeof children === 'object' && 'type' in children && children.type === Fragment) {
    slides = children.props?.children || [];
  } else {
    slides = [children];
  }

  const carouselEl = useRef<HTMLDivElement>(null);
  const conveyorEl = useRef<HTMLDivElement>(null);

  const [top, setTop] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [containerDimensions, setContainerDimensions] = useState<Dimentions>(DEFAULT_DIMENSIONS);
  const [dragging, setDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<number>(0);

  useEffect(() => {
    handleResize();
    if (onStart && typeof onStart === 'function') onStart(top, slides.length);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (autoplay) {
      timeout = setTimeout(() => {
        setNext((current) => next(current + 1));
      }, autoplay * 1000);
    }
    if (top === slides.length - 2 && onApproach && typeof onApproach === 'function') onApproach(top, slides.length);
    if (top === slides.length - 1 && onEnd && typeof onEnd === 'function') onEnd(top, slides.length);
    return () => {
      clearTimeout(timeout);
    };
  }, [top]);

  useEffect(() => {
    setNext(() => clamp([0, slides.length - 1], start));
  }, [start]);

  const slideStyle: CSSProperties = {
    flexBasis: containerDimensions.width,
  };

  const conveyorStyle: CSSProperties = {
    left: -(top * containerDimensions.width) + offset,
    width: slides.length * containerDimensions.width,
  };
  if (allowSwipe) conveyorStyle.cursor = 'move';

  const slideButtonStyle: CSSProperties = {
    fontSize: clamp([16, 96], containerDimensions.height / 4),
  };

  const next = (index: number) => loop
    ? mod(index, slides.length)
    : clamp([0, slides.length - 1], index);

  const setNext = (selectFn: (prev?: number) => number) => {
    setTop((current) => {
      const nextIndex = selectFn(current);
      if (onChange && typeof onChange === 'function') onChange(current, nextIndex, slides.length);
      return nextIndex;
    });
  };

  const handleMouseStart = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
    setDragStart(e.clientX);
  };
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setDragging(true);
    setDragStart(e.changedTouches[0].clientX);
  };
  const handleDragEnd = () => {
    setDragging(false);
    if (Math.abs(offset) > threshold) {
      setNext((current) => clamp([0, slides.length - 1], current - Math.sign(offset)));
    }
    setOffset(0);
  };
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      const diff = e.clientX - dragStart;
      setOffset(diff);
    }
  };
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (dragging) {
      const diff = e.changedTouches[0].clientX - dragStart;
      setOffset(diff);
    }
  };
  const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      setNext((current) => next(current + 1));
    }
    if (e.key === 'ArrowLeft') {
      setNext((current) => next(current - 1));
    }
  };
  const handleDotClick = (index: number) => () => {
    if (allowDotClick) {
      setNext(() => index);
    }
  };
  const handleSlideButtonClick = (inc: number) => () => {
    setNext((current) => next(current + inc));
  };
  const handleResize = () => {
    const { width, height } = carouselEl.current.getBoundingClientRect();
    setContainerDimensions({ width, height });
  };

  const emptyFn = () => {};

  return (
    <div className={css.carousel} ref={carouselEl}>
      <div
        className={css['carousel-conveyor']}
        style={conveyorStyle}
        ref={conveyorEl}
        onMouseDown={allowSwipe ? handleMouseStart : emptyFn}
        onMouseUp={allowSwipe ? handleDragEnd : emptyFn}
        onMouseOut={allowSwipe ? handleDragEnd : emptyFn}
        onMouseMove={allowSwipe ? handleMouseMove : emptyFn}
        onKeyUp={allowSwipe ? handleKeyUp : emptyFn}
        onBlur={emptyFn}
        onTouchStart={allowSwipe ? handleTouchStart : emptyFn}
        onTouchEnd={allowSwipe ? handleDragEnd : emptyFn}
        onTouchMove={allowSwipe ? handleTouchMove : emptyFn}
        aria-roledescription="carousel"
        aria-live="polite"
        role="listbox"
        aria-orientation="horizontal"
        tabIndex={0}
      >
        {
          slides.map((node, i) => (
            <div
              className={css['carousel-slide']}
              style={slideStyle}
              key={`carousel-slide-${i + 1}`}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              { node }
            </div>
          ))
        }
      </div>
      {
        (top || loop) && showArrows && (
          <button
            type="button"
            className={`${css['carousel-slide-button']} ${css['carousel-slide-button-left']}`}
            style={slideButtonStyle}
            aria-label="Previous slide"
            onClick={handleSlideButtonClick(-1)}
          />
        )
      }
      {
        (top !== slides.length - 1 || loop) && showArrows && (
          <button
            type="button"
            className={`${css['carousel-slide-button']} ${css['carousel-slide-button-right']}`}
            style={slideButtonStyle}
            aria-label="Next slide"
            onClick={handleSlideButtonClick(1)}
          />
        )
      }
      {
        showDots && (
          <div className={css['carousel-dots']}>
            {
              slides.map((_, i) => {
                const classList = [css['carousel-dot']];
                if (i === top) classList.push(css['carousel-dot-active']);
                return (
                  <button
                    type="button"
                    className={classList.join(' ')}
                    key={`carousel-slide-${i + 1}`}
                    aria-label={`${i + 1} of ${slides.length}`}
                    onClick={handleDotClick(i)}
                  />
                );
              })
            }
          </div>
        )
      }
    </div>
  );
};

export default Carousel;
