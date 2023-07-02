import {useEffect, useState} from 'react';
import styles from './MyProjects.module.css';
import MainLayout from '../../components/layout/MainLayout';
import {List, Avatar, Tooltip, Input, Skeleton} from 'antd';
import { StarOutlined, UserOutlined, AudioOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

const { Search } = Input;

const suffix = (
	<AudioOutlined
	  style={{
		fontSize: 16,
		color: '#1677ff',
	  }}
	/>
  );


const sampleData = [
	{
		id: 0,
		name: 'web-crawler-team',
		description: 'The team that crawls historical data of many websites and render them into easy form.',
		memberIds: [{0: 'Admin'}, {4: 'Read'}, {7: 'Write'}, {10: 'Maintain'}],
		assignments: [{
			description: '',
			startTime: null,
			endTime: null,
			assignee: [],
			reviewer: [],
			detail: '',
			images:  []
		}],
		starredNum: 2,
	},
	{
		id: 1,
		name: 'task-managemet-team',
		description: 'The website team that supports tash management for personal uses.',
		memberIds: [{1: 'Admin'}, {3:'Review'}, {5: 'Write'}, {7 : 'Read'}, {12:'Write'}, {11:'Write'}, {18:'Write'}],
		assignments: [],
		starredNum: 3,
	},
	{
		id: 2,
		name: 'salon-booking-support',
		description: 'Website and mobile app for purpose of supporting user to easyly booking hair salon.',
		memberIds: [{2: 'Admin'}, {4: 'Maintain'}, {7:'Write'}, {5: 'Write'}, {8: 'Write'}, {11: 'Write'}],
		assignments: [],
		starredNum: 1,
	},
	{
		id: 3,
		name: 'ui-kit-docs',
		description: 'Ui components library for adversitement management.',
		memberIds: [{6: 'Admin'}, {14:'Maintain'}, {1: 'Write'}, {19: 'Write'}, {15 : 'Read'}, {13 : 'Write'}, {12:'Write'}],
		assignments: [],
		starredNum: 3,
	},
]

const MyProjectTab = () => {
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const [teamSearchValue, setTeamSearchValue] = useState('');
	const [filteredTeams, setFilteredTeams] = useState([]);

	useEffect(() => {
		setFilteredTeams(sampleData.filter(team => team.name.includes(teamSearchValue)));
	}, [teamSearchValue])

	setTimeout(() => {
		setLoading(false);
	}, 1000)

	const searchHandler = (e) => {
		setTeamSearchValue(e.target.value);
	}

	return (
		<div className={styles.myProjectTab}>
			<div style={{fontSize: '24px', fontWeight: 700, color: '#3d5c98', marginBottom: '30px' }}>My team list</div>
			<div className={styles.searchInputContainer}>
				<Search
						placeholder="search by name or id"
						enterButton="Search"
						suffix={suffix}
						size="middle"
						allowClear={true}
						onChange={searchHandler}
				/>
			</div>
			<List
					pagination={{
						position:'bottom',
						align:'center',
					}}
					loading={loading}
					dataSource={teamSearchValue === '' ? sampleData : filteredTeams}
					renderItem={(item, index) => (
					<List.Item>
						<List.Item.Meta
						avatar={
							<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
						}
						title={
							<div style={{display: 'flex', justifyContent: 'space-between'}}>
								<div className={styles.projectName} href="#" style={{color: '#3d5c98', fontWeight: '700', fontSize: '18px'}}  onClick={() => {navigate(`/my-teams/${item.id}`)}}>{item.name.toUpperCase()}</div>
								<div style = {{display: 'flex', gap: '3px'}}>
									<StarOutlined style={{fontSize: '19px', height: '100%'}}/>
									<div style={{color: '#000', fontWeight: '600'}}>{item.starredNum}</div>
								</div>
							</div>
						}
						description={
							<div style={{display: 'flex', justifyContent: 'space-between'}}>
								<div>{item.description}</div>
								<div>
								<Avatar.Group>
									<Avatar src="/images/avatar2.jpg" />
									<a href="https://ant.design">
										<Avatar
										style={{
											backgroundColor: '#f56a00',
										}}
										>
										K
										</Avatar>
									</a>
									<Tooltip title="Ant User" placement="top">
										<Avatar
										style={{
											backgroundColor: '#87d068',
										}}
										icon={<UserOutlined />}
										/>
									</Tooltip>
									<Avatar
										style={{
										backgroundColor: '#1677ff',
										}}
										src='/images/avatar1.jpg'
									/>
									</Avatar.Group>
								</div>
							</div>
						}
						/>
					</List.Item>
					)}
				/>
		</div>
		
	)
}


const MyProject = () => {
	const [isLoading, setIsLoading] = useState(true);

	setTimeout(() => {
		setIsLoading(false);
	}, 1000)

	return (
		<div className={styles.myProject}>
			<MainLayout content={isLoading ? <Skeleton /> : <MyProjectTab />}/>
		</div>
	)
}

export default MyProject;
