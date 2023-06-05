import React from 'react';
import Logo from '../logo/Logo';
import Headline from '../headline/Headline';
import styles from './header.module.css';

const Header = () => {

	return (
		<div className={styles.header}>
			<Logo />
			<Headline />
		</div>
	)
}

export default Header;
