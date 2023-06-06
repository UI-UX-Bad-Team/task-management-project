import styles from './AssignmentBox.module.css';
import { Image } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Progress, notification } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const openSucessfullyAddNotification = () => {
	notification.open({
	  message: <div style={{display: 'flex', gap: '15px'}}>
					  <svg width="25px" height="25px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="48" height="48" fill="white" fill-opacity="0.01"/>
						<path d="M24 4L29.2533 7.83204L35.7557 7.81966L37.7533 14.0077L43.0211 17.8197L41 24L43.0211 30.1803L37.7533 33.9923L35.7557 40.1803L29.2533 40.168L24 44L18.7467 40.168L12.2443 40.1803L10.2467 33.9923L4.97887 30.1803L7 24L4.97887 17.8197L10.2467 14.0077L12.2443 7.81966L18.7467 7.83204L24 4Z" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M17 24L22 29L32 19" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
					  <p style={{color: '#2F88FF', fontWeight: 600}}>Sucessfully save progress!!</p>,
				 </div>,
	  description: "This assignment's progress has been saved",
	  onClick: () => {
		console.log('Notification Clicked!');
	  },
	});
};

const AssignmentBox = (props) => {
	const [percent, setPercent] = useState(localStorage.getItem(`progress${props.assignmentId}`));
	const [changed, setChanged]= useState(false);
	const navigate = useNavigate();
	const increase = () => {
		setChanged(true);
	  setPercent((prevPercent) => {
		const newPercent = prevPercent + 10;
		if (newPercent > 100) {
		  return 100;
		}
		return newPercent;
	  });

	};
	const decline = () => {
		setChanged(true);
	  	setPercent((prevPercent) => {
		const newPercent = prevPercent - 10;
		if (newPercent < 0) {
		  return 0;
		}
		return newPercent;
	  });
	};

	const processSaveHandler = () => {
		localStorage.setItem(`progress${props.assignmentId}` , percent);
		openSucessfullyAddNotification();
		setChanged(false);
	}

	return (
		<div className={styles.assignmentBox} >
			<p className={styles.assignmentDueDate}>{props.assignmentDueDate}</p>
			<div className={styles.assignmentContent}>
				<div className={styles.flex}>
					<Image
						width={60}
						src="/images/team1.jpg"
					/>
					<div>
						<div className={styles.assignmentTitle} onClick={() => {
							navigate(`assignments/${props.assignmentId}`);
						}}>{props.assignmentTitle}</div>
						<p className={styles.assignmentDueTime}>{props.assignmentDueTime}</p>
						<p className={styles.assignmentTeam}>{props.assignmentTeam}</p>
					</div>
				</div>
				<div>
					<Progress
						type="circle"
						percent={percent}
						style={{
							marginRight: 8,
						}}
						strokeColor={percent < 30 ? 'red' : `${percent < 60 ? 'blue' : 'green'}`}
						size="small"

					/>
					<Button.Group>
						<Button onClick={decline} icon={<MinusOutlined />} />
						<Button onClick={increase} icon={<PlusOutlined />} />
						<Button type={changed ? 'primary' : ''} onClick={processSaveHandler}>Save</Button>
					</Button.Group>
				</div>

			</div>
		</div>
	)
}

export default AssignmentBox;
