import styles from './TeamDetail.module.css';
import { useState, useRef, useEffect } from 'react';
import { Select, Pagination, Table, Tag, Tabs, Input, Avatar, List , Tooltip, Button, Modal, notification } from 'antd';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { AudioOutlined, StarOutlined, UserOutlined, UsergroupAddOutlined, AntDesignOutlined } from '@ant-design/icons';
import {useParams} from 'react-router-dom';
import teamsSampleData from '../../data/team';
import { useNavigate } from 'react-router';
import projectsSampleData from '../../data/projects';
import usersSampleData from '../../data/users';
import TopicBox from '../../components/topicBox/TopicBox';
import dayjs from 'dayjs';
import { HighestIcon } from '../../data/priorityIcon';
import { BugType } from '../../data/issueTypes';
import AssignmentBox from '../../components/assignmentBox/AssignmentBox';
import { ProjectIcon } from '../../data/icon';


const { Search, TextArea } = Input;

const sampleTopics = [
	{
		id: 1,
		created:  dayjs([2023, 6, 1, 8, 30, 0]),
		creatingMemberId: 1,
		title: 'How to fix this bug ?',
		description: 'I found this bug yesterday but i dont know how to fix them. Please help me !!',
		answersNum: 10,
		viewsNum: 3,
	}, 
	{
		id: 2,
		created:  dayjs([2023, 5, 29, 17, 30, 0]),
		creatingMemberId: 4,
		title: 'Some way i can use to design faster',
		description: 'I started learn to design website...',
		answersNum: 4,
		viewsNum: 10,
	}, 
]


const suffix = (
	<AudioOutlined
	  style={{
		fontSize: 16,
		color: '#1677ff',
	  }}
	/>
  );



let data1 = [
	{ Id: 1, Status: 'Open', Summary: 'Analyze the new requirements gathered from the customer.', Type: 'Story', Priority: 'Low', Tags: 'Analyze,Customer', Estimate: 3.5, Assignee: 'Nancy Davloio', RankId: 1 },
	{ Id: 2, Status: 'InProgress', Summary: 'Fix the issues reported in the IE browser.', Type: 'Bug', Priority: 'Release Breaker', Tags: 'IE', Estimate: 2.5, Assignee: 'Janet Leverling', RankId: 2  },
	{ Id: 3, Status: 'Testing', Summary: 'Fix the issues reported by the customer.', Type: 'Bug', Priority: 'Low', Tags: 'Customer', Estimate: '3.5', Assignee: 'Steven walker', RankId: 1 },
	{ Id: 4, Status: 'Close', Summary: 'Arrange a web meeting with the customer to get the login page requirements.', Type: 'Others', Priority: 'Low', Tags: 'Meeting', Estimate: 2, Assignee: 'Michael Suyama', RankId: 1 },
	{ Id: 5, Status: 'Validate', Summary: 'Validate new requirements', Type: 'Improvement', Priority: 'Low', Tags: 'Validation', Estimate: 1.5, Assignee: 'Robert King', RankId: 1 }
];

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

