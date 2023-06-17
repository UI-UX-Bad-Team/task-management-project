import {useState} from 'react';
import styles from './AssignmentDetailTab.module.css';
import { AttachIcon } from '../../data/icon';
import {Tabs, Tag, Avatar, Modal, Image, Input, Button} from 'antd';
import { SubnodeOutlined, LinkOutlined, MoreOutlined, PlusOutlined, ArrowUpOutlined } from '@ant-design/icons';
import ImageUpload from '../imageUpload/ImageUpload';
import CommentBox from '../commentBox/CommentBox';
import { BugType } from '../../data/issueTypes';

const { TextArea } = Input;

const sampleAssignment = {
	title: 'Prepare ppt for tomorrow presentation',
	description: 'Tomorrow we hava an important meeting, so please prepare a slide for presentation. ',
	assignee: 'Dinh Trong Huy',
	reviewer: 'Dao Trong Hoan'
}


const GeneralTab = () => {
	const [uploadModalOpen, setUploadModalOpen] = useState(false);
	
	const openUploadImageModal = () => {
		setUploadModalOpen(true);
	}	
	  
	const handleOk = () => {
		setUploadModalOpen(false);
	};
	
	const handleCancel = () => {
		setUploadModalOpen(false);
	};

	return (
		<div className={styles.generalTab}>
			<Modal title="Basic Modal" open={uploadModalOpen} onOk={handleOk} onCancel={handleCancel} size={'large'} style={{maxWidth: '600px', maxHeight: '800px'}}>
				<ImageUpload />
			</Modal>
			<p className={styles.descriptionTitle}> Description</p>
			<p className={styles.description}>{sampleAssignment.description}</p>
			<div className={styles.assignee}>
				<p className={styles.assigneeTitle}>Assignee: </p>
				<div className={styles.assigneeName}>
					<Avatar src={'/images/avatar1.jpg'} size={28} />
					{sampleAssignment.assignee}
				</div>
			</div>
			<div className={styles.reviewer}>
				<p className={styles.reviewerTitle}>Reviewer: </p>
				<div className={styles.reviewerName}>
					<Avatar src={'/images/avatar2.jpg'} size={28} />
					{sampleAssignment.reviewer}
				</div>
			</div>
			<div className={styles.components}>
				<p className={styles.componentsTitle}>Components: </p>
				<div className={styles.componentTags}>
					<Tag color="#f50">ppt</Tag>
					<Tag color="#2db7f5">presentation</Tag>
				</div>
			</div>
			<div className={styles.attachment}>
				<p className={styles.attachmentTitle} >Attachment: </p>
				<div className={styles.attachmentMore}>
					<div className={styles.attachIcon}>
						<MoreOutlined style={{fontSize: '20px', fontWeight: 700, transform: 'rotate(90deg)'}}/>
					</div>
					<div className={styles.attachIcon} onClick={openUploadImageModal}>
						<PlusOutlined />
					</div>
				</div>
			</div>
			<div className={styles.attachmentImage}>
				<div className={styles.assignmentImage}>
					<div className={styles.imageContainer}>
						<Image width={150} height={150} style={{borderRadius: '5px'}} src="/images/assignment1.jpg" />
					</div>
					<div className={styles.imageInfo}>
						<p style={{fontWeight: 600}}>assignment1.jpg</p>
						<p>05 June 2023, 9:44 AM</p>
					</div>
				</div>
				<div className={styles.assignmentImage}>
					<div className={styles.imageContainer}>
						<Image width={150} height={150} style={{borderRadius: '5px'}} src="/images/assignment2.jpg" />
					</div>
					<div className={styles.imageInfo}>
						<p style={{fontWeight: 600}}>assignment1.jpg</p>
						<p>05 Aug 2022, 4:14 PM</p>
					</div>
				</div>
				<div className={styles.assignmentImage}>
					<div className={styles.imageContainer}>
						<Image width={150} height={150} style={{borderRadius: '5px'}} src="/images/assignment3.jpg" />
					</div>
					<div className={styles.imageInfo}>
						<p style={{fontWeight: 600}}>assignment1.jpg</p>
						<p>18 Mar 2023, 10:09 AM</p>
					</div>
				</div>
				<div className={styles.assignmentImage}>
					<div className={styles.imageContainer}>
						<Image width={150} height={150} style={{borderRadius: '5px'}} src="/images/assignment4.jpg" />
					</div>
					<div className={styles.imageInfo}>
						<p style={{fontWeight: 600}}>assignment1.jpg</p>
						<p>20 Feb 2023, 1:34 AM</p>
					</div>
				</div>
				<div className={styles.assignmentImage}>
					<div className={styles.imageContainer}>
						<Image width={150} height={150} style={{borderRadius: '5px'}} src="/images/assignment5.jpg" />
					</div>
					<div className={styles.imageInfo}>
						<p style={{fontWeight: 600}}>assignment1.jpg</p>
						<p>01 Jan 2023, 17:20 AM</p>
					</div>
				</div>
			</div>
			<div className={styles.activity}>
				<p className={styles.activityTitle}>Activity: </p>
				<div className={styles.showMethods}>
					<div style={{display: 'flex', gap: '20px'}}>
						<p style={{fontSize: '16px', fontWeight: 600}}>Show: </p>
						<div className={styles.methods}>
							<div className={styles.showMethod} >
								Comments
							</div>
							<div className={styles.showMethod}>
								History
							</div>
							<div className={styles.showMethod}>
								Work log
							</div>
						</div>
					</div>
					<p style={{display: 'flex', alignItems: 'center'}}>
						<div className={styles.lastestText}>Lastest first</div>
						<ArrowUpOutlined />
					</p>
				</div>
				<div className={styles.comments}>
					<CommentBox />
					<CommentBox />
					<CommentBox />
					<CommentBox />
				</div>
				<div className={styles.newComment}>
					<Avatar src='/images/avatar1.jpg'/>
					<TextArea showCount maxLength={300} placeholder={"Add a new comment"}/>
				</div>
				<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px'}}>
					<div style={{display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px'}}>
						<p style={{fontSize: '14px', fontWeight: 700, color: '#777'}}>Pro tip: </p>
						<p >Press <Tag size={20} color="#ccc">M</Tag> to comment</p>
					</div>
					<div style={{display: 'flex', gap: '5px'}}>
						<Button size={'middle'}>Clear</Button>
						<Button type="primary" size={'middle'}>
							Add
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

const items = [
	{
	  key: '1',
	  label: `General`,
	  children: <GeneralTab />,
	},
	{
	  key: '2',
	  label: `QA testing`,
	  children: `Content of Tab Pane 2`,
	},
	{
	  key: '3',
	  label: `Admin`,
	  children: `Content of Tab Pane 3`,
	},
  ];

const AssignmentsDetailsTab = (props) => {
	const [uploadModalOpen, setUploadModalOpen] = useState(false);
	
	const openUploadImageModal = () => {
		setUploadModalOpen(true);
	}	
	  
	const handleOk = () => {
		setUploadModalOpen(false);
	};
	
	const handleCancel = () => {
		setUploadModalOpen(false);
	};
	
	return (
		<div className={styles.assignmentsDetailsTab}>
			<Modal title="Basic Modal" open={uploadModalOpen} onOk={handleOk} onCancel={handleCancel} size={'large'} style={{maxWidth: '600px', maxHeight: '800px'}}>
				<ImageUpload />
			</Modal>
			<div style={{display: 'flex', gap: '5px'}}>
				<BugType />
				<p className={styles.assginmentId}>DEV-03</p>
			</div>
			<p className={styles.title}>
				{sampleAssignment.title}
			</p>
			<div className={styles.utilCards}>
				<div className={styles.attachCard} onClick={openUploadImageModal}>
					<AttachIcon />
					<p style={{fontWeight: 700}}>Attach</p>
				</div>
				<div className={styles.subtaskCard}>
					<SubnodeOutlined style={{fontSize: '18px'}} />
					<p style={{fontWeight: 700}}>Create subtask</p>
				</div>
				<div className={styles.linkIssueCard}>
					<LinkOutlined style={{fontSize: '18px'}} />
					<p style={{fontWeight: 700}}>link issue</p>
				</div>
				<div className={styles.moreCard} onClick={() => {props.showPanel()}}>
					<MoreOutlined style={{fontSize: '20px', fontWeight: 700, transform: 'rotate(90deg)'}}/>
				</div>
			</div>
			<Tabs defaultActiveKey="1" items={items} />

		</div>
	)
}

export default AssignmentsDetailsTab;
