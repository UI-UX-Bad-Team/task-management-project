import React from 'react';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import {Popover, Calendar, Col, Row, Select, Typography, theme} from 'antd';
import {RightOutlined, LeftOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import dayLocaleData from 'dayjs/plugin/localeData';
dayjs.extend(dayLocaleData);

const PopoverContent = () => {
	const { token } = theme.useToken();
	const onPanelChange = (value, mode) => {
	  console.log(value.format('YYYY-MM-DD'), mode);
	};
	const wrapperStyle = {
	  width: 300,
	  border: `1px solid ${token.colorBorderSecondary}`,
	  borderRadius: token.borderRadiusLG,
	};
	return (
	  <div style={wrapperStyle}>
		<Calendar
		  fullscreen={false}
		  headerRender={({ value, type, onChange, onTypeChange }) => {
			const start = 0;
			const end = 12;
			const monthOptions = [];
			let current = value.clone();
			const localeData = value.localeData();
			const months = [];
			for (let i = 0; i < 12; i++) {
			  current = current.month(i);
			  months.push(localeData.monthsShort(current));
			}
			for (let i = start; i < end; i++) {
			  monthOptions.push(
				<Select.Option key={i} value={i} className="month-item">
				  {months[i]}
				</Select.Option>,
			  );
			}
			const year = value.year();
			const options = [];
			for (let i = year - 10; i < year + 10; i += 1) {
			  options.push(
				<Select.Option key={i} value={i} className="year-item">
				  {i}
				</Select.Option>,
			  );
			}
			return (
			  <div
				style={{
				  padding: 8,
				}}
			  >
				<Typography.Title level={3}>Select month</Typography.Title>
				<Row gutter={8}>
				  <Col>
					<Select
					  size="small"
					  dropdownMatchSelectWidth={false}
					  className="my-year-select"
					  value={year}
					  onChange={(newYear) => {
						const now = value.clone().year(newYear);
						onChange(now);
					  }}
					>
					  {options}
					</Select>
				  </Col>
				</Row>
			  </div>
			);
		  }}
		  onPanelChange={onPanelChange}
		/>
	  </div>
	);
}

const CalendarLogo = () => {

	return (
		<svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
	 width="23px" height="23px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xmlSpace="preserve">
			<g>
				<path fill="#394240" d="M60,4H48c0-2.211-1.789-4-4-4s-4,1.789-4,4H24c0-2.211-1.789-4-4-4s-4,1.789-4,4H4C1.789,4,0,5.789,0,8v52
					c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V8C64,5.789,62.211,4,60,4z M56,56H8V28h48V56z M56,20H8v-8h8c0,2.211,1.789,4,4,4
					s4-1.789,4-4h16c0,2.211,1.789,4,4,4s4-1.789,4-4h8V20z"/>
				<rect x="8" y="28" fill="#fff" width="48" height="28"/>
				<path fill="hsla(230,40%,50%,1)" d="M56,20H8v-8h8c0,2.211,1.789,4,4,4s4-1.789,4-4h16c0,2.211,1.789,4,4,4s4-1.789,4-4h8V20z"/>
			</g>
		</svg>
	)
}

export default class CustomCalendarToolbar extends Toolbar {

	componentDidMount() {
		const view = this.props.view;
	}

	render() {
		return (
			<div style={{display: 'flex', alignItems: 'center', marginBottom: '20px', justifyContent: 'space-between', paddingRight: '35px'}}>
				<div className="rbc-btn-group">
					<button type="button" onClick={() => this.navigate('TODAY')} style={{color: '#000', backgroundColor: '#ccc', padding: '10px', borderRadius: '50px',}}>Today</button>
					<button type="button" onClick={() => this.navigate('PREV')}>
						<LeftOutlined style={{color: 'hsla(230,40%,50%,1)', fontSize: '20px'}}/>
					</button>
					<button type="button" onClick={() => this.navigate('NEXT')}>
						<RightOutlined style={{color: 'hsla(230,40%,50%,1)', fontSize: '20px'}}/>
					</button>
				</div>
				<Popover className="rbc-toolbar-label" placement="bottom" content={<PopoverContent />} trigger="click">
        			{this.props.label}
					<CalendarLogo />
      			</Popover>
				<div className="rbc-btn-group">
					<button type="button" onClick={this.view.bind(null, 'month')}>Month</button>
					<button type="button" onClick={this.view.bind(null, 'week')}>Week</button>
					<button type="button" onClick={this.view.bind(null, 'day')}>Day</button>
					<button type="button" onClick={this.view.bind(null, 'agenda')}>Agenda</button>
				</div>
			</div>
		);
	}
}