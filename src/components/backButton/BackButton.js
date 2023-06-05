import { LeftOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space } from 'antd';

const BackButton = () => {

	return (
		<Tooltip title="search">
        	<Button type="primary" shape="circle" icon={<LeftOutlined />} />
      	</Tooltip>
	)
}

export default BackButton;
