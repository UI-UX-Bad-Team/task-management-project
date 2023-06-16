import styles from './AccountBox.module.css';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { Dropdown , Avatar} from 'antd';
import { useNavigate } from "react-router";



  
const AccountBox = ({name: accountName}) => {

	const navigate = useNavigate();

	const logoutHandler = () => {
		navigate('/')
	}

	const seeProfileHandler = () => {

	}

	const items = [
		{
		  key: '1',
		  label: (
			<div onClick={seeProfileHandler}>
			  View Profile
			</div>
		  ),
		},
		{
		  key: '2',
		  label: (
			<div onClick={logoutHandler}>
			  Log out
			</div>
		  ),
		},
	  ];

	return (
	<Dropdown
		menu={{
		  items,
		}}
		placement="bottomLeft"
		arrow={{
		  pointAtCenter: true,
		}}
	  >
		<div className={styles.accountBox}>
			<div className={styles.avatar}>
				<Avatar 
					size={30}
					src="/images/avatar.jpg"
				/>
			</div>
			<div className={styles.infomation}>
					<p className={styles.accountName}>{accountName}</p>
					<DownOutlined style={{color: "#3d5c98"}}/>
			</div>
		</div>
	</Dropdown>
	)
}

export default AccountBox;
