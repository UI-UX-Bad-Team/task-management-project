import React, {useState} from 'react';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import {Popover, Calendar, Col, Radio, Row, Select, Typography, theme, ColorPicker, Divider} from 'antd';
import {RightOutlined, LeftOutlined, SettingOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import dayLocaleData from 'dayjs/plugin/localeData';
import ColorContext from '../../context/ColorContext';
import styles from './CustomCalendarToolbar.module.css';

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
			const month = value.month();
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
				<Typography.Title level={4}>Custom header</Typography.Title>
				<Row gutter={8}>
				  <Col>
					<Radio.Group
					  size="small"
					  onChange={(e) => onTypeChange(e.target.value)}
					  value={type}
					>
					</Radio.Group>
				  </Col>
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
				  <Col>
					<Select
					  size="small"
					  dropdownMatchSelectWidth={false}
					  value={month}
					  onChange={(newMonth) => {
						const now = value.clone().month(newMonth);
						onChange(now);
					  }}
					>
					  {monthOptions}
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
				<path fill="#3d5c98" d="M56,20H8v-8h8c0,2.211,1.789,4,4,4s4-1.789,4-4h16c0,2.211,1.789,4,4,4s4-1.789,4-4h8V20z"/>
			</g>
		</svg>
	)
}

export default class CustomCalendarToolbar extends Toolbar {

	constructor(props){
		super(props);
		this.state = {
				personalBackgroundColor : '1677FF', 
				teamBackgroundColor: '3d5c98', 
				personalTextColor : '1677FF', 
				teamTextColor: '3d5c98', 
				personalTimeboxColor: '3d5c98', 
				teamTimeboxColor: '3d5c98', 
				isSetting: false
			};
		this.changePersonalBackgroundColor = this.changePersonalBackgroundColor.bind(this);
		this.changePersonalTextColor = this.changePersonalTextColor.bind(this);
		this.changeTeamBackgroundColor = this.changeTeamBackgroundColor.bind(this);
		this.changeTeamTextColor = this.changeTeamTextColor.bind(this);
		this.changePersonalTimeboxColor = this.changePersonalTimeboxColor.bind(this);
		this.changeTeamTimeboxColor = this.changeTeamTimeboxColor.bind(this);
		this.showColorSetting = this.showColorSetting.bind(this);
	}

	componentDidMount() {
		const view = this.props.view;
	}

	componentWillUnmount() {

	}

	changePersonalBackgroundColor(color) {
		this.setState({personalColor: color.toHex()})
		localStorage.removeItem('personalBackgroundColor');
		localStorage.setItem('personalBackgroundColor', color.toHex());
		window.dispatchEvent(new Event("storage")); //This is the important part
	}
	changeTeamBackgroundColor(color) {
		this.setState({teamColor: color.toHex()})
		localStorage.removeItem('teamBackgroundcolor');
		localStorage.setItem('teamBackgroundcolor', color.toHex());
		window.dispatchEvent(new Event("storage")); //This is the important part
	}

	changePersonalTextColor(color) {
		this.setState({personalTextColor: color.toHex()})
		localStorage.removeItem('personalTextColor');
		localStorage.setItem('personalTextColor', color.toHex());
		window.dispatchEvent(new Event("storage")); //This is the important part
	}

	changeTeamTextColor(color) {
		this.setState({teamTextColor: color.toHex()})
		localStorage.removeItem('teamTextColor');
		localStorage.setItem('teamTextColor', color.toHex());
		window.dispatchEvent(new Event("storage")); //This is the important part
	}

	changePersonalTimeboxColor(color) {
		this.setState({personalTimeboxColor: color.toHex()})
		localStorage.removeItem('personalTimeboxColor');
		localStorage.setItem('personalTimeboxColor', color.toHex());
		window.dispatchEvent(new Event("storage")); //This is the impo
	}

	changeTeamTimeboxColor(color) {
		this.setState({teamTimeboxColor: color.toHex()})
		localStorage.removeItem('teamTimeboxColor');
		localStorage.setItem('teamTimeboxColor', color.toHex());
		window.dispatchEvent(new Event("storage")); //This is the impo
	}

