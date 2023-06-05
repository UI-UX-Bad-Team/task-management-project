import styles from './logo.module.css'
import { useNavigate } from "react-router";

const Logo = () => {

	const navigate = useNavigate();

	return (
		<div className={styles.logo} onClick={() => {navigate('/dashboard')}}>
			<img src={require("../../images/logo.png")} alt="logo" width="35" height="35"/>
			<div className={styles.appName}>Taskiller</div>
		</div>
	)
}

export default Logo;
