import {useState} from 'react';
import { Divider, Row , Modal, Avatar, Tooltip, Input, Button, Select, notification} from 'antd';
import TeamCard from '../teamCard/TeamCard';
import teamSampleData from '../../data/team';
import styles from './TeamGrid.module.css';
import { UsergroupAddOutlined, UserOutlined, AntDesignOutlined, AudioOutlined } from '@ant-design/icons';
const { TextArea, Search } = Input;

const suffix = (
	<AudioOutlined
	  style={{
		fontSize: 16,
		color: '#1677ff',
	  }}
	/>
  );

const AvatarGroup = () => {

	return (
		<div style={{display: 'flex', justifyContent: 'center'}}>
			<Avatar.Group>
				<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
				<a href="https://ant.design">
					<Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
				</a>
				<Tooltip title="Ant User" placement="top">
					<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
				</Tooltip>
				<Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
				</Avatar.Group>
		</div>
	)
}


const TeamGrid = () => {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [joinButtonDisabled, setJoinButtonDisabled] = useState(true);
	const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
	const [createTeamConfirmButtonDisabled, setCreateTeamConfirmButtonDisabled] = useState(true);

	const openSucessfullyAddNotification = () => {
		notification.open({
		  message: <div style={{display: 'flex', gap: '15px'}}>
			  			<svg width="25px" height="25px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect width="48" height="48" fill="white" fill-opacity="0.01"/>
							<path d="M24 4L29.2533 7.83204L35.7557 7.81966L37.7533 14.0077L43.0211 17.8197L41 24L43.0211 30.1803L37.7533 33.9923L35.7557 40.1803L29.2533 40.168L24 44L18.7467 40.168L12.2443 40.1803L10.2467 33.9923L4.97887 30.1803L7 24L4.97887 17.8197L10.2467 14.0077L12.2443 7.81966L18.7467 7.83204L24 4Z" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M17 24L22 29L32 19" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
			  			<p style={{color: '#2F88FF', fontWeight: 600}}>Welcome Tung!!</p>,
			  	   </div>,
		  description: 'You has been added to team !',
		  onClick: () => {
			console.log('Notification Clicked!');
		  },
		});
	};



	const showTeamCreateModal = () => {
		setIsCreateTeamModalOpen(true);
	};
	const handleCreateTeamOk = () => {
		setIsCreateTeamModalOpen(false);
	};
	const handleCreateTeamCancel = () => {
		setIsCreateTeamModalOpen(false);
	};

	const addTeamModal = () => {
		setOpen(true);
	};

	const handleOk = () => {
		setLoading(true);
		setTimeout(() => {
		  setLoading(false);
		  setOpen(false);
		}, 1000);
	  };
	  const handleCancel = () => {
		setOpen(false);
	};

	return (
		<div className={styles.teamGrid}>
				<Modal title="Create your team" open={isCreateTeamModalOpen} onOk={handleCreateTeamOk} onCancel={handleCreateTeamCancel} okButtonProps={{disabled: createTeamConfirmButtonDisabled}}>
					<p style={{marginBottom: '6px', color: '#3d5c98', fontWeight: 600}}>Team name: </p>
					<Input placeholder="Enter team name" onChange={(e) => {
						if(e.target.value.length > 0) {setCreateTeamConfirmButtonDisabled(false)}
						else {
							setCreateTeamConfirmButtonDisabled(true);
						}
					}}/>
					<p style={{marginBottom: '6px', marginTop: '10px', color: '#3d5c98', fontWeight: 600}}>Description: </p>
					<TextArea showCount maxLength={100} placeholder="Max length is 100 characters" />
					<p style={{marginBottom: '6px', marginTop: '10px', color: '#3d5c98', fontWeight: 600}}>Privacy: </p>
					<Select
						size={'middle'}
						defaultValue= 'Private - Only team owners can add members'
						style={{
							width: 470,
						}}
						options={[
							{label: 'Public - Anyone in your organization can join', value : 1}, 
							{label: 'Private - Only team owners can add members', value : 2}, 
						]}
					/>
				</Modal>
				<Modal
					open={open}
					title="Join or create team"
					onOk={handleOk}
					onCancel={handleCancel}
					footer={[
					]}
				>
					<div className={styles.addTeamModalContent}>
						<div className={styles.createTab}>
							<p style={{textAlign: 'center', fontSize: '18px', fontWeight: 600, color: '#3d5c98', marginTop: '20px'}}>Create a team</p>
							<AvatarGroup />
							<p className={styles.sloganText} style={{textAlign: 'center'}}>Bring everyone together and get to work!!</p>
							<div className={styles.createTeamButton} style={{display: 'flex', justifyContent: 'center', width: '70%'}} onClick={addTeamModal}>
								<div className={styles.addButonContainer1} style={{marginLeft: '30px', paddingLeft: '20px'}} onClick={() => {showTeamCreateModal()}}>
									<UsergroupAddOutlined />
									<p>Create team</p>
								</div>
							</div>
						</div>
						<div className={styles.joinTab}>
							<p style={{textAlign: 'center', fontSize: '18px', fontWeight: 600, color: '#3d5c98', marginTop: '20px'}}>Join a team with a code</p>
							<Input placeholder="Enter Code" onChange={(e) => {
								if(e.target.value.length > 0) {setJoinButtonDisabled(false)}
								else {
										setJoinButtonDisabled(true);
									}
								}
							}/>
							<p className={styles.joinSloganText} style={{textAlign: 'center'}}>Got a code to join a team. Enter it above</p>
							<div className={styles.joinButton}>
								<Button disabled={joinButtonDisabled} onClick={() => {
									openSucessfullyAddNotification();
									handleOk();
								}}>Join Team</Button>
							</div>
						</div>
					</div>
				</Modal>
			<Divider orientation="left" style={{color: '#3d5c98'}}>My Teams</Divider>
				<div style={{display: 'flex', justifyContent: 'space-between'}}>
					<div className={styles.addButonContainer} onClick={addTeamModal}>
						<UsergroupAddOutlined />
						<p>Join or create team</p>
					</div>
					<Search
							placeholder="search by name or id"
							enterButton="Search"
							suffix={suffix}
							size="middle"
							allowClear={true}
					/>
				</div>
				<Row
					gutter={[45, 16]}
				>
					{
						teamSampleData.map(
							team => 
								<TeamCard key={team.id} id={team.id} title={team.name} image={team.image} description={team.description} />
							)
					}
				</Row>
		</div>
	)
}

export default TeamGrid;
