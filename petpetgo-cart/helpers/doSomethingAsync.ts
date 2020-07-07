export function doSomethingAsync(timeout: number = 2000): Promise<any> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, timeout);
	});
}
