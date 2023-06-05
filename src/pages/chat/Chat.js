import styles from './Chat.module.css'
import MainLayout from '../../components/layout/MainLayout';

const Chat = () => {

	return (
		<div className={styles.chat}>
			<MainLayout content={<div>Tung dep trai</div>}/>
		</div>
	)

}

export default Chat;
