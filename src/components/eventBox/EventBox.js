
import styles from './EventBox.module.css';
import {useState, useEffect} from 'react';
import {Modal,Button,notification, Avatar} from 'antd';
import { HighestIcon } from '../../data/priorityIcon';

const BugType = () => {

	return (
		<svg width="20" height="20" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M104 8H24C15.1634 8 8 15.1634 8 24V104C8 112.837 15.1634 120 24 120H104C112.837 120 120 112.837 120 104V24C120 15.1634 112.837 8 104 8Z" fill="#E5493A"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M92 64C92 79.4653 79.4653 92 64 92C48.5347 92 36 79.4653 36 64C36 48.5347 48.5347 36 64 36C79.4653 36 92 48.5347 92 64Z" fill="white"/>
		</svg>
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
					  <p style={{color: '#2F88FF', fontWeight: 600}}>Sucessfully remove !!</p>,
				 </div>,
	  description: "The event has been remove sucessfully",
	  onClick: () => {
		console.log('Notification Clicked!');
	  },
	});
};

const EventBox = (props) => {
	const [personalBackgroundColor, setPersonalBackgroundColor] = useState(localStorage.getItem('personalBackgroundColor') || 'b1c2e3');
	const [personalTextColor, setPersonalTextColor] = useState(localStorage.getItem('personalTextColor')  || '3d5c98');
	const [teamBackgroundColor, setTeamBackgroundColor] = useState(localStorage.getItem('teamBackgroundColor'));
	const [teamTextColor, setTeamTextColor] = useState(localStorage.getItem('teamTextColor'));
	const [personalTimeboxColor, setPersonalTimeboxColor] = useState(localStorage.getItem('personalTimeboxColor') || '63337a');
	const [teamTimeboxColor, setTeamTimeboxColor] = useState(localStorage.getItem('teamTimeboxColor'));

	const [teamColor, setTeamColor] = useState('1677FF');

	useEffect(() => {

		  window.addEventListener('storage', function (event){

				setPersonalBackgroundColor(localStorage.getItem('personalBackgroundColor'));
				setPersonalTextColor(localStorage.getItem('personalTextColor'));
				setPersonalTimeboxColor(localStorage.getItem('personalTimeboxColor'));
		  });
	  
	  }, []);

	const warning = () => {
		Modal.warning({
		  title: 'Are you sure to remove this event ? ',
		  content: '',
		  okText: 'Remove',
		  onOk: () => {
			setIsModalOpen(false);
			openSucessfullyAddNotification();
		  }
		});
	  };
	
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

	const editEventBoxHandler = () => {

	}
	
	return (
		<div className={styles.eventBoxContainer}>
			<Modal title={`${props.title}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[
				<Button danger onClick={warning}>
					Remove
			  	</Button>,
				<Button onClick={editEventBoxHandler}>
				  Edit
				</Button>
			]}>
				<div style={{display: 'flex', gap: '5px', marginBottom: '20px', alignItems: 'center'}}>
					<p style={{fontSize: '14px', fontWeight: 600, color: '#3d5c98'}}>Time:</p>
					<div style={{fontSize: '12px', fontWeight: 600, color: '#fff', backgroundColor: '#3d5c98', padding: '3px 5px', borderRadius: '50px'}}>{props.event.start.getHours() + ':' + props.event.start.getMinutes()} - {props.event.end.getHours() + ':' + props.event.end.getMinutes()}</div>
				</div>
				<div style={{display: 'flex', gap: '5px', marginBottom: '20px'}}>
					<p style={{fontSize: '14px', fontWeight: 600, color: '#3d5c98'}}>Type:</p>
					<p style={{fontSize: '14px', fontWeight: 600, color: '#000'}}>Bug</p>
					<BugType />
				</div>
				<div style={{display: 'flex', gap: '5px', marginBottom: '20px'}}>
					<p style={{fontSize: '14px', fontWeight: 600, color: '#3d5c98'}}>Priority:</p>
					<p style={{fontSize: '14px', fontWeight: 600, color: '#000'}}>Highest</p>
					<HighestIcon />
				</div>
				<div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
					<p style={{fontSize: '14px', fontWeight: 600, color: '#3d5c98'}}>Reported by:</p>
					<p style={{fontSize: '14px', fontWeight: 600, color: '#555'}}>tung</p>
					<Avatar src='/images/avatar1.jpg' size={28}/>
				</div>
			</Modal>
			<div className={styles.eventBox} onClick={showDetailHandler} style={{backgroundColor: `#${personalBackgroundColor}`}}>
				<div className={styles.timeBox} style={{backgroundColor: `#${personalTimeboxColor}`}}>{props.event.start.getHours() + ':' + props.event.start.getMinutes()} - {props.event.end.getHours() + ':' + props.event.end.getMinutes()}</div>
				<div className={styles.eventContent} style={{color: `#${personalTextColor}`}}>{props.title}</div>
			</div>
		</div>
	)
}

export default EventBox;
