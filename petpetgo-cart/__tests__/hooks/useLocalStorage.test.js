import * as React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import useLocalStorage from '../../hooks/useLocalStorage';

test('set item in local storage', () => {
  const { result } = renderHook(() => useLocalStorage('foo', 'bar'));
  let [storedValue, updateValue] = result.current;

  expect(storedValue).toBe('bar');

  // act(() => {
  //   updateValue('bar');
  // });

  // expect(window.localStorage.getItem('foo')).toBe('bar');
});