const OverviewTab = (props) => {
	const params = useParams();
	const teamId = params.teamId;
	const teamInfo = teamsSampleData[teamId];

	const cardTemplate = (props) => {

        return (
			<div className="card-template" style={{backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px!important'}} >
						<div className='e-card-content' style={{padding: '1px', backgroundColor: '#fff'}}>
							<table className="card-template-wrap" style={{backgroundColor: '#fff', paddingLeft: '10px'}}>
								<tbody style={{backgroundColor: '#fff'}}>
									<tr>
										{/* <td className="CardHeader writeBg" style={{fontWeight: 500, backgroundColor: '#fff'}}>summary:</td> */}
										<td colspan="4" style={{color : '#000', fontWeight: 600, backgroundColor: '#fff'}}>{props.Summary}</td>
									</tr>
									<tr>
										<td style={{backgroundColor: '#fff'}}y>
											<BugType />
										</td>
										<td style={{backgroundColor: '#fff'}}>
											<div style={{fontWeight: 700, color: '#807e7e'}}>DEV-013</div>
										</td>
										<td style={{backgroundColor: '#fff'}}>
											<HighestIcon />
										</td>
										<td style={{backgroundColor: '#fff'}}>
											<div style={{}}>
												<Avatar.Group>
													<Avatar src="/images/avatar1.jpg" />
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
														src="/images/avatar2.jpg"
														/>
													</Tooltip>
													<Avatar
														style={{
															backgroundColor: '#1677ff',
														}}
														src="/images/avatar3.jpg"
													/>
												</Avatar.Group>
											</div>
										</td>
									</tr>
						</tbody>
					</table>
				</div>
			</div>)
    }

	const  columnTemplate = (props) => {
        return (
			<div className="header-template-wrap" style={{display: 'flex', gap: '6px', alignItems:"center"}}>
                <div className={"header-icon e-icons" + props.keyField} style={{width: '14px', height: '14px', borderRadius: '2px'}}></div>
                <div className="header-text" style={{fontSize: '14px', textTransform: 'uppercase'}}>{props.headerText} - {props.count} {props.count > 1 ? "items" : 'item'}</div>
            </div>);
    }
	return (
		<div>
			<div className={styles.overviewTab}>
				<div className={styles.flexColumn}>
					<p className={styles.organizationText}>Organization: <p className={styles.teamInfoText}>{teamInfo.organization}</p></p>
					<p className={styles.organizationText}>Department: <p className={styles.teamInfoText}>{teamInfo.department}</p></p>
					<p className={styles.organizationText}>People in change:
						<p className={styles.teamInfoText}>Đinh Trọng Huy <Avatar size={25} src={'/images/avatar4.jpg'}/></p>
					</p>
				</div>
				<div className={styles.flexColumn}>
					<p className={styles.organizationText}>Found Date: <p className={styles.teamInfoText}>{teamInfo.foundDate}</p></p>
					<p className={styles.organizationText}>Members number: <p className={styles.teamInfoText}>{teamInfo.memberNumber}</p></p>
					<p className={styles.organizationText}>
						Description: <p className={styles.teamInfoText} style={{fontWeight: 400}}> This is a funny teams :))). Enjoy it</p>
					</p>
				</div>
			</div>
			<p style={{fontSize: "24px", fontWeight: "700", color: "#3d5c98", marginBottom: '20px'}}>Board</p>
			<KanbanComponent id="kanban" keyField="Status" dataSource={data1} cardSettings={{ contentField: "Summary", headerField: "Id", template: cardTemplate }}>
                    <ColumnsDirective>
                    <ColumnDirective headerText="To Do" keyField="To Do" template={columnTemplate} />
                    <ColumnDirective headerText="In Progress" keyField="InProgress" template={columnTemplate}/>
                    <ColumnDirective headerText="Testing" keyField="Testing" template={columnTemplate}/>
                    <ColumnDirective headerText="Done" keyField="Done" template={columnTemplate}/>
                    </ColumnsDirective>
            </KanbanComponent>
		</div>
	)
}

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

