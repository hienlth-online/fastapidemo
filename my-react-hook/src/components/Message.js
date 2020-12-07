import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Message() {
	const [result, setResult] = useState(null);

	const message = async () => {
		try {
			let res = await axios.get('http://localhost:8000/');
			let result = res.message;
			setResult(result);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		message()
	}, []);
	return (
		<div>
			{result}
		</div>
	)
}

export default Message;