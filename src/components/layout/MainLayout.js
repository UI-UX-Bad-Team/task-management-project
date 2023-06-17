import * as React from "react";
import { useNavigate } from 'react-router-dom';
import { LaptopOutlined, NotificationOutlined, HomeOutlined, ProjectOutlined, MessageOutlined } from '@ant-design/icons';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import Header from '../header/ Header';
import teamsSampleData from "../../data/team";
import projectsSampleData from "../../data/projects";
import usersSampleData from "../../data/users";

const {Content, Sider} = Layout;
const navBarLabels = ['Dashboard', 'Teams', 'My projects', 'My assignments', 'Chat'];


const menuItems = [HomeOutlined, LaptopOutlined,ProjectOutlined, NotificationOutlined, MessageOutlined].map((icon, index) => {

  	const key = String(index + 1);

  	return {
    	key: `sub${key}`,
    	icon: React.createElement(icon),
    	label: navBarLabels[index],
    	children: null,
  };
});
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

const MainLayout = (props) => {

	const pathName = window.location.pathname;
	const pathNamePart = pathName.split('/');
	pathNamePart.shift();
	const breadcrumbItems = [];

	pathNamePart.forEach((part,id) => {
		if (part === 'dashboard') {
			
		}
		if(isNumeric(part)) {
			if(pathNamePart[id-1] === 'teams') {
				breadcrumbItems.push(teamsSampleData[parseInt(part)].name)
			}

			if(pathNamePart[id-1] === 'projects') {
				breadcrumbItems.push(projectsSampleData[parseInt(part)].name)
			}

		} else {
			if (part !== 'dashboard'){		
				breadcrumbItems.push(part);
			}
		}

	})

	const navigate = useNavigate();

  	const {
    	token: { colorBgContainer },
  	} = theme.useToken();

	const navigateHandler = ({item, key}) => {
		if(key === "sub1") {
			navigate("/dashboard");
		} else if (key === "sub2") {
			navigate("/teams");
		} else if (key === "sub3") {
			navigate("/my-projects")
		} else if (key === 'sub4') {
			navigate('/my-assignments')
		} else if (key === 'sub5') {
			navigate('/chat')
		}
	}

  	return (
    	<Layout 
			style={{
				minHeight: "100vh",
				overflow: "auto",
			}}
		>
			<Header />
      		<Layout>
        		<Sider
					width={208}
					style={{
						marginTop: "5px",
						background: colorBgContainer,
						shapeOutside:"true",
						borderRadius: "0 2px 2px 0",
					}}
				>
					<Menu
						mode="inline"
						style={{
							width: "100%",
							height: '100%',
							borderRight: 0,
						}}
						defaultSelectedKeys={'sub1'} 
						selectedKeys={pathName === '/dashboard' ? ['sub1'] : (pathName.includes('/teams') ? ["sub2"] : (pathName.includes('projects') ? ['sub3'] : (pathName.includes('assignments') ? ['sub4'] : ['sub5'])))}
						items={menuItems}
						onSelect={navigateHandler}
					/>
        		</Sider>
        	<Layout
				style={{
					paddingTop: '0px',
					paddingRight: '24px',
					paddingLeft: '24px'
				}}
			>
				
				<Breadcrumb
					style={{
						margin: '16px 0',
					}}
				>
					{['Home', ...breadcrumbItems].map(item => {
						return <Breadcrumb.Item><p style={{color: '#3d5c98', fontWeight: 600}}>{item}</p></Breadcrumb.Item>
					})}
          		</Breadcrumb>

				<Content
					style={{
					paddingTop: '10px',
					paddingRight: '24px',
					paddingLeft: '24px',
					margin: 0,
					minHeight: 280,
					background: colorBgContainer,
					}}
				>
				{props.content}
				</Content>
				<div style={{fontWeight: '700', paddingTop: '10px', color: '#3d5c98'}}>
						Power by <div style={{display: 'inline-block', color: 'red'}}>Hedspi Team</div>
				</div>
			</Layout>
		</Layout>
	</Layout>
  );
};
export default MainLayout;