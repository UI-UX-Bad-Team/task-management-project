import styles from './AssignmentBox.module.css';
import { Image } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Progress } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';

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
