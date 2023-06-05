
import styles from './EventBox.module.css';
import {useState} from 'react';
import {Modal,Button} from 'antd';

const EventBox = (props) => {

	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
	  setIsModalOpen(true);
	};
  
	const handleOk = () => {
	  setIsModalOpen(false);
	};
  
	const handleCancel = () => {
	  setIsModalOpen(false);
	};

	const showDetailHandler = () => {
		showModal();
	}
	return (
		<div>
			<Modal title={`${props.title}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[
				<Button danger onClick={handleCancel}>
					Remove
			  	</Button>
			]}>
				<p>Time: {props.event.start.getHours() + ':' + props.event.start.getMinutes()} - {props.event.end.getHours() + ':' + props.event.end.getMinutes()}</p>
			</Modal>
			<div className={styles.eventBox} onClick={showDetailHandler}>
				<div className={styles.timeBox}>{props.event.start.getHours() + ':' + props.event.start.getMinutes()} - {props.event.end.getHours() + ':' + props.event.end.getMinutes()}</div>
				<div className={styles.eventContent}>{props.title}</div>
			</div>
		</div>
	)
}

export default EventBox;
