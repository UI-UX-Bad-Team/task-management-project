import styles from './NotificationModal.module.css';
import { Tabs } from 'antd';
import NotificationBox from '../notificationBox/NotificationBox';

const sampleNoti1 = [
	{from: 'Bui Danh Tung', verb: ' updated an issue', issueId: 'DEV-03', issueName: 'Mobile Uploads screen', time: '3 minutes ago', issueType: 'bug', yetRead: true},
	{from: 'Dinh Trong Huy', verb: ' assigned a task for you', issueId: 'DEV-02', issueName: 'Remove tab icon', time: '2 hours ago', issueType: 'improvement', yetRead: false},
	{from: 'Dinh Trong Huy', verb: ' assigned a task for you', issueId: 'DEV-02', issueName: 'Remove tab icon', time: '2 hours ago', issueType: 'improvement', yetRead: false},
	{from: 'Dinh Trong Huy', verb: ' assigned a task for you', issueId: 'DEV-02', issueName: 'Remove tab icon', time: '2 hours ago', issueType: 'improvement', yetRead: false},
	{from: 'Dinh Trong Huy', verb: ' assigned a task for you', issueId: 'DEV-02', issueName: 'Remove tab icon', time: '2 hours ago', issueType: 'improvement', yetRead: false},
]




const DiriectTab = () => {

	return (
		<div>
			{sampleNoti1.map((noti,id) => {
				return <NotificationBox key={id} id={id} from={noti.from} verb={noti.verb} notiTime={noti.time} issueId={noti.issueId} issueName={noti.issueName} issueType={noti.issueType} yetRead={noti.yetRead}/ >
			})}
		</div>
	)
}


const NotificationModal = () => {

	const items = [
		{
		  key: '1',
		  label: `Direct`,
		  children: <DiriectTab />,
		},
		{
		  key: '2',
		  label: `Watching`,
		  children: `Content of Tab Pane 2`,
		},
	];

	return (
		<div className={styles.notificationModal}>
			<p style={{fontSize: '22px', fontWeight: 600, colorL: '#000', letterSpacing: '0.5px', marginBottom: '10px'}}>Notifications</p>
			<Tabs defaultActiveKey="1" items={items} />
		</div>
	)
}

export default NotificationModal;

