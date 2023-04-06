import styles from './logo.module.css'

const Logo = () => {


	return (
		<div className={styles.logo}>
			<img src={require("../../images/logo.png")} alt="logo" width="35" height="35"/>
			<div className={styles.appName}>Taskiller</div>
		</div>
	)
}

export default Logo;