	showColorSetting() {
		this.setState((state) => ({
			isSetting: !state.isSetting
		}))
	}


render() {
		return (
		<div>
			<div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 20, marginBottom: 15,}}>
				{   !this.state.isSetting ?
					<a className={styles.customizeColorText} style={{fontWeight: 600, textDecoration: 'underline'}} onClick={this.showColorSetting}>Cusomize event color</a> :
					<a className={styles.customizeColorText} style={{fontWeight: 600, textDecoration: 'underline'}} onClick={this.showColorSetting}>Hide color picker</a>
				}
				{/* <SettingOutlined style={{fontSize: '24px', color: '#3d5c98'}}/> */}
			</div>
			{this.state.isSetting ? <div style={{width: '100%'}}>				
				<div className="rbc-btn-group" style={{display: 'flex', gap: '20px', marginBottom: '20px', justifyContent: 'flex-start', alignItems: 'center', overflowX: 'scroll'}}>
					<div style={{display: 'flex', alignItems: 'center', gap: '10px', width: '100%'}}>
						<p style={{fontWeight: 700,fontSize: '16px', color: '#3d5c98'}}>Text: </p>
						<div style={{display: 'flex', gap: '15px'}}>
							<div style={{display: 'flex', alignItems: 'center', gap: '7px'}} ><ColorPicker onChange={this.changePersonalTextColor} value={localStorage.getItem('personalTextColor')}/><p style={{fontWeight: 600}}>personal</p></div>
							<div style={{display: 'flex', alignItems: 'center', gap: '7px'}}><ColorPicker onChange={this.changeTeamTextColor} value={localStorage.getItem('teamTextColor')}/><p style={{fontWeight: 600}}>collaborative</p></div>
						</div>
					</div>
					<Divider type="vertical" style={{borderLeftWidth: '1px', borderLeftColor: '#000' }}/>
					<div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
						<p style={{fontWeight: 700, fontSize: '16px', color: '#3d5c98'}}>Background: </p>
						<div style={{display: 'flex', gap: '15px'}}>
							<div style={{display: 'flex', alignItems: 'center', gap: '7px'}}><ColorPicker onChange={this.changePersonalBackgroundColor} value={localStorage.getItem('personalBackgroundColor')}/><p style={{fontWeight: 600}}>personal</p></div>
							<div style={{display: 'flex', alignItems: 'center', gap: '7px'}}><ColorPicker onChange={this.changeTeamBackgroundColor} value={localStorage.getItem('teamBackgroundColor')} /><p style={{fontWeight: 600}}>collaborative</p></div>
						</div>
					</div>
					<Divider type="vertical" style={{borderLeftWidth: '1px', borderLeftColor: '#000' }}/>
					<div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
						<p style={{fontWeight: 700, fontSize: '16px', color: '#3d5c98'}}>TimeBox: </p>
						<div style={{display: 'flex', gap: '15px'}}>
							<div style={{display: 'flex', alignItems: 'center', gap: '7px'}}><ColorPicker onChange={this.changePersonalTimeboxColor} value={localStorage.getItem('personalTimeboxColor')}/><p style={{fontWeight: 600}}>personal</p></div>
							<div style={{display: 'flex', alignItems: 'center', gap: '7px'}}><ColorPicker onChange={this.changeTeamTimeboxColor} value={localStorage.getItem('teamTimeboxColor')} /><p style={{fontWeight: 600}}>collaborative</p></div>
						</div>
					</div>
				</div>
			</div> : ''}
			<div style={{display: 'flex', alignItems: 'center', marginBottom: '20px', justifyContent: 'space-between'}}>
				<div className="rbc-btn-group">
					<button type="button" onClick={() => this.navigate('TODAY')} style={{color: '#000', backgroundColor: '#ccc', padding: '10px', borderRadius: '50px',paddingLeft: '20px', paddingRight: '20px'}}>Today</button>
					<button type="button" onClick={() => this.navigate('PREV')}>
						<LeftOutlined style={{color: '#3d5c98', fontSize: '20px'}}/>
					</button>
					<button type="button" onClick={() => this.navigate('NEXT')}>
						<RightOutlined style={{color: '#3d5c98', fontSize: '20px'}}/>
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
		</div>
		);
	}
}