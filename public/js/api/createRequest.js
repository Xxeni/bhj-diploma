/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
	const xhr = new XMLHttpRequest();
	xhr.onload = function() {
		if (xhr.readyState === xhr.DONE && xhr.status === 200) {
		options.callback(null, xhr.response);
		} else {
			options.callback(xhr.statusText, xhr.response);
		}
	}	
	if (options.method === 'GET') {
		options.url += '?';
		for (let item in options.data) {
			options.url += item + '=' + options.data[item] + '&'; 
		}
		options.url.slice(0,-1);
		try {
			xhr.open(options.method, options.url);
			xhr.responseType = 'json';
			xhr.send();	
		}
		catch ( e ) {
			callback( e );
		}		
	} else {
		formData = new FormData;
		for (let item in options.data) {
			formData.append(item, options.data[item]);
		}
		
		try {
			xhr.open(options.method, options.url);
			xhr.responseType = 'json';
			xhr.send(formData);
		}
		catch ( e ) {
			callback( e );
		}
	}	
};