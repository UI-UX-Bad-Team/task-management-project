import styles from './dashboard.module.css'
import Navigation from '../../components/navigation/Navigation';
import Calendars from '../../components/Calendars/Calendars';

const Dashboard = () => {

	return (
		<div className={styles.dashboard}>
			<Navigation />
			<Calendars />
		</div>
	);
}

export default Dashboard;
