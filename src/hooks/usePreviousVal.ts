import { useRef, useEffect } from 'react';

const usePreviousVal = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePreviousVal;
