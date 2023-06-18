import React, {useState, useEffect} from 'react';
import { Modal, Progress, Button, DatePicker, Form, Input, Checkbox, notification} from 'antd';
import { MinusOutlined, PlusOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import EventBox from '../eventBox/EventBox';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomCalendarToolbar from '../customCalendar/CustomCalendarToolbar';
import MonthEventBox from '../monthEventBox/MonthEventBox';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const localizer = momentLocalizer(moment);

const TaskProgess = (props) => {

	const [percent, setPercent] = useState(props.percent);
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
		<div style={{
				display: 'flex',
				justifyContent: 'space-between',
				marginBottom: '20px'
			}}>
			<div>{props.taskName}</div>
			<div>
				<Progress
					type="circle"
					percent={percent}
					strokeColor={percent < 30 ? 'red' : `${percent < 60 ? 'blue' : 'green'}`}
					size="small"
					style={{
						marginRight: 8,
					}}
				/>
				<Button.Group>
					<Button onClick={decline} icon={<MinusOutlined />} />
					<Button onClick={increase} icon={<PlusOutlined />} />
				</Button.Group>
			</div>
		</div>
	)
}

const events = [
	{
		'title': 'All Day Event very long title',
		'start': new Date(2023, 5, 6, 14, 0, 0),
		'end': new Date(2023, 5, 6, 15, 0, 0),
		type:'personal'
	  },
	  {
		'title': 'Long Event',
		'start': new Date(2023, 5, 4, 8, 5,0),
		'end': new Date(2023, 5, 4, 12, 30, 0),
		type:'personal'
	  },
	
	  {
		'title': 'DTS STARTS',
		'start': new Date(2016, 2, 13, 0, 0, 0),
		'end': new Date(2016, 2, 20, 0, 0, 0)
	  },
	
	  {
		'title': 'DTS ENDS',
		'start': new Date(2016, 10, 6, 0, 0, 0),
		'end': new Date(2016, 10, 13, 0, 0, 0)
	  },
	
	  {
		'title': 'Some Event',
		'start': new Date(2015, 3, 9, 0, 0, 0),
		'end': new Date(2015, 3, 9, 0, 0, 0)
	  },
	  {
		'title': 'Conference',
		'start': new Date(2015, 3, 11),
		'end': new Date(2015, 3, 13),
		desc: 'Big conference for important people'
	  },
	  {
		'title': 'Meeting',
		'start': new Date(2015, 3, 12, 10, 30, 0, 0),
		'end': new Date(2015, 3, 12, 12, 30, 0, 0),
		desc: 'Pre-meeting meeting, to prepare for the meeting'
	  },
	  {
		'title': 'Lunch',
		'start': new Date(2015, 3, 12, 12, 0, 0, 0),
		'end': new Date(2015, 3, 12, 13, 0, 0, 0),
		desc: 'Power lunch'
	  },
	  {
		'title': 'Meeting',
		'start': new Date(2015, 3, 12, 14, 0, 0, 0),
		'end': new Date(2015, 3, 12, 15, 0, 0, 0)
	  },
	  {
		'title': 'Happy Hour',
		'start': new Date(2015, 3, 12, 17, 0, 0, 0),
		'end': new Date(2015, 3, 12, 17, 30, 0, 0),
		desc: 'Most important meal of the day'
	  },
	  {
		'title': 'Dinner',
		'start': new Date(2015, 3, 12, 20, 0, 0, 0),
		'end': new Date(2015, 3, 12, 21, 0, 0, 0)
	  },
	  {
		'title': 'Birthday Party',
		'start': new Date(2015, 3, 13, 7, 0, 0),
		'end': new Date(2015, 3, 13, 10, 30, 0)
	  },
	  {
		'title': 'Birthday Party 2',
		'start': new Date(2015, 3, 13, 7, 0, 0),
		'end': new Date(2015, 3, 13, 10, 30, 0)
	  },
	  {
		'title': 'Birthday Party 3',
		'start': new Date(2015, 3, 13, 7, 0, 0),
		'end': new Date(2015, 3, 13, 10, 30, 0)
	  },
	  {
		'title': 'Late Night Event',
		'start': new Date(2015, 3, 17, 19, 30, 0),
		'end': new Date(2015, 3, 18, 2, 0, 0)
	  },
	  {
		'title': 'Multi-day Event',
		'start': new Date(2015, 3, 20, 19, 30, 0),
		'end': new Date(2015, 3, 22, 2, 0, 0)
	  }
]


