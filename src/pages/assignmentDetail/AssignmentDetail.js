import styles from './AssignmentDetail.module.css';
import AssignmentsDetailsTab from '../../components/assignmentDetailTab/AssignmentDetailTab';
import MainLayout from '../../components/layout/MainLayout';
import { EyeFilled, MoreOutlined, CloseOutlined, ClockCircleOutlined, MinusCircleFilled,CheckCircleFilled } from '@ant-design/icons';
import { ShareIcon } from '../../data/icon';
import { Avatar, Select, Progress, Skeleton, Button, Dropdown } from 'antd';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import { HighestIcon , CriticalIcon, HighIcon, LowIcon, LowestIcon} from '../../data/priorityIcon';
import {BugType, ImprovementType, NewFeatureType, SubtaskType, StoryType} from '../../data/issueTypes';

let db = [
	{ Id: 'Task 1', Title:"New requirements gathered from the customer", Status: 'Open', Summary: 'Analyze the new requirements gathered from the customer.', Type: 'Story', Priority: 'Low', Tags: 'Analyze,Customer', Estimate: 3.5, Assignee: 'Bui Danh Tung',Reviewer:"Mac Van Khanh", Cc:"Dinh Trong Huy", RankId: 1 },
	{ Id: 'Task 2', Title:"Fix IE browser's issues", Status: 'InProgress', Summary: 'Fix the issues reported in the IE browser.', Type: 'Bug', Priority: 'Critical', Tags: 'IE', Estimate: 2.5, Assignee: 'Dinh Trong Huy',Reviewer:"Ta Duc Tien",Cc:"Dao Trong Hoan", RankId: 2  },
	{ Id: 'Task 3', Title:"Fix customer reporting issues",Status: 'Testing', Summary: 'Fix the issues reported by the customer.', Type: 'Bug', Priority: 'High', Tags: 'Customer', Estimate: '3.5', Assignee: 'Bui Danh Tung',Reviewer:"Mac Van Khanh",Cc:"Nguyen Duy Hung", RankId: 1 },
	{ Id: 'Task 4', Title:"Arrange a web meeting", Status: 'Done', Summary: 'Arrange a web meeting with the customer to get the login page requirements.', Type: 'NewFeature', Priority: 'Low', Tags: 'Meeting', Estimate: 2, Assignee: 'Dinh Trong Huy',Reviewer: "Ta Duc Tien",Cc:"Bui Danh Tung", RankId: 1 },
	{ Id: 'Task 5', Title:"Validate new requirements", Status: 'Testing', Summary: 'Validate new requirements', Type: 'Improvement', Priority: 'Critical', Tags: 'Validation', Estimate: 1.5, Assignee: 'Bui Danh Tung',Reviewer:"Pham Trung Dung",Cc:"Vu Minh Dang", RankId: 1 },
	{ Id: 'Task 6', Title:"Testing I18n translator new feature", Status: 'Testing', Summary: 'We developed I18n new translator feature for advertisement page. Please test to confirm it work properly!', Type: 'Improvement', Priority: 'Critical', Tags: 'Test', Estimate: 1.5, Assignee: 'Dao Trong Hoan',Reviewer:"Ta Duc Tien",Cc:"Dinh Trong Huy", RankId: 1 },
];

const mergeItems = [
	{
	  key: '1',
	  label: (
		<a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
		  1st menu item
		</a>
	  ),
	},
	{
	  key: '2',
	  label: (
		<a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
		  2nd menu item
		</a>
	  ),
	},
	{
	  key: '3',
	  label: (
		<a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
		  3rd menu item
		</a>
	  ),
	},
  ];
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

