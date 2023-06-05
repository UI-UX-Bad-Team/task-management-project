import styles from './CommentBox.module.css';
import {Avatar} from 'antd';

const CommentBox = () => {

	return (
		<div className={styles.commentBox}>
			<div className={styles.avatarContainer}>
				<Avatar src='/images/avatar4.jpg'/>
			</div>
			<div className={styles.commentContent}>
				<div className={styles.commentHeader}>
					<p className={styles.commentPerson}>Bui Danh Tung</p>
					<p className={styles.commentTime}>Mar 13, 2023, 10:09AM</p>
					<p className={styles.edited}>Edited</p>
				</div>
				<div className={styles.commentText}>
					<p>You should prepare document perfectly before making slide for presentation</p>
				</div>
			</div>
		</div>
	)
}

export default CommentBox;