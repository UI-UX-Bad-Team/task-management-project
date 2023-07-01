import styles from './Assignments.module.css';
import MainLayout from '../../components/layout/MainLayout';
import { Tabs } from 'antd';
import { useRef, useState } from 'react';
import AssignmentBox from '../../components/assignmentBox/AssignmentBox';
import { Progress, Space , Skeleton} from 'antd';
import StackedColumnChart from '../../components/stackedColumnChart/StackColumnChart';

const initialItems = [
	{
		label: 'Upcomming',
		children: [
					// {id: 0, assignmentDueDate: 'Jun 1st Thurs Day', assignmentTitle: 'Powerpoint submiting', assignmentDueTime: '6:45 AM', assignmentTeam: 'Frontend developer'},
					// {id: 1, assignmentDueDate: 'Jun 1st Thurs Day', assignmentTitle: 'Powerpoint submiting', assignmentDueTime: '6:45 AM', assignmentTeam: 'Frontend developer'},
					// {id: 2, assignmentDueDate: 'Jun 1st Thurs Day', assignmentTitle: 'Powerpoint submiting', assignmentDueTime: '6:45 AM', assignmentTeam: 'Frontend developer'},
					// {id: 3, assignmentDueDate: 'Jun 1st Thurs Day', assignmentTitle: 'Powerpoint submiting', assignmentDueTime: '6:45 AM', assignmentTeam: 'Frontend developer'},
					{ Id: 'Task 1', Title:"New requirements gathered from the customer", Status: 'Open', Summary: 'Analyze the new requirements gathered from the customer.', Type: 'Story', Priority: 'Low', Tags: 'Analyze,Customer', Estimate: 3.5, Assignee: 'Bui Danh Tung',Reviewer:"Mac Van Khanh", Cc:"Dinh Trong Huy", RankId: 1, assignmentTeam: 'Frontend developer' },
					{ Id: 'Task 2', Title:"Fix IE browser's issues", Status: 'InProgress', Summary: 'Fix the issues reported in the IE browser.', Type: 'Bug', Priority: 'Critical', Tags: 'IE', Estimate: 2.5, Assignee: 'Dinh Trong Huy',Reviewer:"Ta Duc Tien",Cc:"Dao Trong Hoan", RankId: 2, assignmentTeam: 'Frontend developer'  },
					{ Id: 'Task 3', Title:"Fix customer reporting issues",Status: 'Testing', Summary: 'Fix the issues reported by the customer.', Type: 'Bug', Priority: 'High', Tags: 'Customer', Estimate: '3.5', Assignee: 'Bui Danh Tung',Reviewer:"Mac Van Khanh",Cc:"Nguyen Duy Hung", RankId: 1, assignmentTeam: 'Frontend developer' },
					{ Id: 'Task 4', Title:"Arrange a web meeting", Status: 'Done', Summary: 'Arrange a web meeting with the customer to get the login page requirements.', Type: 'NewFeature', Priority: 'Low', Tags: 'Meeting', Estimate: 2, Assignee: 'Dinh Trong Huy',Reviewer: "Ta Duc Tien",Cc:"Bui Danh Tung", RankId: 1, assignmentTeam: 'Frontend developer' },
					{ Id: 'Task 5', Title:"Validate new requirements", Status: 'Testing', Summary: 'Validate new requirements', Type: 'Improvement', Priority: 'Critical', Tags: 'Validation', Estimate: 1.5, Assignee: 'Bui Danh Tung',Reviewer:"Pham Trung Dung",Cc:"Vu Minh Dang", RankId: 1, assignmentTeam: 'Frontend developer' },
					{ Id: 'Task 6', Title:"Testing I18n translator new feature", Status: 'Testing', Summary: 'We developed I18n new translator feature for advertisement page. Please test to confirm it work properly!', Type: 'Improvement', Priority: 'Critical', Tags: 'Test', Estimate: 1.5, Assignee: 'Dao Trong Hoan',Reviewer:"Ta Duc Tien",Cc:"Dinh Trong Huy", RankId: 1, assignmentTeam: 'Frontend developer' },
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
  
const AssignmentsTable = () => {
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
		<div onClick={() => {
			console.log("run")
		}}>
			<div style={{display: 'flex', gap: '8vw', flexDirection: 'row', alignItems: 'center', marginBottom: '20px', paddingTop: '30px', backgroundColor: 'rgba(20, 115, 134, 0.04)', borderRadius: '10px'}}>
					
				<StackedColumnChart height={500} />
				<div >
					<Space wrap size={[40, 50]} style={{marginBottom: '30px', width: '100%', justifyContent: 'center'}}>
						<div>
							<Progress 
								type="circle" 
								percent={25} 
								format={(percentage) => `${percentage}%`}
								size={110}
							/>
							<p style={{color: '#0390fc', fontWeight: 700, textAlign: 'center', marginTop: '10px'}}>Upcomming</p>
						</div>
						<div>
							<Progress 
								type="circle" 
								percent={5} 
								format={(percentage) => `${percentage}%`}
								strokeColor='#b80404'
								size={110}
							/>
							<p style={{color: '#b80404', fontWeight: 700, textAlign: 'center',  marginTop: '10px'}}>Past due</p>
						</div>
						<div>
							<Progress 
								type="circle" 
								percent={70} 
								format={(percentage) => `${percentage}%`}
								strokeColor="green"
								size={110}
							/>
							<p style={{color: '#19a30f', fontWeight: 700, textAlign: 'center',  marginTop: '10px'}}>Completed</p>
						</div>
					</Space>
				</div>
			</div>
			<p style={{fontSize: '28px', fontWeight: 700, color: '#3d5c98', marginBottom: '20px'}}>Assignments List</p>
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


const Assignments = () => {
	const [isLoading, setIsLoading] = useState(true);

	setTimeout(() => {
		setIsLoading(false);
	}, 1000)
	return (
		<div className={styles.assignment}>
			<MainLayout content={isLoading ? <Skeleton /> : <AssignmentsTable />}/>
		</div>
	)
}

export default Assignments;
