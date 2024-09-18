import { useEffect, useState } from 'react';

// 제네릭 타입을 사용하여 여러 타입의 데이터를 저장할 수 있는 훅
const useSessionStorage = <T>(key: string, initialValue: T) => {
  // 세션에서 데이터 불러오기
  const loadFromSession = (): T => {
    const storedValue = sessionStorage.getItem(key);
    if (storedValue === null) return initialValue;
    return JSON.parse(storedValue) as T;
  };

  const [storedValue, setStoredValue] = useState<T>(loadFromSession);

  // 데이터가 변경될 때마다 sessionStorage에 저장
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
};

export default useSessionStorage;
