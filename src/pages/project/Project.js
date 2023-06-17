import styles from './Project.module.css';
import {useState} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import {useParams} from 'react-router-dom';
import projectsSampleData from '../../data/projects';
import { MembersIcon, ProjectIcon, OverviewIcon } from '../../data/icon';
import { StarOutlined, StarFilled, AudioOutlined } from '@ant-design/icons';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { Table, Tabs, Input, Avatar , Tooltip, Button, Modal, Skeleton } from 'antd';
import AssignmentBox from '../../components/assignmentBox/AssignmentBox';
import {BugType} from '../../data/issueTypes';
import { HighestIcon } from '../../data/priorityIcon';

const {Search} = Input;

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
const suffix = (
	<AudioOutlined
	  style={{
		fontSize: 16,
		color: '#1677ff',
	  }}
	/>
  );

const OverviewTab = () => {

	let kanbanData = [
		{ Id: 1, Status: 'Open', Summary: 'Analyze the new requirements gathered from the customer.', Type: 'Story', Priority: 'Low', Tags: 'Analyze,Customer', Estimate: 3.5, Assignee: 'Nancy Davloio', RankId: 1 },
		{ Id: 2, Status: 'InProgress', Summary: 'Fix the issues reported in the IE browser.', Type: 'Bug', Priority: 'Release Breaker', Tags: 'IE', Estimate: 2.5, Assignee: 'Janet Leverling', RankId: 2  },
		{ Id: 3, Status: 'Testing', Summary: 'Fix the issues reported by the customer.', Type: 'Bug', Priority: 'Low', Tags: 'Customer', Estimate: '3.5', Assignee: 'Steven walker', RankId: 1 },
		{ Id: 4, Status: 'Close', Summary: 'Arrange a web meeting with the customer to get the login page requirements.', Type: 'Others', Priority: 'Low', Tags: 'Meeting', Estimate: 2, Assignee: 'Michael Suyama', RankId: 1 },
		{ Id: 5, Status: 'Validate', Summary: 'Validate new requirements', Type: 'Improvement', Priority: 'Low', Tags: 'Validation', Estimate: 1.5, Assignee: 'Robert King', RankId: 1 }
	];
	const cardTemplate = (props) => {

        return (
			<div className="card-template" style={{backgroundColor: '#fff'}} >
						<div className='e-card-content' style={{padding: '1px', backgroundColor: '#fff', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
							<table className="card-template-wrap" style={{backgroundColor: '#fff'}}>
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

	return (
		<div className={styles.overviewTab}>
			{/* <div style={{}}>
				<p style={{fontSize: '20px', color: '#3d5c98', fontWeight: 700, marginBottom: '10px', marginTop: '20px'}}>Description</p>
				<p style={{marginBottom: '0'}}>This is description of this project. It's so funny. Enjoy it !!</p>
			</div> */}
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
			<p style={{fontSize: '20px', color: '#3d5c98', fontWeight: 700, marginBottom: '20px', marginTop: '20px'}}>Board</p>
			<KanbanComponent id="kanban" keyField="Status" dataSource={kanbanData} cardSettings={{ contentField: "Summary", headerField: "Id", template: cardTemplate }}>
                    <ColumnsDirective>
                    <ColumnDirective headerText="To Do" keyField="To Do" template={columnTemplate} />
                    <ColumnDirective headerText="In Progress" keyField="InProgress" template={columnTemplate}/>
                    <ColumnDirective headerText="Testing" keyField="Testing" template={columnTemplate}/>
                    <ColumnDirective headerText="Done" keyField="Done" template={columnTemplate}/>
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

	const dataSource = [
		{
		  key: '1',
		  name: 'Mike',
		  age: 32,
		  address: '10 Downing Street',
		},
		{
		  key: '2',
		  name: 'John',
		  age: 42,
		  address: '10 Downing Street',
		},
	];

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
		  sorter: (a, b) =>  a.name.split(' ')[a.name.split(' ').length - 1].localeCompare(b.name.split(' ')[b.name.split(' ').length - 1]),
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
					
				/>
			</div>
			<Table dataSource={dataSource} columns={columns} />			
		</div>
	)
}

const AssignmentsTab = () => {

	return (
		<div>
			<Tabs
				type="editable-card"
				// onChange={onChange}
				// activeKey={activeKey}
				// onEdit={onEdit}
				items={initialItems}
    		/>
		</div>
	)
}



const ProjectDetail = () => {

	const [starred, setStarred] = useState(false);
	const params = useParams();
	const projectId = params.projectId;
	const projectInfo = projectsSampleData[parseInt(projectId)];

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
					children: id === '1' ? <OverviewTab /> : (id === '2' ? <MembersTab /> : <ProjectIcon color="#3d5c98" />)
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
