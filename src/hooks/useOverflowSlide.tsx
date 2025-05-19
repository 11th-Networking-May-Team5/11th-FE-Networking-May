import React from 'react';

interface UseOverflowSlideProps {
  chartOverflowContainerRef: React.RefObject<HTMLDivElement | null>;
}

interface UseOverflowSlideReturn {
  isLeftEnd: boolean;
  isRightEnd: boolean;
  handleSlideButtonClick: (position: 'left' | 'right') => void;
}

/**
 * 슬라이드 버튼 클릭 시 차트 슬라이드 이동 훅
 * @param chartOverflowContainerRef
 * @returns {isLeftEnd, isRightEnd, handleSlideButtonClick}
 */
const useOverflowSlide = ({
  chartOverflowContainerRef,
}: UseOverflowSlideProps) => {
  const _return = React.useRef({} as UseOverflowSlideReturn);

  const [isLeftEnd, setIsLeftEnd] = React.useState(false);
  const [isRightEnd, setIsRightEnd] = React.useState(true);

  /**
   * 슬라이드 좌우 버튼 클릭 이벤트
   * @param position {left | right}
   * @returns
   */
  const handleSlideButtonClick = (position: 'left' | 'right') => {
    const overflowContainerElement =
      chartOverflowContainerRef.current as HTMLDivElement;

    if (!overflowContainerElement) {
      return;
    }

    const scrollAmount =
      (position === 'left'
        ? -overflowContainerElement.clientWidth
        : overflowContainerElement.clientWidth) * 0.5;

    overflowContainerElement.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  //
  //
  //
  React.useEffect(() => {
    const overflowContainerElement =
      chartOverflowContainerRef.current as HTMLDivElement;

    if (!overflowContainerElement) {
      return;
    }

    const handleScroll = () => {
      const { scrollLeft, clientWidth } = overflowContainerElement;

      setIsLeftEnd(scrollLeft > 0);
      setIsRightEnd(scrollLeft < clientWidth);
    };

    overflowContainerElement.addEventListener('scroll', handleScroll);

    return () => {
      overflowContainerElement.removeEventListener('scroll', handleScroll);
    };
  }, [chartOverflowContainerRef]);

  _return.current = {
    isLeftEnd,
    isRightEnd,
    handleSlideButtonClick,
  };

  return _return.current;
};

export default useOverflowSlide;
