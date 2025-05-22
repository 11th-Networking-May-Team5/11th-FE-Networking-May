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
  const [showLoading, setShowLoading] = React.useState(true);

  React.useEffect(() => {
    let timeout: number | undefined;

    if (!isLoading) {
      timeout = setTimeout(() => {
        setShowLoading(false);
      }, delay);
    } else {
      setShowLoading(true);
    }

    return () => clearTimeout(timeout);
  }, [isLoading, delay]);

  return showLoading || isLoading;
};

export default useDelayedLoading;
