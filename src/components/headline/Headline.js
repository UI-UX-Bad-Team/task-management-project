import {useState} from 'react';
import styles from './Headline.module.css';
import AccountBox from '../accountBox/AccountBox';
import { NotificationOutlined,NotificationFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import NotificationModal from '../notificationModal/NotificationModal';

const Headline = () => {
	const navigate = useNavigate();
	const [notificationShow, setNotification] = useState(false);

	const items = [
		{
		  key: '1',
		  label: (
			<a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
			  1st menu item
			</a>
		  ),
		},
		{
		  key: '2',
		  label: (
			<a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
			  2nd menu item
			</a>
		  ),
		},
		{
		  key: '3',
		  label: (
			<a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
			  3rd menu item
			</a>
		  ),
		},
	  ];
	  
	const openAccountBoxHandler = () => {

	}

	return (
		<div className={styles.headline}>
			<div className={styles.backButton} onClick={() => navigate(-1)}>
				<svg viewBox="64 64 896 896" focusable="false" class="" data-icon="arrow-left" width="2em" height="2em" fill="#3d5c98" aria-hidden="true">
					<path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 0 0 0 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z">
					</path>
				</svg>
			</div>
			<div style={{display: 'flex', gap: '10px', height: '100%', alignItems: 'center'}}>
				<div className={styles.notification} >	
					<div className={styles.notificationIcon} onClick={() => {setNotification(prev => !prev)}} onBlur={() => {setNotification(false)}}>
						{  notificationShow ? 
							<NotificationFilled className={styles.notiIcon} style={{ fontSize: '23px', color: '#3d5c98'}} onBlur={() => {setNotification(false)}}/> 
							: <NotificationOutlined className={styles.notiIcon} style={{ fontSize: '23px', color: '#3d5c98' }} onBlur={() => {setNotification(false)}}/>
						}
					</div>
					{notificationShow ? <div className={styles.notificationModal} >
						<NotificationModal />
					</div> : ''}
				</div>	
				<AccountBox name="Bui Danh Tung" onClick={openAccountBoxHandler}/>
			</div>
		</div>
	)
}

export default Headline;
