import styles from './Topic.module.css';
import usersSampleData from '../../data/users';
import { Avatar } from 'antd';
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const TopicBox = (props) => {

	console.log(props.created)
	const creatingMember = usersSampleData.filter(user => user.id === props.creatingMemberId)[0];

	return (
		<div className={styles.topicBox}>
			<div className={styles.topicNumber}>
				<p className={styles.topicAnswersNum}>{props.answersNum} answers</p>
				<p className={styles.topicViewsNum}>{props.viewsNum} views</p>
			</div>
			<div className={styles.topicContent}>
					<div>
						<p className={styles.topicTitle}>{props.title}</p>
						<p className={styles.topicDescription}>{props.description}</p>
					</div>
					<div className={styles.creatingMember}>
					<Avatar
						size={25}
						src={`/images/avatar${creatingMember.id}.jpg`}
					/>
						<p>
							<p className={styles.creatingMemberName}>{creatingMember.name}</p>
						</p>
						<p className={styles.creatingMemberAccountName}>
							{creatingMember.accountName}
						</p>
						<p>created {props.created.fromNow()}</p>
					</div>
			</div>
		</div>

	);
}

export default TopicBox;
