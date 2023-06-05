import styles from './team.module.css';
import MainLayout from '../../components/layout/MainLayout';
import TeamDetail from '../../components/teamDetail/TeamDetail';
import { Skeleton } from 'antd';
import {useState} from 'react';

const Team = () => {
	const [isLoading, setIsLoading] = useState(true);
	
	setTimeout(() => {
		setIsLoading(false);
	}, 1000)

	return	(
		<div className={styles.team}>
			<MainLayout content={isLoading ? <Skeleton /> : <TeamDetail />} />
		</div>
	)
}

export default Team;
