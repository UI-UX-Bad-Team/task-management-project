import { Menu } from 'antd';
import { MailOutlined, SettingOutlined,AppstoreOutlined } from '@ant-design/icons';
import Logo from '../logo/Logo';

function getItem(label, key, icon, children, type) {
	return {
	  key,
	  icon,
	  children,
	  label,
	  type,
	};
  }

  	const items = [
		getItem('', '', <Logo />),
		{
			type: 'divider',
	  	},
		getItem('Navigation One', 'sub1', <MailOutlined />, [
	  	getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
	  	getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
	]),
		getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
	  	getItem('Option 5', '5'),
	  	getItem('Option 6', '6'),
	  	getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
	]),
	getItem('Navigation Three', 'sub4', <SettingOutlined />, [
	  	getItem('Option 9', '9'),
	  	getItem('Option 10', '10'),
	  	getItem('Option 11', '11'),
	  	getItem('Option 12', '12'),
	]),
  ];

const Navigation = () => {

	  return (
		<div className="navigation">
			<Menu
			  style={{
				width: 220,
			  }}
			  mode="block"
			  items={items}
			/>
		</div>
	  );
}

export default Navigation;
