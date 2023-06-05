import styles from './AssignmentDetail.module.css';
import AssignmentsDetailsTab from '../../components/assignmentDetailTab/AssignmentDetailTab';
import MainLayout from '../../components/layout/MainLayout';
import { EyeFilled, MoreOutlined, CloseOutlined, ClockCircleOutlined} from '@ant-design/icons';
import { ShareIcon } from '../../data/icon';
import { Avatar, Select, Progress, Skeleton } from 'antd';
import {useState} from 'react';
import {HighestIcon} from '../../data/priorityIcon'
const AssignmentDetail1 = () => {

	const [isHidePanel, setIsHidePanel] = useState(false);

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
						<HighestIcon />
						<p className={styles.priorityText}>Highest Priority</p>
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
