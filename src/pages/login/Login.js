import LoginForm from '../../components/loginForm/LoginForm';
import styles from './login.module.css';

const Login = (props) => {

	return (
		<div className={styles.login}>
			<LoginForm successNotification={props.successNotification}/>
		</div>
	)
}

export default Login;
