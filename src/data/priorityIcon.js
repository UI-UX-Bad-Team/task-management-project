const CriticalIcon = () => {

	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="22px" width="22px">
			<linearGradient id="a" gradientUnits="userSpaceOnUse" x1="-46.25" y1="65.1105" x2="-46.25" y2="64.1105" gradientTransform="matrix(12 0 0 -13.1121 563 854.7415)">
				<stop offset="0" stop-color="#ff5630"/>
				<stop offset="1" stop-color="#ff8f73"/>
			</linearGradient>
			<path d="M2.5 4l5-2.9c.3-.2.7-.2 1 0l5 2.9c.3.2.5.5.5.9v8.2c0 .6-.4 1-1 1-.2 0-.4 0-.5-.1L8 11.4 3.5 14c-.5.3-1.1.1-1.4-.4-.1-.1-.1-.3-.1-.5V4.9c0-.4.2-.7.5-.9z" fill="url(#a)"/>
		</svg>
	)
}

const HighIcon = () => {

	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="22px" width="22px">
			<path d="M3.5 9.9c-.5.3-1.1.1-1.4-.3s-.1-1.1.4-1.4l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.3.5-.9.6-1.4.3L8 7.2 3.5 9.9z" fill="#ff5630"/>
		</svg>
	)
}

const HighestIcon = () => {

	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="22px" width="22px">
			<path d="M3.47876 7.9c-.5.3-1.1.1-1.4-.4s-.1-1 .4-1.3l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.2.4-.8.6-1.3.3l-4.5-2.7-4.5 2.7z" fill="#ff5630"/>
			<path d="M3.47876 12.2c-.5.3-1.1.2-1.4-.3s-.1-1.1.4-1.4l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.3.5-.9.6-1.4.3l-4.4-2.7-4.5 2.7z" fill="#ff7452"/>
		</svg>
	)
}

const LowIcon = () => {

	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="22px" width="22px">
			<path d="M12.5 6.1c.5-.3 1.1-.1 1.4.4.3.5.1 1.1-.3 1.3l-5 3c-.3.2-.7.2-1 0l-5-3c-.6-.2-.7-.9-.4-1.3.2-.5.9-.7 1.3-.4L8 8.8l4.5-2.7z" fill="#0065ff"/>
		</svg>
	)
}

const LowestIcon = () => {
	
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="20px" width="20px">
			<path d="M12.504883 8.14541c.5-.3 1.1-.1 1.4.4s.1 1-.4 1.3l-5 3c-.3.2-.7.2-1 0l-5-3c-.5-.3-.6-.9-.3-1.4.2-.4.8-.6 1.3-.3l4.5 2.7 4.5-2.7z" fill="#0065ff"/>
			<path d="M12.504883 3.84541c.5-.3 1.1-.2 1.4.3s.1 1.1-.4 1.4l-5 3c-.3.2-.7.2-1 0l-5-3c-.5-.3-.6-.9-.3-1.4.3-.5.9-.6 1.4-.3l4.4 2.7 4.5-2.7z" fill="#2684ff"/>
		</svg>
	)
}

export {
	CriticalIcon,
	HighIcon,
	HighestIcon,
	LowIcon,
	LowestIcon,
}
