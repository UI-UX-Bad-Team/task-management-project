import styles from './TeamDetail.module.css';
import { useState, useRef, useEffect } from 'react';
import { Select, Pagination, Table, Tag, Tabs, Input, Avatar, List , Tooltip, Button, Modal, notification } from 'antd';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { AudioOutlined, StarOutlined, UserOutlined, AntDesignOutlined, PlusOutlined } from '@ant-design/icons';
import {useParams} from 'react-router-dom';
import teamsSampleData from '../../data/team';
import { useNavigate } from 'react-router';
import projectsSampleData from '../../data/projects';
import usersSampleData from '../../data/users';
import TopicBox from '../../components/topicBox/TopicBox';
import dayjs from 'dayjs';
import AssignmentBox from '../../components/assignmentBox/AssignmentBox';
import { ProjectIcon } from '../../data/icon';
import {registerLicense, extend} from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import ImageUpload from '../../components/imageUpload/ImageUpload';
import { HighestIcon , CriticalIcon, HighIcon, LowIcon, LowestIcon} from '../../data/priorityIcon';
import { updateSampleSection } from './sample-base';
import {BugType, ImprovementType, NewFeatureType, SubtaskType, StoryType} from '../../data/issueTypes';

const { Search, TextArea } = Input;

const image = {
	'Bui Danh Tung': '/images/avatar1.jpg',
	'Dao Trong Hoan': '/images/avatar2.jpg',
	'Dinh Trong Huy':'/images/avatar3.jpg',
	'Ta Duc Tien':'/images/avatar4.jpg',
	'Vu Minh Dang':'/images/avatar5.jpg',
	'Nguyen Duy Hung' :'/images/avatar6.jpg',
	'Pham Trung Dung' :'/images/avatar7.jpg',
	'Mac Van Khanh' :'/images/avatar8.jpg',
};

const priorityIcon = {
	'Low' : <LowIcon />,
	'Lowest' : <LowestIcon />,
	'Critical' : <CriticalIcon />,
	'High' : <HighIcon />,
	'Highest' : <HighestIcon />,
}

