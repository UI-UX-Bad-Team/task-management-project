import React, { Suspense } from "react";
import {Avatar, Card } from 'antd';
import styles from './TeamCard.module.css';
import { useNavigate } from "react-router";

const { Meta } = Card;

const TeamCard = (props) => {

	const navigate = useNavigate();

	const seeTeamDetailHandler = (workspaceId) => {
		navigate(`/workspaces/${workspaceId}`);
	}

	return (
		<div className={styles.teamCard}>
			<Card
			    title=""
				style={{
					width: '23vw',
					borderRadius: 0,
				}}
				className={styles.card}
				hoverable={true}
				cover={
					<div style={{padding: '5px'}}>
						<img
							alt="example"
							src={props.image}
							width="100%"
							loading="lazy"
							height="100%"
							resizeMode="cover"
							style={{borderRadius: 5}}
						/>
					</div>
				}
				onClick={() => {
					seeTeamDetailHandler(props.id)}}
				actions={[
				// <SettingOutlined key="setting" />,
				// <EditOutlined key="edit" />,
				// <EllipsisOutlined key="ellipsis" />,
				]}
			>
				<Meta
					avatar={<Avatar src="/images/avatar1.jpg" />}
					title={<p style={{fontSize: '18px', fontWeight: 700, letterSpacing: '0.5px'}}>{props.title}</p>}
					description={<p>{props.description}</p>}
				/>
  			</Card>
		</div>
	)
}

export default TeamCard;
