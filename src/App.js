import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import './pages/dashboard/Dashboard';
import Dashboard from "./pages/dashboard/Dashboard";
import Teams from './pages/teams/Teams';
import Login from "./pages/login/Login";
import Assignments from './pages/assignments/Assignments';
import AccountBox from "./components/accountBox/AccountBox";
import Team from './pages/team/Team'
import "../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css";
import '../node_modules/@syncfusion/ej2-buttons/styles/bootstrap5.css';
import "../node_modules/@syncfusion/ej2-layouts/styles/bootstrap5.css";
import '../node_modules/@syncfusion/ej2-dropdowns/styles/bootstrap5.css';
import '../node_modules/@syncfusion/ej2-inputs/styles/bootstrap5.css';
import "../node_modules/@syncfusion/ej2-navigations/styles/bootstrap5.css";
import "../node_modules/@syncfusion/ej2-popups/styles/bootstrap5.css";
import "../node_modules/@syncfusion/ej2-react-kanban/styles/bootstrap5.css";
import { registerLicense } from '@syncfusion/ej2-base';
import { notification } from 'antd';
import { SmileOutlined,CloseOutlined } from '@ant-design/icons';
import Project from "./pages/project/Project";
import AssignmentDetail from './pages/assignmentDetail/AssignmentDetail';
import MyProject from "./pages/myProject/MyProjects";
import Chat from "./pages/chat/Chat";


function App() {
const [api, contextHolder] = notification.useNotification();

const successNotification = () => {
		api.open({
			message: <p style={{color: '#fff', fontWeight: '700'}}>Welcome back, Tung</p>,
			description:
			<p style={{color: '#fff', fontWeight: '500'}}>Let's go to kill all tasks !!</p>,
			icon: <SmileOutlined style={{ color: '#fff' }} />,
			style: {backgroundColor: '#3d5c98'},
			closeIcon: <CloseOutlined style={{ color: '#fff' }}/>
		});
};

registerLicense('Mgo+DSMBaFt+QHJqXU1hXk5Hd0BLVGpAblJ3T2ZQdVt5ZDU7a15RRnVfRF1mSX1TdkRnWntccA==;Mgo+DSMBPh8sVXJ1S0R+VFpFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jT35WdkZjWX5ac3FTRg==;ORg4AjUWIQA/Gnt2VFhiQllPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXhTc0VgWX9fdHBWR2g=;MjMwOTQyOEAzMjMxMmUzMDJlMzBqdHdJZk1UWThZNlplOXBIa1JzcVZsSURqVFRacHIvRjB1L1UwKzQ4RHowPQ==;MjMwOTQyOUAzMjMxMmUzMDJlMzBMTEJqUmcrQmQ1OGVwZGJoRFozaHFaU05sSDlJOVBMV2hrQVFLSGdDYWNvPQ==;NRAiBiAaIQQuGjN/V0d+Xk9MfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5VdkBjWn9ecXBQQ2NU;MjMwOTQzMUAzMjMxMmUzMDJlMzBGUENkVHFYQ3VpNzJOc2QyMjBtd01HakdoRkJaQ01BSXVMSzQ5ZXNPa1NjPQ==;MjMwOTQzMkAzMjMxMmUzMDJlMzBBb2g0SjVuWUZLNlhKT1FSSElYZ0xDWWVWNkRTZngydlV4ZEprOEsvdjVNPQ==;Mgo+DSMBMAY9C3t2VFhiQllPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXhTc0VgWX9fdHJWT2g=;MjMwOTQzNEAzMjMxMmUzMDJlMzBIaERBUXc0RzM3UUhJUHFBSG1BQ3dPMjQwRnkvaHNhUkpqaXJqdURIUGRnPQ==;MjMwOTQzNUAzMjMxMmUzMDJlMzBWT0l0c0E1ZWFhOGhDaHVSbnc2SWpoWTNBVEF1N2FFQm1IZVRya2JhWkdBPQ==;MjMwOTQzNkAzMjMxMmUzMDJlMzBGUENkVHFYQ3VpNzJOc2QyMjBtd01HakdoRkJaQ01BSXVMSzQ5ZXNPa1NjPQ==');
  return (
    <div className="App">
		{contextHolder}
      	<BrowserRouter>
        	<Routes>
					<Route path="/" element={<Login successNotification={successNotification}/>} />
					<Route path="/login" element={<Login successNotification={successNotification}/>} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/teams" element={<Teams />} />
					<Route path="/accountBox" element={<AccountBox />} />
					<Route path="/teams/:teamId" element={<Team />} />
					<Route path="/my-assignments" element={<Assignments />} />
					<Route path="/teams/:teamId/projects/:projectId" element={<Project />} />
					<Route path="/my-assignments/assignments/:assignmentId" element={<AssignmentDetail />} />
					<Route path="/teams/:teamId/projects/:projectsId/assignments/:assignmentId" element={<AssignmentDetail />} />
					<Route path="/my-projects/" element={<MyProject />} />
					<Route path="/teams/:teamId/assignments/:assignmentId" element={<AssignmentDetail />} />
					<Route path="/my-projects/:projectId/assignments/:assignmentId" element={<AssignmentDetail />} />
					<Route path="/chat" element={<Chat />} />
					<Route path="/my-projects/:projectId" element={<Project />} />
       		</Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
