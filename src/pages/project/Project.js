import styles from './Project.module.css';
import {useState, useRef, useEffect} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import {useParams} from 'react-router-dom';
import projectsSampleData from '../../data/projects';
import { MembersIcon, ProjectIcon, OverviewIcon } from '../../data/icon';
import { StarOutlined, StarFilled, AudioOutlined, PlusOutlined } from '@ant-design/icons';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { Table, Tabs, Input, Avatar , Button, Modal, Skeleton, Select} from 'antd';
import AssignmentBox from '../../components/assignmentBox/AssignmentBox';
import {BugType, ImprovementType, NewFeatureType, SubtaskType, StoryType} from '../../data/issueTypes';
import {extend, registerLicense} from '@syncfusion/ej2-base';
import { updateSampleSection } from './sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import ImageUpload from '../../components/imageUpload/ImageUpload';
import { HighestIcon , CriticalIcon, HighIcon, LowIcon, LowestIcon} from '../../data/priorityIcon';
import { useNavigate } from "react-router";
import usersSampleData from '../../data/users';

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

const {Search} = Input;

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
					assignmentId={assignment.Id}
					assignmentDueDate={assignment.assignmentDueDate}
					assignmentTitle={assignment.Title}
					assignmentDueTime={assignment.assignmentDueTime}
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
const suffix = (
	<AudioOutlined
	  style={{
		fontSize: 16,
		color: '#1677ff',
	  }}
	/>
  );

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

  
const OverviewTab = () => {
	const navigate = useNavigate();
	const params = useParams();
	const teamId = params.teamId;
	registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF5cXmdCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWXlcdnRQR2VfUEd3WUQ=');

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
	
			navigate(`/my-teams/${teamId}/assignments/${parseInt(props.Id.replace("Task ", ""))}`)
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
		<div className={styles.overviewTab}>
			<div style={{display: 'flex', gap: '30px', marginBottom: '50px'}}>
				<div className={styles.flexColumn}>
						<p className={styles.organizationText}>Organization: <p className={styles.projectInfoText}>Frontend Developer</p></p>
						<p className={styles.organizationText}>Department: <p className={styles.projectInfoText}>Advertisement Management</p></p>
						<p className={styles.organizationText}>People in change:
							<p className={styles.projectInfoText}><Avatar size={25} src={'/images/avatar4.jpg'}/> Đinh Trọng Huy</p>
						</p>
					</div>
					<div className={styles.flexColumn}>
						<p className={styles.organizationText}>Found Date: <p className={styles.projectInfoText}>08/02/2015</p></p>
						<p className={styles.organizationText}>Members number: <p className={styles.projectInfoText}>10</p></p>
						<p className={styles.organizationText}>
							Description: <p className={styles.projectInfoText} style={{fontWeight: 400}}> This is a funny teams :))). Enjoy it</p>
						</p>
				</div>
			</div>
			<div>
				<div style={{display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'space-between'}}>
					<div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
						<p style={{fontSize: '20px', color: '#3d5c98', fontWeight: 700, marginBottom: '20px', marginTop: '20px'}}>Board</p>
						<Select
							defaultValue="Sprint 14"
							style={{
								width: 120,
								// borderWidth: 1,
								// borderColor: '#3d5c98'
							}}
							bordered
							onChange={changeSprintHandler}
							options={[
								{
								value: 'sprint 14',
								label: 'sprint 14',
								},
								{
								value: 'sprint 13',
								label: 'sprint 13',
								},
								{
								value: 'sprint 12',
								label: 'sprint 12',
								},
								{
								value: 'sprint 11',
								label: 'sprint 11',
								disabled: true,
								},
							]}
						/>

					</div>
					<div>
						<Button shape="circle" icon={<PlusOutlined />} size={"large"} style={{backgroundColor: '#3d5c98', color: '#fff'}} onClick={addTaskHandler}/>
					</div>
				</div>
			<KanbanComponent id="kanban" ref={(kanban) => { kanbanObj = kanban; }} keyField="Status" dataSource={kanbanData} cardSettings={{ contentField: "Summary", headerField: "Id", template: cardTemplate }} dialogSettings={{ fields : fields, template: dialogTemplate.bind(this), buttons: [{ buttonModel: { content: 'OK', isPrimary: true } }]}} swimlaneSettings={{ keyField: "Assignee", textField: 'AssigneeName' }} >
                    <ColumnsDirective>
                    <ColumnDirective headerText="To Do" keyField="To Do" template={columnTemplate} allowToggle={true}/>
                    <ColumnDirective headerText="In Progress" keyField="InProgress" template={columnTemplate} allowToggle={true}/>
                    <ColumnDirective headerText="Testing" keyField="Testing" template={columnTemplate} allowToggle={true}/>
                    <ColumnDirective headerText="Done" keyField="Done" template={columnTemplate} allowToggle={true}/>
                    </ColumnsDirective>
            </KanbanComponent>
			</div>
		</div>
	)
}


