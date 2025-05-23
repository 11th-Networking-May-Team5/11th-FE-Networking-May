import React from 'react';

interface UseDelayedLoadingProps {
  isLoading: boolean;
  delay?: number;
}

/**
 * isLoading이 false가 되어도 최소 delay(ms)만큼은 true를 유지하게 해주는 훅
 */
const useDelayedLoading = ({
  isLoading,
  delay = 600,
}: UseDelayedLoadingProps) => {
  const [isDelayEnd, setIsDelayEnd] = React.useState(true);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isLoading) {
      timeout = setTimeout(() => {
        setIsDelayEnd(false);
      }, delay);
    } else {
      setIsDelayEnd(true);
    }

    return () => clearTimeout(timeout);
  }, [isLoading, delay]);

  return isDelayEnd || isLoading;
};

export default useDelayedLoading;
