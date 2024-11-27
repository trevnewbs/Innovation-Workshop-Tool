import { useEffect, useRef, useState } from 'react';

interface DimensionObject {
  width: number;
  height: number;
}

export function useResizeObserver<T extends HTMLElement>(): [
  React.RefObject<T>,
  DimensionObject
] {
  const [dimensions, setDimensions] = useState<DimensionObject>({
    width: 0,
    height: 0,
  });
  const resizeObserverRef = useRef<T>(null);

  useEffect(() => {
    const observeTarget = resizeObserverRef.current;
    if (!observeTarget) return;

    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      });
    });

    resizeObserver.observe(observeTarget);

    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, []);

  return [resizeObserverRef, dimensions];
}
