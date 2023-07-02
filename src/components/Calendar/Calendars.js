import React, {useState, useRef, useCallback, useMemo} from 'react';
import { Modal, Progress, Button, DatePicker, Form, Input, Checkbox, notification, Select} from 'antd';
import { MinusOutlined, PlusOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import EventBox from '../eventBox/EventBox';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomCalendarToolbar from '../customCalendar/CustomCalendarToolbar';
import MonthEventBox from '../monthEventBox/MonthEventBox';
import events from '../../resources/events';
import dayjs from 'dayjs';
import PropTypes from 'prop-types'
import Joyride, {STATUS} from 'react-joyride';

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


const Calendars = (props) => {

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modal2Open, setModal2Open] = useState(false);
	const [selectedDate, setSelectedDate] = useState('')
	const [selectDateTasks, setSelectedDateTasks] = useState([])
	const [date, setDate] = useState(new Date());
	const [addEventButtonDisabled, setAddEventButtonDisabled] = useState(true);
	const  addEventFormRef = useRef(null);
	const [myEvents, setEvents] = useState(events)
	const [scrollStart, setScrollStart] = useState(null);
	const [scrollEnd, setScrollEnd] = useState(null);
	const [scrolled, setScrolled] = useState(false);
	const [overLap, setOverLap] = useState(true);
	const [{run, steps}, setState] = useState({
		run: true,
		steps: [
			{
				content: <h2>Welcome to taskiller !! Let's go to kill all task</h2>,
				locale: {
					skip: <strong>SKIP</strong>
				},
				placement: "center",
				target: "body"
			},
			{
				content: <h2>You can select month and see this month calendar!!</h2>,
				placement: "bottom",
				target: "#step-1",
				title: 'Switch month'
			},
			{
				content: <h2>Click button and switch view type here!</h2>,
				placement: "bottom",
				target: "#step-2",
				title: 'Switch view type'
			},
			{
				content: <h2>Click this button and add your personal event</h2>,
				placement: "bottom",
				target: "#step-3",
				title: 'Add personal event'
			},
			{
				content: <h2>You also customize your event box color here !!</h2>,
				placement: "bottom",
				target: "#step-4",
				title: 'Customize eventbox color'
			},
			{
				content: <h2>You can switch event overlaped or not</h2>,
				placement: "bottom",
				target: "#step-5",
				title: 'Switch overlap state'
			}
		]
	})

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
	
	const handleOk = () => {
	  setIsModalOpen(false);
	};
	
	const handleCancel = () => {
	  setIsModalOpen(false);
	};

	const openAdModaldEventHandler = () => {
		setModal2Open(true);
	}

	const addEventHandler = () => {
		setModal2Open(false); 
		openSucessfullyAddNotification()
		const formValue = addEventFormRef.current.getFieldsValue();
		console.log(formValue);
		const title = formValue.eventTitle;
		const description = formValue.eventDescription;
		const priority = formValue.eventPriority;
		const start = scrolled ? scrollStart : formValue.eventTime[0]['$d'];
		const end = scrolled ? scrollEnd : formValue.eventTime[1]['$d'];
		setScrolled(false);

		setEvents((prev) => [...prev, { start, end, title, description, priority }])
	}

	const handleSelectSlot = useCallback(

		({ start, end }) => {
		  setScrolled(true);
		  setModal2Open(true);
		  setScrollStart(start);
		  setScrollEnd(end);
		},
		[setEvents]
	  )
	
	  const { defaultDate, scrollToTime } = useMemo(
		() => ({
		  defaultDate: new Date(),
		  scrollToTime: new Date(1970, 1, 1, 6),
		}),
		[]
	  )

	 const toggleOverLapHandler = () => {
		setOverLap(state => !state);
	 }
	return (
		<div
		>
			<Joyride 
				continuous
				callback={() => {}}
				run={run}
				steps={steps}
				hideCloseButton
				scrollToFirstStep
				showSkipButton
				showProgress
			/>
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<p style={{fontSize: '25px', fontWeight: 600, color: '#3d5c98', marginBottom: '20px', letterSpacing: '1px'}}>My schedule</p>
				<div style={{right: '40px', top: '258px'}} id="step-3">
					<Button type="primary" shape="circle" icon={<PlusOutlined style={{display: 'inline-flex', alignItems: 'center'}} />} size={'large'} onClick={openAdModaldEventHandler} />
				</div>
			</div>
			<Modal
				title="Add more personal event: "
				style={{
					top: 80,
				}}
				destroyOnClose={true}
				labelAlign="left"
				open={modal2Open}
				onOk={() => {addEventHandler()}}
				onCancel={() => {
					setModal2Open(false);
					setScrolled(false);
				}}
				okButtonProps={{disabled: addEventButtonDisabled}}
			>
				<Form
					ref={addEventFormRef}
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
					remember: false,
					}}
					autoComplete="off"
				>
					<Form.Item
					label="Time of event:   "
					name="eventTime"
					rules={[
						{
						required: true,
						message: 'Your event must have time!',
						},
					]}
					>
						<RangePicker format="YYYY-MM-DD HH:mm:ss" defaultValue={scrolled ? [dayjs(scrollStart.valueOf()), dayjs(scrollEnd.valueOf())] : null}/>
					</Form.Item>
					<Form.Item
					label="Priority"
					name="eventPriority"
					rules={[
						{
						required: true,
						message: "Please input your event's priority",
						},
					]}
					>
						<Select
							defaultValue="critical"
							style={{ width: 120 }}
							// onChange={handleChange}
							options={[
								{ value: 'highest', label: 'highest' },
								{ value: 'high', label: 'high' },
								{ value: 'critical', label: 'critical' },
								{ value: 'low', label: 'low'},
								{ value: 'lowest', label: 'lowest'},
							]}
						/>
					</Form.Item>

					<Form.Item
					label="Event title"
					name="eventTitle"
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
					name="eventDescription"
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
			<div>
			<Calendar
			    dayLayoutAlgorithm={!overLap ? 'no-overlap' : 'overlap'}
			  	localizer={localizer}
			  	events={myEvents}
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
				popup
				components={{
					week : {
						event: EventBox,
					},
					month: {
						event: MonthEventBox
					},
					day : {
						event: EventBox,
					},
					toolbar: props => (<CustomCalendarToolbar {...props} getShowingMonth={getShowingMonthHandler} toggleOverLap={toggleOverLapHandler}/>),
					// toolbarProps: {getShowingMonth: getShowingMonthHandler}
				}}
				messages={{
					today: 'This Month',
					previous: <LeftOutlined style={{color: '#3d5c98'}}/>,
					next: <RightOutlined style={{color: '#3d5c98'}}/>
				}}
				label="Tung dep trai"
				showMultiDayTimes={true}
				onSelectSlot={handleSelectSlot}
				selectable
				scrollToTime={scrollToTime}
				resizable	  
			/>,
			</div>
		</div>
	)
}
Calendars.propTypes = {
	dayLayoutAlgorithm: PropTypes.string,
}
export default Calendars;