const Calendars = (props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modal2Open, setModal2Open] = useState(false);
	const [selectedDate, setSelectedDate] = useState('')
	const [selectDateTasks, setSelectedDateTasks] = useState([])
	const [date, setDate] = useState(new Date());
	const [addEventButtonDisabled, setAddEventButtonDisabled] = useState(true);

	// useEffect(() => {

	// 	window.addEventListener('storage', function (event){
			
	// 		if (event.key === 'showingMonth' || event.key === 'showingYear') {
	// 			const year = localStorage.getItem('showingYear');
	// 			const month = localStorage.getItem('showingMonth');
	// 			setDate(new Date(`${year}-${month}-1`));
	// 		}
	// 	});
	
	// }, []);

	const openSucessfullyAddNotification = () => {
		notification.open({
		  message: <div style={{display: 'flex', gap: '15px'}}>
			  			<svg width="25px" height="25px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect width="48" height="48" fill="white" fill-opacity="0.01"/>
							<path d="M24 4L29.2533 7.83204L35.7557 7.81966L37.7533 14.0077L43.0211 17.8197L41 24L43.0211 30.1803L37.7533 33.9923L35.7557 40.1803L29.2533 40.168L24 44L18.7467 40.168L12.2443 40.1803L10.2467 33.9923L4.97887 30.1803L7 24L4.97887 17.8197L10.2467 14.0077L12.2443 7.81966L18.7467 7.83204L24 4Z" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M17 24L22 29L32 19" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
			  			<p style={{color: '#2F88FF', fontWeight: 600}}>Sucessfully add an event!!</p>,
			  	   </div>,
		  description: 'This event has been added to your schedule.',
		  onClick: () => {
			console.log('Notification Clicked!');
		  },
		});
	};

	const getShowingMonthHandler = (year, month) => {
		setDate(new Date(`${year}-${month}-1`));
	}

	const showModal = () => {
	  setIsModalOpen(true);
	};
	const handleOk = () => {
	  setIsModalOpen(false);
	};
	
	const handleCancel = () => {
	  setIsModalOpen(false);
	};

	const addEventHandler = () => {
		setModal2Open(true);
	}

	return (
		<div>
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<p style={{fontSize: '25px', fontWeight: 600, color: '#3d5c98', marginBottom: '20px', letterSpacing: '1px'}}>My schedule</p>
				<div style={{right: '40px', top: '258px'}}>
					<Button type="primary" shape="circle" icon={<PlusOutlined style={{display: 'inline-flex', alignItems: 'center'}} />} size={'large'} onClick={addEventHandler} />
				</div>
			</div>
			<Modal
				title="Add more personal event: "
				style={{
					top: 80,
				}}
				labelAlign="left"
				open={modal2Open}
				onOk={() => {setModal2Open(false); openSucessfullyAddNotification()}}
				onCancel={() => setModal2Open(false)}
				okButtonProps={{disabled: addEventButtonDisabled}}
			>
				<Form
					name="basic"
					labelCol={{
					span: 7,
					}}
					wrapperCol={{
					span: 16,
					}}
					style={{
					maxWidth: 600,
					}}
					initialValues={{
					remember: true,
					}}
					autoComplete="off"
				>
					<Form.Item
					label="Time of event:   "
					name="Time of event"
					rules={[
						{
						required: true,
						message: 'Your event must have time!',
						},
					]}
					>
						<RangePicker />
					</Form.Item>

					<Form.Item
					label="Event title"
					name="event title"
					rules={[
						{
						required: true,
						message: "Please input your event's title",
						},
					]}
					>
					    <Input showCount maxLength={20} onChange={(e) => {
							if(e.target.value.length > 0) {
								setAddEventButtonDisabled(false);
							} else {
								setAddEventButtonDisabled(true);
							}
						}}/>
					</Form.Item>
					
					<Form.Item
					label="Event description"
					name="Event description"
					rules={[
						{
						required: false,
						},
					]}
					>
					       <TextArea showCount maxLength={100}  />
					</Form.Item>

					<Form.Item
					name="remember"
					valuePropName="checked"
					wrapperCol={{
						offset: 17,
						span: 16,
					}}
					>
					<Checkbox >Remember me</Checkbox>
					</Form.Item>
				</Form>
			</Modal>
			<Modal title={selectedDate} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Save">
				{selectDateTasks.map(task => { return <TaskProgess taskName={task.content} percent={task.percent}/>}) }
      		</Modal>
			{/* <Popover placement="bottom" title={'text'} content={content}>
          		<Button>Bottom</Button>
        	</Popover> */}
			<Calendar
			  	localizer={localizer}
			  	events={events}
				selectRange={true}
				date={date}
				onNavigate={date => {
					console.log(date);
				  setDate(date);
				}}
				step={60}
				value={date}
			  	startAccessor="start"
			  	endAccessor="end"
			  	style={{ height: 650 }}
				showNeighboringMonth={false}
				components={{
					week : {
						event: EventBox,
					},
					month: {
						event: MonthEventBox
					},
					toolbar: props => (<CustomCalendarToolbar {...props} getShowingMonth={getShowingMonthHandler} />),
					// toolbarProps: {getShowingMonth: getShowingMonthHandler}
				}}
				selectable={true}
				messages={{
					today: 'This Month',
					previous: <LeftOutlined style={{color: '#3d5c98'}}/>,
					next: <RightOutlined style={{color: '#3d5c98'}}/>
				}}
				label="Tung dep trai"
				showMultiDayTimes={true}
			/>,
		</div>
	)
}

export default Calendars;
