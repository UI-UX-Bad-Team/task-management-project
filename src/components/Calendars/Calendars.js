import React from 'react';
import { Tabs, Badge, Calendar } from 'antd';


const monthCellRender = (value) => {
	const num = getMonthData(value);
	return num ? (
	  <div className="notes-month">
		<section>{num}</section>
		<span>Backlog number</span>
	  </div>
	) : null;
};

const dateCellRender = (value) => {
	
	const listData = getListData(value);
	
	return (
	  <ul className="events">
			{listData.map((item) => (
		  		<li key={item.content}>
					<Badge status={item.type} text={item.content} />
		  		</li>
			))}
	  </ul>
	);
};
  
const cellRender = (current, info) => {
	if (info.type === 'date') return dateCellRender(current);
	if (info.type === 'month') return monthCellRender(current);
	return info.originNode;
};



const getListData = (value) => {
	let listData;
	switch (value.date()) {
	  case 8:
		listData = [
			{
				type: 'warning',
				content: 'This is warning event.',
			},
			{
				type: 'success',
				content: 'This is usual event.',
			},
		];
		break;
	  case 10:
		listData = [
		    {
				type: 'warning',
				content: 'This is warning event.',
		  	},
		  	{
				type: 'success',
				content: 'This is usual event.',
		  	},
		  	{
				type: 'error',
				content: 'This is error event.',
		  	},
		];
		break;
	case 15:
		listData = [
		  	{
				type: 'warning',
				content: 'This is warning event',
			},
		  	{
				type: 'success',
				content: 'This is very long usual event。。....',
		  	},
		  	{
				type: 'error',
				content: 'This is error event 1.',
		  	},
		  	{
				type: 'error',
				content: 'This is error event 2.',
		  	},
		  	{
				type: 'error',
				content: 'This is error event 3.',
		  	},
		  	{
				type: 'error',
				content: 'This is error event 4.',
		  	},
		];
		break;
	  	default:
	}
	return listData || [];
  };
const getMonthData = (value) => {
	if (value.month() === 8) {
	  	return 1394;
	}
};


const tabChangeHandler = (key) => {
  	};

const items = [
	{
	  	key: 'Month',
	  	label: `Month`,
	  	children: <Calendar cellRender={cellRender} />,
	},
	{
	  	key: 'Week',
	  	label: `Tab 2`,
	  	children: "",
	},
	{
	  	key: '3',
	    label: `Tab 3`,
	  	children: `Content of Tab Pane 3`,
	},
];

const Calendars = () => {

	return (
		<Tabs defaultActiveKey="1" items={items} onChange={tabChangeHandler} />
	)
}

export default Calendars;
