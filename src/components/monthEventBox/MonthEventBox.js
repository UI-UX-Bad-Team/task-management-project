import { useState, useEffect, useRef } from 'react';
import styles from './MonthEventBox.module.css';
import {Modal, Button, notification, Avatar, DatePicker,Select, Input, Progress, Rate} from 'antd';
import { HighestIcon , CriticalIcon, HighIcon, LowIcon, LowestIcon} from '../../data/priorityIcon';
import lottie from 'lottie-web';
import { useNavigate } from "react-router";
import { MinusOutlined, PlusOutlined, FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';

const customIcons = {
	1: <FrownOutlined />,
	2: <FrownOutlined />,
	3: <MehOutlined />,
	4: <SmileOutlined />,
	5: <SmileOutlined />,
  };

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const IssueTypeSelect = () => {
	const handleChange = () => {

	}

	return (
		<Select
			defaultValue="bug"
			style={{ width: 120 }}
			onChange={handleChange}
			options={[
				{ value: 'bug', label: 'bug' },
				{ value: 'new feature', label: 'new feature' },
				{ value: 'improvement', label: 'improvement' },
				{ value: 'test', label: 'test', disabled: true },
			]}
    	/>
	)
}

const PriorityTypeSelect = () => {
	const handleChange = () => {

	}

	return (
		<Select
			defaultValue="critical"
			style={{ width: 120 }}
			onChange={handleChange}
			options={[
				{ value: 'highest', label: 'highest' },
				{ value: 'high', label: 'high' },
				{ value: 'critical', label: 'critical' },
				{ value: 'low', label: 'low'},
				{ value: 'lowest', label: 'lowest'},
			]}
    	/>
	)
}

const ReporterSelect = () => {

	const handleChange = () => {

	}
	return (
		<Select
			mode="multiple"
			allowClear
			style={{
				width: '100%',
			}}
			placeholder="Please select"
			defaultValue={['TungBD']}
			onChange={handleChange}
			options={[
				{ value: 'TungBD', label: 'Bui Danh Tung' },
				{ value: 'NguyenHD', label: 'Dao Trong Hoan' },
				{ value: 'TienTD', label: 'Ta Duc Tien' },
				{ value: 'HuyDt', label: 'Dinh Trong Huy'},
			]}
    	/>
	)
}



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

const MonthEventBox = (props) => {
	const navigate = useNavigate();
	const [showDetail, setShowDetail] = useState(false);
	const [isEditting, setIsEditting] = useState(false);
	const [personalBackgroundColor, setPersonalBackgroundColor] = useState(localStorage.getItem('personalBackgroundColor') || 'b1c2e3');
	const [personalTextColor, setPersonalTextColor] = useState(localStorage.getItem('personalTextColor') || '3d5c98');
	const [teamBackgroundColor, setTeamBackgroundColor] = useState(localStorage.getItem('teamBackgroundColor') || 'b1c2e3');
	const [teamTextColor, setTeamTextColor] = useState(localStorage.getItem('teamTextColor') || '3d5c98');
	const [personalTimeboxColor, setPersonalTimeboxColor] = useState(localStorage.getItem('personalTimeboxColor') || '63337a');
	const [teamTimeboxColor, setTeamTimeboxColor] = useState(localStorage.getItem('teamTimeboxColor') || '63337a');
	const [percent, setPercent] = useState(0);
	const currentDate = new Date();
	let comparedDate = 0;

	if (props.event.start > currentDate) {
		comparedDate = 1;
	} else if (props.event.end < currentDate) {
		comparedDate = -1;
	} else {
		comparedDate = 0;
	}



	useEffect(() => {
		window.addEventListener('storage', (event) => {
			setPersonalBackgroundColor(localStorage.getItem('personalBackgroundColor'));
			setTeamBackgroundColor(localStorage.getItem('teamBackgroundColor'))
			setPersonalTextColor(localStorage.getItem('personalTextColor'));
			setTeamTextColor(localStorage.getItem('teamTextColor'));
			setPersonalTimeboxColor(localStorage.getItem('personalTimeboxColor'));
			setTeamTimeboxColor(localStorage.getItem('teamTimeboxColor'));
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
		  },
		  onCancel: () => {
			setIsModalOpen(false);
			openSucessfullyAddNotification();
		  },
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
	  setIsEditting(false);
	};

	const showDetailHandler = () => {
		showModal();
	}

	const showEventDetailHandler = () => {
		setShowDetail(true);
	}

	const hideEventDetailHandler = () => {
		setShowDetail(false);
	}

	const editEventBoxHandler = () => {
		setIsEditting(true);
	}

	const saveEventBoxHandler = () => {
		setIsEditting(false);
		openSucessfullyAddNotification();
		//save
	}
	const container = useRef(null);

	useEffect(() => {
		const instance = lottie.loadAnimation({
		  container: container.current,
		  animationData: require('../../data/lottie/bug.json'),
		  renderer: 'svg', // Use 'svg' or 'canvas' as per your preference
		  loop: true,
		  autoplay: true,
		});
		return () => instance.destroy();
	  }, [showDetail]);

	  const increase = () => {
		setPercent((prevPercent) => {
		  const newPercent = prevPercent + 10;
		  if (newPercent > 100) {
			return 100;
		  }
		  return newPercent;
		});
	  };
	  const decline = () => {
		setPercent((prevPercent) => {
		  const newPercent = prevPercent - 10;
		  if (newPercent < 0) {
			return 0;
		  }
		  return newPercent;
		});
	  };
	return (
		<div className={styles.monthEventBox} onMouseEnter={showEventDetailHandler} onMouseLeave={hideEventDetailHandler} >
			<Modal title={`${props.title}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[
				<Button danger onClick={warning}>
					Remove
			  	</Button>,
				( !isEditting ?
					<Button onClick={editEventBoxHandler}>
						Edit
					</Button> : 
					<Button onClick={saveEventBoxHandler}>
						Save
					</Button>
				),
				<Button onClick={() => {navigate('/my-assignments/assignments/0')}}>
					Detail
			  	</Button>,
			]}>	
				{ props.event.type === 'collaborative' ?
				<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', marginTop: '10px'}}>
					<div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
						<p style={{fontSize: '14px', fontWeight: 700, color: '#3d5c98'}}>Team : </p>
						<p style={{fontSize: '14px', fontWeight: 600, color: '#555'}}>{props.event.teamName}</p>
					</div>
				</div> : ""
				}	
				<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', marginTop: '10px'}}>
					<div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
						<p style={{fontSize: '14px', fontWeight: 700, color: '#3d5c98'}}>Time:</p>
						{isEditting ? <RangePicker format="YYYY-MM-DD HH:mm:ss" /> :
						<div style={{fontSize: '12px', fontWeight: 600, color: '#fff', backgroundColor: '#3d5c98', padding: '3px 5px', borderRadius: '50px'}}>{props.event.start.getHours() + ':' + props.event.start.getMinutes()} - {props.event.end.getHours() + ':' + props.event.end.getMinutes()}</div>}
					</div>
					{comparedDate === -1 && props.event.type === 'personal' && !isEditting ? <Rate defaultValue={3} character={({ index }) => customIcons[index + 1]} /> : ""}
				</div>
				{props.event.type === 'collaborative' ?<div style={{display: 'flex', gap: '5px', marginBottom: '20px'}}>
					<p style={{fontSize: '14px', fontWeight: 700, color: '#3d5c98'}}>Type:</p>
					{!isEditting ? 
					<div style={{display: 'flex', gap: '5px'}}>
						<p style={{fontSize: '14px', fontWeight: 600, color: '#000'}}>Bug</p>
						<BugType />
					</div>
					: <IssueTypeSelect />}
				</div> : ''}
				<div style={{display: 'flex', gap: '5px', marginBottom: '20px'}}>
					<p style={{fontSize: '14px', fontWeight: 700, color: '#3d5c98'}}>Priority:</p>
					{!isEditting ? 
					<div style={{display: 'flex', gap: '5px'}}>
						<p style={{fontSize: '14px', fontWeight: 600, color: '#000'}}>{props.event.priority}</p>
						{props.event.priority === 'highest' ? <HighestIcon /> : (props.event.priority === 'high' ? <HighIcon /> : (props.event.priority === 'critical' ? <CriticalIcon /> : (props.event.priority === 'low' ? <LowIcon /> : <LowestIcon />)))}
					</div> : <PriorityTypeSelect />
					}
				</div>
				<div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
					<p style={{fontSize: '14px', fontWeight: 700, color: '#3d5c98'}}>Description:</p>
					{!isEditting ? <div style={{display: 'flex', gap: '5px'}}>
						<p style={{fontSize: '14px', fontWeight: 600, color: '#555'}}>{props.event.description}</p>
					</div> : <TextArea showCount maxLength={100} defaultValue={props.event.description}/>}
				</div>
				<div style={{display: 'flex', gap: '5px', marginBottom: '20px', marginTop: '30px'}}>
					<p style={{fontSize: '14px', fontWeight: 600, color: '#3d5c98'}}>Progress:</p>
					<Progress percent={percent} />
					{isEditting ? 
					<Button.Group>
						<Button onClick={decline} icon={<MinusOutlined />} />
						<Button onClick={increase} icon={<PlusOutlined />} />
					</Button.Group>
					: ''}
				</div>
				{props.event.type === 'collaborative' ? <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
					<p style={{fontSize: '14px', fontWeight: 700, color: '#3d5c98'}}>Reported by:</p>
					{!isEditting ? <div style={{display: 'flex', gap: '5px'}}>
						{/* <p style={{fontSize: '14px', fontWeight: 600, color: '#555'}}>tung</p> */}
						<Avatar src='/images/avatar1.jpg' size={28}/>
					</div> : <ReporterSelect />}
				</div> : ''}
			</Modal>
			<div className={styles.eventBox} onClick={showDetailHandler} style={{backgroundColor: comparedDate === 1 ? `#${props.event.type === 'personal' ? personalBackgroundColor : teamBackgroundColor}` : (comparedDate === -1 ? "#ccc" : "#8bc9a5")}}>
				<div className={styles.timeBox} style={{backgroundColor:  comparedDate === 1 ? `#${props.event.type === 'personal' ? personalTimeboxColor : teamTimeboxColor}` : (comparedDate === -1 ? '#555' : '#17783f')}}>{props.event.start.getHours() + ':' + props.event.start.getMinutes()} - {props.event.end.getHours() + ':' + props.event.end.getMinutes()}</div>
				<div className={styles.eventContent} style={{color: comparedDate === 1 ? `#${props.event.type === 'personal' ? personalTextColor : teamTextColor}` : (comparedDate === -1 ? "#222" : "#173d1d")}}>{props.title}</div>
			</div>
			{showDetail && props.event.type === 'collaborative' ? <div className={styles.eventDetail} >
				<div style={{display: 'flex', gap: '3px'}}>
					<BugType width={20} height={20} />
					{/* <HighestIcon /> */}
					<div className="bug-lottie-container" ref={container} style={{ width: '22px', height: '22px' }}></div>
				</div>
				<div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '3px'}}>
					<Avatar.Group>
						<Avatar src='/images/avatar1.jpg' size={26}/>
						<Avatar src='/images/avatar2.jpg' size={26}/>
						<Avatar src='/images/avatar3.jpg' size={26}/>
					</Avatar.Group>
				</div>
			</div> : ''}
		</div>
	);
}

export default MonthEventBox;