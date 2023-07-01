import styles from './CommentBox.module.css';
import {Avatar} from 'antd';

const image = {
	'Bui Danh Tung': '/images/avatar1.jpg',
	'Dao Trong Hoan': '/images/avatar2.jpg',
	'Dinh Trong Huy':'/images/avatar3.jpg',
	'Ta Duc Tien':'/images/avatar4.jpg',
	'Vu Minh Dang':'/images/avatar5.jpg',
	'Nguyen Duy Hung' :'/images/avatar6.jpg',
	'Pham Trung Dung' :'/images/avatar7.jpg',
	'Mac Van Khanh' :'/images/avatar8.jpg',
};
const createMarkup = (htmlString) => {
    return { __html: htmlString };
  }	;

const CommentBox = (props) => {

	return (
		<div className={styles.commentBox}>
			<div className={styles.avatarContainer}>
				<Avatar src={image[props.createdPerson]}/>
			</div>
			<div className={styles.commentContent}>
				<div className={styles.commentHeader}>
					<p className={styles.commentPerson}>{props.createdPerson}</p>
					<p className={styles.commentTime}>{props.createdTime}</p>
					{
						props.isEditted ? 
					<p className={styles.edited}>Editted</p> : ""
					}
				</div>
				<div className={styles.commentText}>
					<div dangerouslySetInnerHTML={createMarkup(props.commentContent)}></div>
				</div>
			</div>
		</div>
	)
}

export default CommentBox;