const AssignmentDetail1 = () => {

	const [isHidePanel, setIsHidePanel] = useState(false);
	const params = useParams();
	const assignmentId = parseInt(params.assignmentId);
	const selectedAssignment = db[assignmentId-1]
	const [requestChange, setRequestChange] = useState(false);
	const [approved, setApproved] = useState(false);


	const hidePanelHandler = () => {
		setIsHidePanel(true);
	}

	const showPanelHandler = () => {
		setIsHidePanel(false);
	}

	return (
		<div className={styles.assignmentDetail1}>
			<div style={{width: isHidePanel ? '100%' : '65%'}}>
			 	<AssignmentsDetailsTab showPanel={showPanelHandler}/>
			</div>
			<div style={{marginTop: '30px',padding: '15px',height: '80vh', width: '34%', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', display: isHidePanel ? 'none' : 'flex', transition: 'display 2s ease', flexDirection: 'column', justifyContent: 'space-between'}}>
				<div>
					<div style={{display: 'flex', justifyContent: 'space-between',gap: '15px', alignItems: 'center', marginBottom : '25px'}}>
						<p style={{fontSize: '14px', fontWeight: 600, color: '#555'}}>Give Feedback</p>
						<div className={styles.viewNum}>
							<EyeFilled />
							<p style={{fontSize: '14px', fontWeight: 600, color: '#3d5c98'}}>2</p>
						</div>
						<div style={{display:'flex', gap: '14px', alignItems: 'center'}}>
							<ShareIcon />
							<MoreOutlined style={{fontSize: '20px', fontWeight: 700, transform: 'rotate(90deg)'}}/>
							<CloseOutlined onClick={() => {hidePanelHandler()}}/>
						</div>
					</div>
					<div style={{marginBottom: '10px'}}>
						<Button size={"medium"} icon={<MinusCircleFilled />} style={{ background: !requestChange ? "#b1bd5b" : '#3d5c98', color: !requestChange ? '#1e2a59' : '#fff', fontWeight: 600}} onClick={() => {setRequestChange(true)}}> {!requestChange ?  'Request change' : 'Requested change'}</Button>
						<Button size={"medium"} icon={<CheckCircleFilled />} style={{ background: !approved ? "#ccc" : '#3d5c98', color: !approved ? '#1e2a59' : '#fff', fontWeight: 600}} onClick={() => {setApproved(prev => !prev)}}>{!approved ? 'Approve' : 'Unapprove'}</Button>
						
					</div>
					<p style={{fontSize: '14px', color: '#777', fontWeight: 600, marginBottom: '15px'}}>STATUS</p>
					<Select
						showSearch
						style={{
						width: 200,
						}}
						placeholder="Search to Select"
						optionFilterProp="children"
						filterOption={(input, option) => (option?.label ?? '').includes(input)}
						filterSort={(optionA, optionB) =>
						(optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
						}
						options={[
						{
							value: '1',
							label: 'Not Identified',
						},
						{
							value: '2',
							label: 'Closed',
						},
						{
							value: '3',
							label: 'Communicated',
						},
						{
							value: '4',
							label: 'Identified',
						},
						{
							value: '5',
							label: 'Resolved',
						},
						{
							value: '6',
							label: 'Cancelled',
						},
						]}
					/>
					<p style={{fontSize: '14px', color: '#777', fontWeight: 600, marginBottom: '10px', marginTop: '20px'}}>REPORTER: </p>
					<div className={styles.reporter}>
						<Avatar size={26} src='/images/avatar2.jpg'/>
						<p className={styles.reporterName}>Bui Danh Tung</p>
					</div>
					<p style={{fontSize: '14px', color: '#777', fontWeight: 600, marginBottom: '10px', marginTop: '20px'}}>STORY POINTS: </p>
					<p style={{fontSize: '13px', color: '#999', fontWeight: 500, marginBottom: '15px'}}>None</p>
					<p style={{fontSize: '14px', color: '#777', fontWeight: 600, marginBottom: '10px', marginTop: '20px'}}>TIME TRACKING: </p>
					<div className={styles.timeTracking}>
						<ClockCircleOutlined style={{fontSize: '30px'}}/>
						<div className={styles.timeLeftPercentage}>
							<Progress percent={90} />
							<p style={{}}>4d 3h 30m left</p>
						</div>
					</div>
					<p style={{fontSize: '14px', color: '#777', fontWeight: 600, marginBottom: '10px', marginTop: '20px'}}>PRIORITY: </p>
					<div className={styles.priority}>
						{priorityIcon[selectedAssignment.Priority]}
						<p className={styles.priorityText}>{selectedAssignment.Priority} Priority</p>
					</div>
				</div>
				<div className={styles.createdTime}>
						<p style={{fontSize: '12px', fontWeight: 600, color: '#777'}}>Created August 21, 2017, 1:13 PM</p>
						<p style={{fontSize: '12px', fontWeight: 600, color: '#777'}}>Updated 32 minutes ago</p>
				</div>
			</div>
		</div>
	)
} 


const AssignmentDetail = () => {
	const [isLoading, setIsLoading] = useState(true);

	setTimeout(() => {
		setIsLoading(false);
	}, 1000)

	return (
		<div>
			<MainLayout content={isLoading ? <Skeleton /> : <AssignmentDetail1 />}/>
		</div>
	)
}

export default AssignmentDetail;