const MembersTab = () => {
	const [selectedMemberName, setSelectedMemberName] = useState('')
	const [selectedAccountName, setSelectedAccountName] = useState('')
	const [confirmModalOpen, setConfirmModalOpen] = useState(false);
	const [confirmRemoveButtonDisabled, setConfirmRemoveButtonDisabled] = useState(true);
	const params = useParams();
	const teamId = params.teamId;
	const selectedTeam = projectsSampleData[parseInt(teamId)];
	const usersArray = selectedTeam.memberIds.map(obj => Object.keys(obj)[0]);
	const [memberSearchValue, setMemberSearchValue] = useState('');
	const [filteredMembers, setFilteredMembers] = useState([]);

	const dataSource = [
	];

	const memberSearchHandler = (e) => {
		setMemberSearchValue(e.target.value);
	}

	usersArray.forEach(id => dataSource.push({
		key: usersSampleData[id].id + "",
		accountName:  usersSampleData[id].accountName,
		name:  usersSampleData[id].name
	}))

	useEffect(() => {
		setFilteredMembers(dataSource.filter(member => member.name.includes(memberSearchValue)));
	}, [memberSearchValue])

	const columns = [
		{
			title: 'Account ',
			dataIndex: 'accountName',
			key: 'accountName',
			render: (text) => 
				(
			  <div>
				  <p style={{color: "#3d5c98", fontWeight: 600}}>{text}</p>
				  <p style={{}}></p>
			  </div>
			  ),
			onFilter: (value, record) => record.accountName.indexOf(value) === 0,
			sorter: (a, b) =>  a.accountName.split(' ')[a.accountName.split(' ').length - 1].localeCompare(b.accountName.split(' ')[b.accountName.split(' ').length - 1]),
			sortDirections: ['descend', 'ascend'],
			width: '35%',
		  },
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
		  sorter: (a, b) =>  a.name.split(' ')[a.name.split(' ').length - 1].localeCompare(b.name.split(' ')[b.name.split(' ').length - 1]),
		  sortDirections: ['descend', 'ascend'],
		  width: '35%',
		},
		{
			title: 'Role',
			dataIndex: 'role',
			key: 'role',
			render: (text) => 
				(
				<Select
					defaultValue="read"
					style={{ width: 120 }}
					// onChange={handleChange}
					options={[
					  { value: 'write', label: 'write' },
					  { value: 'read', label: 'read' },
					  { value: 'review', label: 'review' },
					  { value: 'admin', label: 'admin'},
					  { value: 'maintain', label: 'maintain'},
					]}
				  />
			  ),
			onFilter: (value, record) => record.name.indexOf(value) === 0,
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
	return (
		<div>
			<Modal
				title={<p style={{color: 'red', fontWeight: 700}}>Are you sure remove {selectedMemberName} ?</p>}
				style={{
				top: 20,
				}}
				open={confirmModalOpen}
				onOk={() => setConfirmModalOpen(false)}
				onCancel={() => setConfirmModalOpen(false)}
				okButtonProps={{disabled: confirmRemoveButtonDisabled}}
			>
				<p style={{fontWeight: 700, marginBottom: '10px', marginTop: '15px'}}>Please type "Mike" to confirm: </p>
				<Input placeholder= {`Type ${selectedAccountName} to confirm`} onChange={(e) => {
					if(e.target.value === 'Mike') {
						setConfirmRemoveButtonDisabled(false);
					} else {
						setConfirmRemoveButtonDisabled(true);
					}
				}}/>
			</Modal>
			<div style={{display: 'flex', justifyContent: 'flex-end'}}>
				<Search
						placeholder="search by name or id"
						enterButton="Search"
						suffix={suffix}
						size="middle"
						allowClear={true}
						onChange={memberSearchHandler}
					
				/>
			</div>
			<Table dataSource={memberSearchValue === '' ? dataSource : filteredMembers} columns={columns} />			
		</div>
	)
}

const AssignmentsTab = () => {
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
				items={initialItems}
    		/>
		</div>
	)
}



const ProjectDetail = () => {

	const [starred, setStarred] = useState(false);
	const params = useParams();
	const teamId = params.teamId;
	const projectInfo = projectsSampleData[parseInt(teamId)];

	const markHandler = () => {
		setStarred(prev => !prev);
	}

	return (
		<div className={styles.projectDetail}>
			<div style={{display: 'flex',gap: '20px', alignItems: 'center', marginBottom: '30px'}}>
				<p style={{fontSize: '24px', fontWeight: 700, color: '#3d5c98'}}>{projectInfo.name}</p>
				{!starred ? <StarOutlined style={{fontSize: '21px', height: '100%'}} onClick={markHandler}/> : <StarFilled style={{fontSize: '21px', height: '100%', color: '#ebc034'}} onClick={markHandler} />}
			</div>
			<Tabs
				defaultActiveKey="1"
				items={[OverviewIcon, MembersIcon, ProjectIcon].map((Icon, i) => {
				const id = String(i + 1);
				return {
					label: (
					<span style={{display: 'flex', gap: '7px', color: '#3d5c98', fontWeight: 500}}>
						<Icon />
						{id === '1' ? 'overview' : (id === '2' ? 'members' : 'assignments')}
					</span>
					),
					key: id,
					children: id === '1' ? <OverviewTab /> : (id === '2' ? <MembersTab /> : <AssignmentsTab />)
				};
				})}
  			/>
		</div>
	);
}


const Project = (props) => {
	
	const [isLoading, setIsLoading] = useState(true);

	setTimeout(() => {
		setIsLoading(false);
	}, 1000)

	return (
		<div className={styles.project}>
			<MainLayout content={isLoading ? <Skeleton /> :  <ProjectDetail />}/>
		</div>
	)
}

export default Project;
