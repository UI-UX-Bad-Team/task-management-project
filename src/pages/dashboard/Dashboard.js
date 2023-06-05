import styles from './dashboard.module.css';
import MainLayout from '../../components/layout/MainLayout.js';
import Calendars from '../../components/Calendar/Calendars';

const Dashboard = () => {

	return (
		<div className={styles.dashboard}>
			<MainLayout content={<Calendars />}/>
		</div>
	);
}

export default Dashboard;
