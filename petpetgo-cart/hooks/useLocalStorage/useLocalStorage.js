import * as React from 'react';
import PropTypes from 'prop-types';

// try to find the value in local storage by key
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // if the key exists in local storage, return the value
      // otherwise, return initial value
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      // key doesn't exist
      return initialValue;
    }
  });

  // use to check this is first time rendered or not
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    // don't set item in local storage when doing first time rendered.
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      try {
        console.log(storedValue);
        // convert object to string and store in local storage
        const valueToStore = JSON.stringify(storedValue);
        if (window.localStorage.getItem(key) !== valueToStore) {
          window.localStorage.setItem(key, valueToStore);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [storedValue]);

  // allows caller pass the update function
  const updateValue = (value) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      setStoredValue(newValue);
    } catch (err) {
      console.error(err);
    }
  };

  return [storedValue, updateValue];
};

useLocalStorage.propTypes = {
  key: PropTypes.string.isRequired,
  initialValue: PropTypes.string.isRequired,
};

export default useLocalStorage;
