import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = useCallback((key: string) => searchParams.get(key) || '', [searchParams]);
  
  const setParam = useCallback((key: string, value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
      
      // If we are setting something like search or status, we probably want to reset page to 1
      if (key !== 'page' && newParams.has('page')) {
        newParams.set('page', '1');
      }
      
      return newParams;
    });
  }, [setSearchParams]);

  const paramsObject = useMemo(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  return {
    searchParams,
    paramsObject,
    getParam,
    setParam,
  };
}
