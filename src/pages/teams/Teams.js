import {useState} from 'react';
import styles from './teams.module.css';
import MainLayout from '../../components/layout/MainLayout';
import TeamGrid from '../../components/teamGrid/TeamGrid';
import { Skeleton } from 'antd';

const Teams = () => {

	const [isLoading, setIsLoading] = useState(true);

	setTimeout(() => {
		setIsLoading(false);
	}, 1000)

	return (
		<div className={styles.teams}>
			<MainLayout content={(isLoading ? <Skeleton /> : <TeamGrid />)}/>
		</div>
	);
}

export default Teams;
