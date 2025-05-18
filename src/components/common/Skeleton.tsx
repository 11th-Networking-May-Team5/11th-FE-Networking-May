import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface SkeletonProps {
  isLoading: boolean;
  width?: string;
  height?: string;
  minDuration?: number;
  children?: React.ReactNode;
}

interface SkeletonBoxProps {
  width: string;
  height: string;
}

const skeletonVariants = {
  shimmer: {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 1.2,
      repeat: Infinity,
    },
  },
};

/**
 * - Skeleton 컴포넌트
 * - 자식 컴포넌트를 감싸 minDuration 만큼 로딩 애니메이션을 렌더링하고, isLoading이 false가 되면 자식 컴포넌트를 렌더링
 * - @param isLoading {boolean} - 로딩 여부
 * - @param width {string} - 너비
 * - @param height {string} - 높이
 * - @param minDuration {number} - 최소 로딩 시간
 * - @param children {React.ReactNode} - 자식 컴포넌트
 */
const Skeleton = ({
  isLoading,
  width = '100%',
  height = '20px',
  minDuration = 600,
  children,
}: SkeletonProps) => {
  const [isElapsedMinDuration, setIsElapsedMinDuration] = React.useState(false);
  const [isSkeletonVisible, setIsSkeletonVisible] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsElapsedMinDuration(true);
    }, minDuration);

    return () => {
      clearTimeout(timeout);
    };
  }, [minDuration]);

  React.useEffect(() => {
    if (!isLoading && isElapsedMinDuration) {
      setIsSkeletonVisible(false);
    } else {
      setIsSkeletonVisible(true);
    }
  }, [isLoading, isElapsedMinDuration]);

  if (!isSkeletonVisible) {
    return children;
  }

  return (
    <SkeletonBox
      width={width}
      height={height}
      variants={skeletonVariants}
      animate="shimmer"
    />
  );
};

const SkeletonBox = styled(motion.div)<SkeletonBoxProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 4px;
  background-color: #e0e0e0;
  margin-bottom: 12px;
`;

export default Skeleton;
