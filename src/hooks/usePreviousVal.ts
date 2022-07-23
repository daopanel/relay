import { useRef, useEffect } from 'react';

const usePreviousVal = <T>(value: T) => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePreviousVal;
