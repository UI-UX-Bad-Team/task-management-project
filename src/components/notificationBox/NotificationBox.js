import styles from './NotificationBox.module.css';
import {Avatar, Tag} from 'antd';
import { BugType, ImprovementType } from '../../data/issueTypes';



const NotificationBox = (props) => {

	return (
		<div className={props.yetRead ? styles.notificationBoxYetRead : styles.notificationBox}>
			<div className={styles.avatar}>
				<Avatar src={`/images/avatar${props.id + 1}.jpg`} />
			</div>
			<div className={styles.notiMain}>
				<div className={styles.notiTitle}>
					<p style={{display: 'inline-block', fontWeight: 600, marginRight: '2px'}}>{props.from}</p>
					<p style={{display: 'inline-block'}}>{props.verb}</p>
				</div>
				<div className={styles.notiContent}>
					{props.issueType === 'bug' ? <BugType /> : <ImprovementType />}
					<p style={{fontWeight: '600'}}>{props.issueId}</p>
					<p style={{fontWeight: '500', marginRight: '10px'}}>{props.issueName}</p>
					<Tag color="#2db7f5">Dev</Tag>
					{props.yetRead ? <div style={{backgroundColor: 'rgba(24, 125, 145, 0.85)', borderRadius: '50px', height: '10px', width: '10px'}}></div> : ''}
				</div>
				<p className={styles.notiTime}>{props.notiTime}</p>
			</div>
		</div>
	)
}

export default NotificationBox;
