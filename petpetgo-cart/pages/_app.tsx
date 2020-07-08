import * as React from 'react';
import '@blueprintjs/table/lib/css/table.css';

import { GlobalContextProvider, UserContextProvider } from '../contexts';

const MyApp = (props) => {
	const { Component, pageProps } = props;
	const getLayout = Component.getLayout || ((page) => page);
	return (
		<GlobalContextProvider>
			<UserContextProvider>
				{getLayout(<Component {...pageProps} />)}
			</UserContextProvider>
		</GlobalContextProvider>
	);
};

export default MyApp;
