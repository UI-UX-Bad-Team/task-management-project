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