const issueTypeIcon = {
	'Bug' : <BugType />,
	'Improvement' : <ImprovementType />,
	'Story' : <StoryType />,
	'NewFeature' : <NewFeatureType />,
	'Subtask' : <SubtaskType />
}

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
function KanbanDialogFormTemplate(props) {
    useEffect(() => {
        updateSampleSection();
    }, []);

    const [state, setState] = useState(extend({}, {}, props, true));

    function onChange(args) {
        let key = args.target.name;
        let value = args.target.value;
		setState({[key]: value });
	
		console.log(value);
    }
    let data = state;

	let assigneeData = [
		'Bui Danh Tung', 'Dinh Trong Huy', 'Dao Trong Hoan','Ta Duc Tien','Vu Minh Dang'
	]
    let statusData = ['To do', 'InProgress', 'Testing', 'Done'];
    let priorityData = ['Lowest', 'Low', 'Critical', 'High', 'Highest'];

    return (
	<div>
            <table style={{width: '500px', height: '300px'}}>
                <tbody>
                    <tr>
                        <td className="e-label">Id</td>
                        <td>
							<input id="Id" name="Id" type="text" className="e-field" value={data.Id} disabled />
                        </td>
                    </tr>
                    <tr>
                        <td className="e-label">Title</td>
						<td>
							<input id="Title" name="Title" type="text" className="e-field" value={data.Title} onChange={onChange.bind(this)}/> 
						</td>
                    </tr>
					<tr>
                        <td className="e-label">Type</td>
                        <td>
                            <DropDownListComponent id='Status' name="Status" dataSource={statusData} className="e-field" placeholder='Status' value={data.Status} onChange={onChange.bind(this)}></DropDownListComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-label">Assignee</td>
                        <td>
                            <DropDownListComponent id='Assignee' name="Assignee" className="e-field" dataSource={assigneeData} placeholder='Assignee' value={data.Assignee} onChange={onChange.bind(this)}></DropDownListComponent>
                        </td>
                    </tr>
					<tr>
                        <td className="e-label">Reviewer</td>
                        <td>
                            <DropDownListComponent id='Reviewer' name="Reviewer" className="e-field" dataSource={assigneeData} placeholder='Reviewer' value={data.Reviewer} onChange={onChange.bind(this)}></DropDownListComponent>
                        </td>
                    </tr>
					<tr>
                        <td className="e-label">cc: </td>
                        <td>
							<DropDownListComponent id='Cc' name="Cc" className="e-field" dataSource={assigneeData} placeholder='Cc' value={data.Cc} onChange={onChange.bind(this)}></DropDownListComponent>
							{/* <Select
								mode="multiple"	
								name="Cc" 
								className="e-field"
								id='Cc'
								allowClear
								style={{
									width: '100%',
								}}
								placeholder="Please select"
								onChange={selectCcHandler}
								options={assigneeData}
								value={data.Cc}
							/> */}
                        </td>
                    </tr>
                    <tr>
                        <td className="e-label">Priority</td>
                        <td>
                            <DropDownListComponent type="text" name="Priority" id="Priority" popupHeight='300px' className="e-field" value={data.Priority} dataSource={priorityData} placeholder='Priority' onChange={onChange.bind(this)}></DropDownListComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-label">Summary</td>
                        <td>
                            <div className="e-float-input e-control-wrapper">
                                <textarea name="Summary" className="e-field" value={data.Summary} onChange={onChange.bind(this)}></textarea>
                            </div>
                        </td>
                    </tr>
					 <tr>
                        <td className="e-label">Attachment: </td>
                        <td>
							<div style={{display: 'flex', gap: 5}}>
                            	<ImageUpload />
							</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>);
}
const OverviewTab = (props) => {
	const navigate = useNavigate();
	registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF5cXmdCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWXlcdnRQR2VfUEd3WUQ=');

	const params = useParams();
	const workspaceId = params.workspaceId;
	const teamInfo = teamsSampleData[workspaceId];

	let kanbanData = [
		{ Id: 'Task 1', Title:"New requirements gathered from the customer", Status: 'Open', Summary: 'Analyze the new requirements gathered from the customer.', Type: 'Story', Priority: 'Low', Tags: 'Analyze,Customer', Estimate: 3.5, Assignee: 'Bui Danh Tung',Reviewer:"Mac Van Khanh", Cc:"Dinh Trong Huy", RankId: 1 },
		{ Id: 'Task 2', Title:"Fix IE browser's issues", Status: 'InProgress', Summary: 'Fix the issues reported in the IE browser.', Type: 'Bug', Priority: 'Critical', Tags: 'IE', Estimate: 2.5, Assignee: 'Dinh Trong Huy',Reviewer:"Ta Duc Tien",Cc:"Dao Trong Hoan", RankId: 2  },
		{ Id: 'Task 3', Title:"Fix customer reporting issues",Status: 'Testing', Summary: 'Fix the issues reported by the customer.', Type: 'Bug', Priority: 'High', Tags: 'Customer', Estimate: '3.5', Assignee: 'Bui Danh Tung',Reviewer:"Mac Van Khanh",Cc:"Nguyen Duy Hung", RankId: 1 },
		{ Id: 'Task 4', Title:"Arrange a web meeting", Status: 'Done', Summary: 'Arrange a web meeting with the customer to get the login page requirements.', Type: 'NewFeature', Priority: 'Low', Tags: 'Meeting', Estimate: 2, Assignee: 'Dinh Trong Huy',Reviewer: "Ta Duc Tien",Cc:"Bui Danh Tung", RankId: 1 },
		{ Id: 'Task 5', Title:"Validate new requirements", Status: 'Testing', Summary: 'Validate new requirements', Type: 'Improvement', Priority: 'Critical', Tags: 'Validation', Estimate: 1.5, Assignee: 'Bui Danh Tung',Reviewer:"Pham Trung Dung",Cc:"Vu Minh Dang", RankId: 1 },
		{ Id: 'Task 6', Title:"Testing I18n translator new feature", Status: 'Testing', Summary: 'We developed I18n new translator feature for advertisement page. Please test to confirm it work properly!', Type: 'Improvement', Priority: 'Critical', Tags: 'Test', Estimate: 1.5, Assignee: 'Dao Trong Hoan',Reviewer:"Ta Duc Tien",Cc:"Dinh Trong Huy", RankId: 1 },
	];

	let kanbanObj;

	const addTaskHandler = () => {
		const cardIds = kanbanObj.kanbanData.map(obj => parseInt(obj.Id.replace("Task", ""), 10));
		const cardCount = Math.max.apply(Math, cardIds) + 1;
		const CardDetails = {Id : "Task " + cardCount,Title: "New title", Status : "Open", Priority: "Normal", Assignee: "Bui Danh Tung", Reviewer: '', Cc: '', Estimate: 0, Tags: "", Summary: ""};
		kanbanObj.openDialog("Add", CardDetails);
	}

	const dialogTemplate = (props) => {

		return (<KanbanDialogFormTemplate {...props} />)
	}

	const cardTemplate = (props) => {

		const navigateToDetailHandler = () => {
	
			navigate(`/workspaces/${workspaceId}/assignments/${parseInt(props.Id.replace("Task ", ""))}`)
		}
		
        return (
			<div className="card-template" style={{backgroundColor: '#fff'}} onClick={navigateToDetailHandler}>
						<div className='e-card-content' style={{padding: '1px', backgroundColor: '#fff', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
							<table className="card-template-wrap" style={{backgroundColor: '#fff'}}>
								<tbody style={{backgroundColor: '#fff'}}>
									<tr>
										<td colspan="4" style={{color : '#000', fontWeight: 600, backgroundColor: '#fff'}}>{props.Title}</td>
									</tr>
									<tr>
										<td style={{backgroundColor: '#fff', display: 'flex', gap: '3px', alignItems: 'flex-end', height: '100%', paddingTop: '5px'}}>
											{issueTypeIcon[props.Type]}
											{priorityIcon[props.Priority]}
											<div style={{fontWeight: 700, color: '#807e7e'}}>{props.Id}</div>
										</td>
										<td style={{backgroundColor: '#fff'}}>
											<Avatar.Group>
												{[props.Assignee,props.Reviewer, props.Cc].map(person => {
													return (
														<Avatar src={image[person]}/>
													)
												})}
												
											</Avatar.Group>
										</td>
									</tr>
						</tbody>
					</table>
				</div>
			</div>)
    }

	const  columnTemplate = (props) => {
		
        return (
			<div className="header-template-wrap">
                <div className={"header-icon e-icons " + props.keyField}></div>
                <div className="header-text" style={{color : '#fff', fontSize: '16px'}}>{props.headerText} - {props.count} {props.count > 1 ? "items" : 'item'}</div>
            </div>);
    }

	const changeSprintHandler = () => {

	}

	const fields = [
		{ text: 'ID', key: 'Id', type: 'TextBox' },
        { key: 'Status', type: 'DropDown' },
        { key: 'Estimate', type: 'Numeric' },
        { key: 'Summary', type: 'TextArea' }
	]
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
						Description: <p className={styles.teamInfoText} style={{fontWeight: 400}}> We are a team specializing in providing fast solutions for software development.
</p>
					</p>
				</div>
			</div>
			<p style={{fontSize: "24px", fontWeight: "700", color: "#3d5c98", marginBottom: '20px'}}>Board</p>
			<KanbanComponent id="kanban" ref={(kanban) => { kanbanObj = kanban; }} keyField="Status" dataSource={kanbanData} cardSettings={{ contentField: "Summary", headerField: "Id", template: cardTemplate }} dialogSettings={{ fields : fields, template: dialogTemplate.bind(this), buttons: [{ buttonModel: { content: 'OK', isPrimary: true } }]}} swimlaneSettings={{ keyField: "Assignee", textField: 'AssigneeName' }} >
                    <ColumnsDirective>
                    <ColumnDirective headerText="To Do" keyField="To Do" template={columnTemplate} allowToggle={true}/>
                    <ColumnDirective headerText="In Progress" keyField="InProgress" template={columnTemplate} allowToggle={true}/>
                    <ColumnDirective headerText="Testing" keyField="Testing" template={columnTemplate} allowToggle={true}/>
                    <ColumnDirective headerText="Done" keyField="Done" template={columnTemplate} allowToggle={true}/>
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
	  description: 'You has been added to workspace !',
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
	const workspaceId = params.workspaceId;
	const selectedTeam = teamsSampleData.filter(team => {return team.id === parseInt(workspaceId)});
	const selectedTeamProjectIds = selectedTeam[0].projectIds;
	const projectData = [];
	const [projectSearchValue, setProjectSearchValue] = useState('');
	const [filteredProjects, setFilteredProjects] = useState([]);

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

	useEffect(() => {
		setFilteredProjects(projectData.filter(project => project.name.includes(projectSearchValue)));

	}, [projectSearchValue])

	const projectSearchHandler = (event) => {
		setProjectSearchValue(event.target.value);
	}

	return (
		<div>
			<Modal title="Create your team" open={isCreateProjectModalOpen} onOk={handleCreateTeamOk} onCancel={handleCreateTeamCancel} okButtonProps={{disabled: createTeamConfirmButtonDisabled}}>
					<p style={{marginBottom: '6px', color: '#3d5c98', fontWeight: 600}}>Team name: </p>
					<Input placeholder="Enter workspace name" onChange={(e) => {
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
						defaultValue= 'Private - Only workspace owners can add members'
						style={{
							width: 470,
						}}
						options={[
							{label: 'Public - Anyone in your organization can join', value : 1}, 
							{label: 'Private - Only workspace member can see it', value : 2}, 
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
							<div className={styles.createTeamButton} style={{display: 'flex', justifyContent: 'center', width: '80%'}} onClick={addTeamModal}>
								<div className={styles.addButonContainer1} style={{paddingLeft: '8px'}} onClick={() => {showProjectCreateModal()}}>
									<ProjectIcon />
									<p>Create new team</p>
								</div>
							</div>
						</div>
						<div className={styles.joinTab}>
							<p style={{textAlign: 'center', fontSize: '18px', fontWeight: 600, color: '#3d5c98', marginTop: '20px'}}>Join with code</p>
							<Input placeholder="Enter Code" onChange={(e) => {
								if(e.target.value.length > 0) {setJoinButtonDisabled(false)}
								else {
										setJoinButtonDisabled(true);
									}
								}
							}/>
							<p className={styles.joinSloganText} style={{textAlign: 'center'}}>Got a code to join a workspace. Enter it above</p>
							<div className={styles.joinButton}>
								<Button disabled={joinButtonDisabled} onClick={() => {
									openSucessfullyAddNotification();
									handleOk();
								}}>Join Team</Button>
							</div>
						</div>
					</div>
				</Modal>
				<div className={styles.searchInputContainer}>
					<div className={styles.addButonContainer}>
						<ProjectIcon color="#fff"/>
						<p onClick={() => {
							addTeamModal();
						}}>Join or create team</p>
					</div>
					<Search
							placeholder="search by name or id"
							enterButton="Search"
							suffix={suffix}
							size="middle"
							allowClear={true}
							className={styles.searchInput}
							onChange={projectSearchHandler}
					/>
				</div>
				<List
					pagination={{
					position,
					align,
					}}
					loading={loading}
					dataSource={projectSearchValue === '' ? projectData : filteredProjects}
					renderItem={(item, index) => (
					<List.Item>
						<List.Item.Meta
						avatar={
							<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
						}
						title={
							<div style={{display: 'flex', justifyContent: 'space-between'}}>
								<div className={styles.projectName} href="#" style={{color: '#3d5c98', fontWeight: '700', fontSize: '18px'}} onClick={() => {navigate(`/workspaces/${workspaceId}/teams/${item.id}`)}}>{item.name.toUpperCase()}</div>
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
	const [memberSearchValue, setMemberSearchValue] = useState('');
	const [filteredMembers, setFilteredMembers] = useState([]);

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
		  description: 'These users has been added to this workspace.',
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
		  description: 'These users has been removed to this workspace.',
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

		const workspaceId = params.workspaceId;
		const teamInfo = teamsSampleData[workspaceId];
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

	useEffect(() => {
		
		setFilteredMembers(members.filter(members=> members.name.includes(memberSearchValue.toLowerCase())));

	}, [memberSearchValue])

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
		setMemberSearchValue(searchValue);
	}

	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};	

	const removeConfirmChange = (e) => {
		setConfirmText(e.target.value);
	}
	
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
			<Table columns={columns} dataSource={memberSearchValue === '' ? members : filteredMembers} loading={members.length > 0 ? false : true} />
		</div>
	)
}

const AssigmentsTab = () => {
	const initialItems = [
		{
			label: 'Upcomming',
			children: [
						{ Id: 'Task 1', Title:"New requirements gathered from the customer", Status: 'Open', Summary: 'Analyze the new requirements gathered from the customer.', Type: 'Story', Priority: 'Low', Tags: 'Analyze,Customer', Estimate: 3.5, Assignee: 'Bui Danh Tung',Reviewer:"Mac Van Khanh", Cc:"Dinh Trong Huy", RankId: 1, assignmentTeam: 'Frontend developer', assignmentDueDate: '06/07/2023',  assignmentDueTime: '06:45', image: '/images/team1.jpg' },
						{ Id: 'Task 2', Title:"Fix IE browser's issues", Status: 'InProgress', Summary: 'Fix the issues reported in the IE browser.', Type: 'Bug', Priority: 'Highest', Tags: 'IE', Estimate: 2.5, Assignee: 'Dinh Trong Huy',Reviewer:"Ta Duc Tien",Cc:"Dao Trong Hoan", RankId: 2, assignmentTeam: 'Frontend developer',assignmentDueDate: '02/07/2023',assignmentDueTime: '12:15',image: '/images/team2.jpg'},
						{ Id: 'Task 3', Title:"Fix customer reporting issues",Status: 'Testing', Summary: 'Fix the issues reported by the customer.', Type: 'Bug', Priority: 'High', Tags: 'Customer', Estimate: '3.5', Assignee: 'Bui Danh Tung',Reviewer:"Mac Van Khanh",Cc:"Nguyen Duy Hung", RankId: 1, assignmentTeam: 'Frontend developer',assignmentDueDate: '04/07/2023',assignmentDueTime: '06:45',image: '/images/team5.jpg'},
						{ Id: 'Task 4', Title:"Arrange a web meeting", Status: 'Done', Summary: 'Arrange a web meeting with the customer to get the login page requirements.', Type: 'NewFeature', Priority: 'Low', Tags: 'Meeting', Estimate: 2, Assignee: 'Dinh Trong Huy',Reviewer: "Ta Duc Tien",Cc:"Bui Danh Tung", RankId: 1, assignmentTeam: 'Frontend developer',assignmentDueDate: '02/07/2023',assignmentDueTime: '08:00',image: '/images/team3.jpg'},
						{ Id: 'Task 5', Title:"Validate new requirements", Status: 'Testing', Summary: 'Validate new requirements', Type: 'Improvement', Priority: 'Low', Tags: 'Validation', Estimate: 1.5, Assignee: 'Bui Danh Tung',Reviewer:"Pham Trung Dung",Cc:"Vu Minh Dang", RankId: 1, assignmentTeam: 'Frontend developer', assignmentDueDate: '06/07/2023',assignmentDueTime: '09:15',image: '/images/team3.jpg'  },
						{ Id: 'Task 6', Title:"Testing I18n translator new feature", Status: 'Testing', Summary: 'We developed I18n new translator feature for advertisement page. Please test to confirm it work properly!', Type: 'Improvement', Priority: 'High', Tags: 'Test', Estimate: 1.5, Assignee: 'Dao Trong Hoan',Reviewer:"Ta Duc Tien",Cc:"Dinh Trong Huy", RankId: 1, assignmentTeam: 'Frontend developer', assignmentDueDate: '04/07/2023',assignmentDueTime: '07:45',image: '/images/team2.jpg'},
					].map(assignment => {
				return (
					<AssignmentBox
					id={assignment.Id}
					assignmentId={assignment.Id}
					assignmentDueDate={assignment.assignmentDueDate}
					assignmentTitle={assignment.Title}
					assignmentDueTime={assignment.assignmentDueTime}
					assignmentTeam={assignment.assignmentTeam}
					priority={assignment.Priority}
					type={assignment.Type}
					image={assignment.image}
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
		label: `Teams`,
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
	const workspaceId = params.workspaceId;
	const teamInfo = teamsSampleData[workspaceId];
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
