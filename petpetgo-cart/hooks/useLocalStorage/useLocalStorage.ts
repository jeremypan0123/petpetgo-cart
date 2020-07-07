import { useState, useEffect, useRef, useCallback } from 'react';

// try to find the value in local storage by key
const useLocalStorage = (key: string, initialValue: unknown) => {
	const [storedValue, setStoredValue] = useState(() => {
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
	const isFirstRender = useRef(true);

	useEffect(() => {
		// don't set item in local storage when doing first time rendered.
		if (isFirstRender.current) {
			isFirstRender.current = false;
		} else {
			try {
				// convert object to string and store in local storage
				const valueToStore = JSON.stringify(storedValue);
				if (window.localStorage.getItem(key) !== valueToStore) {
					window.localStorage.setItem(key, valueToStore);
				}
			} catch (err) {
				console.error(err);
			}
		}
	}, [key, storedValue]);

	// allows caller pass the update function
	const updateValue = useCallback(
		() => (value: unknown) => {
			try {
				const newValue = value instanceof Function ? value(storedValue) : value;
				setStoredValue(newValue);
			} catch (err) {
				console.error(err);
			}
		},
		[storedValue],
	);

	return [storedValue, updateValue];
};

export default useLocalStorage;