const ProjectsTab = () => {
	const [position, setPosition] = useState('bottom');
	const [align, setAlign] = useState('center');
	const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
	const [joinButtonDisabled, setJoinButtonDisabled] = useState(true);
	const [createTeamConfirmButtonDisabled, setCreateTeamConfirmButtonDisabled]  = useState(true);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate(); 
	const params = useParams();
	const teamId = params.teamId;
	const selectedTeam = teamsSampleData.filter(team => {return team.id === parseInt(teamId)});
	const selectedTeamProjectIds = selectedTeam[0].projectIds;
	const projectData = [];
	projectsSampleData.forEach(project => {
		if(selectedTeamProjectIds.includes(project.id))
			{
				projectData.push(project);
			}
		}
	)

	setTimeout(() => {
		setLoading(false);
	}, 1000)

	const showProjectCreateModal = () => {
		setIsCreateProjectModalOpen(true);
	};
	const handleCreateTeamOk = () => {
		setIsCreateProjectModalOpen(false);
		handleOk();
		openSucessfullyAddNotification();
	};
	const handleCreateTeamCancel = () => {
		setIsCreateProjectModalOpen(false);
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
		<div>
			<Modal title="Create your project" open={isCreateProjectModalOpen} onOk={handleCreateTeamOk} onCancel={handleCreateTeamCancel} okButtonProps={{disabled: createTeamConfirmButtonDisabled}}>
					<p style={{marginBottom: '6px', color: '#3d5c98', fontWeight: 600}}>Project name: </p>
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
							{label: 'Private - Only team member can see it', value : 2}, 
						]}
					/>
			</Modal>
			<Modal
					open={open}
					title="Join or create project"
					onOk={handleOk}
					onCancel={handleCancel}
					footer={[
					]}
				>
					<div className={styles.addTeamModalContent}>
						<div className={styles.createTab}>
							<p style={{textAlign: 'center', fontSize: '18px', fontWeight: 600, color: '#3d5c98', marginTop: '20px'}}>Create a project</p>
							<AvatarGroup />
							<p className={styles.sloganText} style={{textAlign: 'center'}}>Bring everyone together and get to work!!</p>
							<div className={styles.createTeamButton} style={{display: 'flex', justifyContent: 'center', width: '80%'}} onClick={addTeamModal}>
								<div className={styles.addButonContainer1} style={{paddingLeft: '8px'}} onClick={() => {showProjectCreateModal()}}>
									<ProjectIcon />
									<p>Create new project</p>
								</div>
							</div>
						</div>
						<div className={styles.joinTab}>
							<p style={{textAlign: 'center', fontSize: '18px', fontWeight: 600, color: '#3d5c98', marginTop: '20px'}}>Join a project with a code</p>
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
								}}>Join Project</Button>
							</div>
						</div>
					</div>
				</Modal>
				<div className={styles.searchInputContainer}>
					<div className={styles.addButonContainer}>
						<ProjectIcon color="#fff"/>
						<p onClick={() => {
							addTeamModal();
						}}>Join or create project</p>
					</div>
					<Search
							placeholder="search by name or id"
							enterButton="Search"
							suffix={suffix}
							size="middle"
							allowClear={true}
							className={styles.searchInput}
					/>
				</div>
				<List
					pagination={{
					position,
					align,
					}}
					loading={loading}
					dataSource={projectData}
					renderItem={(item, index) => (
					<List.Item>
						<List.Item.Meta
						avatar={
							<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
						}
						title={
							<div style={{display: 'flex', justifyContent: 'space-between'}}>
								<div className={styles.projectName} href="#" style={{color: '#3d5c98', fontWeight: '700', fontSize: '18px'}} onClick={() => {navigate(`/teams/${teamId}/projects/${item.id}`)}}>{item.name.toUpperCase()}</div>
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

const MembersTab = () => {
	const [selectedMemberName, setSelectedMemberName] = useState('')
	const [selectedAccountName, setSelectedAccountName] = useState('')
	const params = useParams();
	const [members, setMembers] = useState([])
	const searchRef = useRef();
	const [confirmText, setConfirmText] = useState('');
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [loading, setLoading] = useState(false);

	const options = [
		{label: 'Bui Danh Tung', value: 'Bui Danh Tung'},
		{label: 'Dinh Trong Huy', value: 'Dinh Trong Huy'},
		{label: 'Dao Trong Hoan', value: 'Dao Trong Hoan'},
		{label: 'Ta Duc Tien', value: 'Ta Duc Tien'},
	];

	const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);

	const openSucessfullyAddNotification = () => {
		notification.open({
		  message: <div style={{display: 'flex', gap: '15px'}}>
			  			<svg width="25px" height="25px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect width="48" height="48" fill="white" fill-opacity="0.01"/>
							<path d="M24 4L29.2533 7.83204L35.7557 7.81966L37.7533 14.0077L43.0211 17.8197L41 24L43.0211 30.1803L37.7533 33.9923L35.7557 40.1803L29.2533 40.168L24 44L18.7467 40.168L12.2443 40.1803L10.2467 33.9923L4.97887 30.1803L7 24L4.97887 17.8197L10.2467 14.0077L12.2443 7.81966L18.7467 7.83204L24 4Z" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M17 24L22 29L32 19" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
			  			<p style={{color: '#2F88FF', fontWeight: 600}}>Sucessfully add !!</p>,
			  	   </div>,
		  description: 'These users has been added to this team.',
		  onClick: () => {
			console.log('Notification Clicked!');
		  },
		});
	  };

	  const openSucessfullyRemoveNotification = () => {
		notification.open({
		  message: <div style={{display: 'flex', gap: '15px'}}>
			  			<svg width="25px" height="25px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect width="48" height="48" fill="white" fill-opacity="0.01"/>
							<path d="M24 4L29.2533 7.83204L35.7557 7.81966L37.7533 14.0077L43.0211 17.8197L41 24L43.0211 30.1803L37.7533 33.9923L35.7557 40.1803L29.2533 40.168L24 44L18.7467 40.168L12.2443 40.1803L10.2467 33.9923L4.97887 30.1803L7 24L4.97887 17.8197L10.2467 14.0077L12.2443 7.81966L18.7467 7.83204L24 4Z" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M17 24L22 29L32 19" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
			  			<p style={{color: '#2F88FF', fontWeight: 600}}>Sucessfully remove!!</p>,
			  	   </div>,
		  description: 'These users has been removed to this team.',
		  onClick: () => {
		  },
		});
	  };

	const handleAddMemberOk = (e) => {
	  setAddMemberModalOpen(false);
	  openSucessfullyAddNotification();
	};
	const handleCancelAddMember = (e) => {
		setAddMemberModalOpen(false);
	};

	useEffect(() => {

		const teamId = params.teamId;
		const teamInfo = teamsSampleData[teamId];
		const membersId = teamInfo.projectIds.reduce((acc, cur) => {
		acc = acc.concat(projectsSampleData.filter(project => project.id === cur)[0].memberIds)
				return acc;
		}, [])
		const flatMembersId = [];
		membersId.forEach(member => {
				
		if(!flatMembersId.includes(Object.keys(member)[0])) {
					flatMembersId.push(Object.keys(member)[0])
			}
		})
		const members1 = flatMembersId.reduce((acc, cur) => {
			acc = acc.concat(usersSampleData.filter(user => user.id === parseInt(cur))[0])
			return acc;
		}, [])
			
		setMembers(members1);
	}, [])

	const [confirmModalOpen, setConfirmModalOpen] = useState(false);

	const columns = [
		{
		  title: 'Name',
		  dataIndex: 'name',
		  key: 'name',
		  render: (text) => 
		  	(
			<div>
				<p style={{color: "#3d5c98", fontWeight: 600}}>{text}</p>
				<p style={{}}></p>
			</div>
			),
		  onFilter: (value, record) => record.name.indexOf(value) === 0,
		  sorter: (a, b) => a.name.split(' ')[a.name.split(' ').length - 1].localeCompare(b.name.split(' ')[b.name.split(' ').length - 1]),
		  sortDirections: ['descend', 'ascend'],
		  width: '70%',
		},
		{
		  title: 'Action',
		  key: 'action',
		  width: '10%',
		  render: (_, record) => (
				<Button size='small' danger={true} onClick={() => {
					setConfirmModalOpen(true)
					setSelectedMemberName(record.name);
					setSelectedAccountName(record.accountName);
				}}>
					Remove
				</Button>
		  ),
		},
	  ];

	const searchHandler = (event) => {
		const searchValue = event.target.value;
		console.log(members.filter(member => member.name.includes(searchValue) || String(member.id).includes((searchValue))));
	}

	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};	

	const removeConfirmChange = (e) => {
		setConfirmText(e.target.value);
	}
	
	const hasSelected = selectedRowKeys.length > 0;

	return (
		<div>
			<Modal
				title={<p style={{color: 'red', fontWeight: 700}}>Are you sure remove {selectedMemberName} ?</p>}
				style={{
				top: 20,
				}}
				open={confirmModalOpen}
				onOk={() => {setConfirmModalOpen(false);openSucessfullyRemoveNotification() }}
				onCancel={() => setConfirmModalOpen(false)}
				okButtonProps={{ disabled:  !(selectedAccountName === confirmText)}}
			>
				<p style={{fontWeight: 700, marginBottom: '10px', marginTop: '15px'}}>Please type "{selectedAccountName}" to confirm: </p>
				<Input placeholder= {`Type ${selectedAccountName} to confirm`} onChange={removeConfirmChange} />
			</Modal>
			<Modal
				title="Select member to add: "
				open={addMemberModalOpen}
				onOk={handleAddMemberOk}
				onCancel={handleCancelAddMember}
				okButtonProps={{
				}}
				cancelButtonProps={{
				}}
			>
				<Select
					mode="multiple"
					allowClear
					style={{
						width: '100%',
					}}
					placeholder="Please select"
					defaultValue={[]}
					onChange={handleChange}
					options={options}
				/>
			</Modal>

			<div className={styles.searchInputContainer}>
				<div style={{display: 'flex', gap: '10px', justifyContent: 'space-between'}}>
					<Button type="primary" size={'middle'} onClick={() => {setAddMemberModalOpen(true)}}>
						Add member
					</Button>
				</div>
				<Search
					placeholder="search by name or id"
					enterButton="Search"
					suffix={suffix}
					size="middle"
					allowClear={true}
					ref={searchRef}
					onChange={searchHandler}
				/>
			</div>
			<Table columns={columns} dataSource={members} loading={members.length > 0 ? false : true} />
		</div>
	)
}

const AssigmentsTab = () => {
	const initialItems = [
		{
			label: 'Upcomming',
			children: [
						{id: 0, assignmentDueDate: 'Jun 1st Thurs Day', assignmentTitle: 'Powerpoint submiting', assignmentDueTime: '6:45 AM', assignmentTeam: 'Frontend developer'},
						{id: 1, assignmentDueDate: 'Jun 1st Thurs Day', assignmentTitle: 'Powerpoint submiting', assignmentDueTime: '6:45 AM', assignmentTeam: 'Frontend developer'},
						{id: 2, assignmentDueDate: 'Jun 1st Thurs Day', assignmentTitle: 'Powerpoint submiting', assignmentDueTime: '6:45 AM', assignmentTeam: 'Frontend developer'},
						{id: 3, assignmentDueDate: 'Jun 1st Thurs Day', assignmentTitle: 'Powerpoint submiting', assignmentDueTime: '6:45 AM', assignmentTeam: 'Frontend developer'},
					].map(assignment => {
				return (
					<AssignmentBox
						id={assignment.id}
						assignmentId={assignment.id}
						assignmentDueDate={assignment.assignmentDueDate}
						assignmentTitle={assignment.assignmentTitle}
						assignmentDueTime={assignment.assignmentDueTime}
						assignmentTeam={assignment.assignmentTeam}
					/>
				)
			}),
			key: '1',
			closable: false,
		},
		{
			label: 'Past due',
			children: 'Content of Tab 2',
			key: '2',
			closable: false,
		},
		{
			label: 'Completed',
			children: 'Content of Tab 3',
			key: '3',
			closable: false,
		},
	];
	const [activeKey, setActiveKey] = useState(initialItems[0].key);
	const [items, setItems] = useState(initialItems);
	const newTabIndex = useRef(0);
	const onChange = (newActiveKey) => {
		setActiveKey(newActiveKey);
	};
	
	const add = () => {
		const newActiveKey = `newTab${newTabIndex.current++}`;
		const newPanes = [...items];
		newPanes.push({
		label: 'New Tab',
		children: 'Content of new Tab',
		key: newActiveKey,
		});
		setItems(newPanes);
		setActiveKey(newActiveKey);
  	};

	const remove = (targetKey) => {
		let newActiveKey = activeKey;
		let lastIndex = -1;
		items.forEach((item, i) => {
		if (item.key === targetKey) {
			lastIndex = i - 1;
		}
		});
		const newPanes = items.filter((item) => item.key !== targetKey);
		if (newPanes.length && newActiveKey === targetKey) {
		if (lastIndex >= 0) {
			newActiveKey = newPanes[lastIndex].key;
		} else {
			newActiveKey = newPanes[0].key;
		}
		}
		setItems(newPanes);
		setActiveKey(newActiveKey);
	};

	const onEdit = (targetKey, action) => {
		if (action === 'add') {
		add();
		} else {
		remove(targetKey);
		}
	};

	return (
		<div>
			<Tabs
				type="editable-card"
				onChange={onChange}
				activeKey={activeKey}
				onEdit={onEdit}
				items={items}
    		/>
		</div>
	)

}

const DiscussionTab = () => {

	return (
		<div className={styles.discusstionTab}>
			<div style={{marginBottom: '15px'}}>
				{sampleTopics.map(topic => {
					return <TopicBox title={topic.title} description={topic.description} creatingMemberId={topic.creatingMemberId} answersNum={topic.answersNum} viewsNum={topic.viewsNum} created={topic.created}/>
				})}
			</div>
			<Pagination defaultCurrent={1} total={sampleTopics.length} showSizeChanger showQuickJumper={{ goButton: "Your text" }} />
		</div>
	)
}


  const items = [
	{
		key: '1',
		label: `Overview`,
		children: <OverviewTab />,
	},
	{
		key: '2',
		label: `Projects`,
		children: <ProjectsTab />,
	  },
	{
		key: '3',
		label: `Members`,
		children: <MembersTab />,
	},
	{
		key: '4',
		label: `My Assigments`,
		children: <AssigmentsTab />,
	},
	{
		key: '5',
		label: `Discussion`,
		children: <DiscussionTab />,
	},
  ];

const TeamDetail = (props) => {
	const params = useParams();
	const teamId = params.teamId;
	const teamInfo = teamsSampleData[teamId];
	const tabChange = (key) => {

	}
	return (
		<div className={styles.teamDetail}>
			<p className={styles.teamName}>{teamInfo.name}</p>
			<Tabs defaultActiveKey="1" items={items} onChange={tabChange} />
		</div>	
	)
}

export default TeamDetail;
