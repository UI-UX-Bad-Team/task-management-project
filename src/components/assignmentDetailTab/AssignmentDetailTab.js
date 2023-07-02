import React, {useState, useRef} from 'react';
import styles from './AssignmentDetailTab.module.css';
import { AttachIcon } from '../../data/icon';
import {Tabs, Tag, Avatar, Modal, Image, Input, Button} from 'antd';
import { SubnodeOutlined, LinkOutlined, MoreOutlined, PlusOutlined, ArrowUpOutlined } from '@ant-design/icons';
import ImageUpload from '../imageUpload/ImageUpload';
import CommentBox from '../commentBox/CommentBox';
import {useParams} from 'react-router-dom';
import {BugType, ImprovementType, NewFeatureType, SubtaskType, StoryType} from '../../data/issueTypes';
import 'react-quill/dist/quill.snow.css';
import Editor from './Editor';
import ReactDOMServer from 'react-dom/server';
import 'react-quill/dist/quill.snow.css';



let db = [
	{ Id: 'Task 1', Title:"New requirements gathered from the customer", Status: 'Open', Summary: 'Analyze the new requirements gathered from the customer.', Type: 'Story', Priority: 'Low', Tags: 'Analyze,Customer', Estimate: 3.5, Assignee: 'Bui Danh Tung',Reviewer:"Mac Van Khanh", Cc:"Dinh Trong Huy", RankId: 1 },
	{ Id: 'Task 2', Title:"Fix IE browser's issues", Status: 'InProgress', Summary: 'Fix the issues reported in the IE browser.', Type: 'Bug', Priority: 'Critical', Tags: 'IE', Estimate: 2.5, Assignee: 'Dinh Trong Huy',Reviewer:"Ta Duc Tien",Cc:"Dao Trong Hoan", RankId: 2  },
	{ Id: 'Task 3', Title:"Fix customer reporting issues",Status: 'Testing', Summary: 'Fix the issues reported by the customer.', Type: 'Bug', Priority: 'High', Tags: 'Customer', Estimate: '3.5', Assignee: 'Bui Danh Tung',Reviewer:"Mac Van Khanh",Cc:"Nguyen Duy Hung", RankId: 1 },
	{ Id: 'Task 4', Title:"Arrange a web meeting", Status: 'Done', Summary: 'Arrange a web meeting with the customer to get the login page requirements.', Type: 'NewFeature', Priority: 'Low', Tags: 'Meeting', Estimate: 2, Assignee: 'Dinh Trong Huy',Reviewer: "Ta Duc Tien",Cc:"Bui Danh Tung", RankId: 1 },
	{ Id: 'Task 5', Title:"Validate new requirements", Status: 'Testing', Summary: 'Validate new requirements', Type: 'Improvement', Priority: 'Critical', Tags: 'Validation', Estimate: 1.5, Assignee: 'Bui Danh Tung',Reviewer:"Pham Trung Dung",Cc:"Vu Minh Dang", RankId: 1 },
	{ Id: 'Task 6', Title:"Testing I18n translator new feature", Status: 'Testing', Summary: 'We developed I18n new translator feature for advertisement page. Please test to confirm it work properly!', Type: 'Improvement', Priority: 'Critical', Tags: 'Test', Estimate: 1.5, Assignee: 'Dao Trong Hoan',Reviewer:"Ta Duc Tien",Cc:"Dinh Trong Huy", RankId: 1 },
];


const issueTypeIcon = {
	'Bug' : <BugType />,
	'Improvement' : <ImprovementType />,
	'Story' : <StoryType />,
	'NewFeature' : <NewFeatureType />,
	'Subtask' : <SubtaskType />
}
const initialComment = [
	{
		createdPerson : 'Dinh Trong Huy',
		createdTime: new Date().toLocaleString(),
		isEditted : true,
		commentContent : "please read doc more carefully because there are some point that not clear."
	}
]

const GeneralTab = () => {
	const params = useParams();
	const assignmentId = parseInt(params.assignmentId);
	const [comments, setComments] = useState(initialComment);
	const [uploadModalOpen, setUploadModalOpen] = useState(false);
	const  [lastComment, setLastComment] = useState("")
	const childRef = useRef();

	const openUploadImageModal = () => {
		setUploadModalOpen(true);
	}	
	  
	const handleOk = () => {
		setUploadModalOpen(false);
	};
	
	const handleCancel = () => {
		setUploadModalOpen(false);
	};

	const selectedAssignment = db[assignmentId-1]
	const createMarkup = (htmlString) => {
    return { __html: htmlString };
  }	;

	const addCommentHandler = () => {

		setComments(prev => [...prev, {
			createdPerson: 'Bui Danh Tung',
			createdTime: new Date().toLocaleDateString(),
			isEditted: false,
			commentContent: lastComment,
		}])

		if (childRef.current) {
			childRef.current.refreshEditor();
		}
	}

	const getCommentValueHandler = ({editorHtml: html}) => {
		console.log(html);
		setLastComment(html);
	}

	return (
		<div className={styles.generalTab}>
			<Modal title="Basic Modal" open={uploadModalOpen} onOk={handleOk} onCancel={handleCancel} size={'large'} style={{maxWidth: '600px', maxHeight: '800px'}}>
				<ImageUpload />
			</Modal>
			<p className={styles.descriptionTitle}> Description</p>
			<p className={styles.description}>{selectedAssignment.Summary}</p>
			<div className={styles.assignee}>
				<p className={styles.assigneeTitle}>Assignee: </p>
				<div className={styles.assigneeName}>
					<Avatar src={'/images/avatar1.jpg'} size={28} />
					{selectedAssignment.Assignee}
				</div>
			</div>
			<div className={styles.reviewer}>
				<p className={styles.reviewerTitle}>Reviewer: </p>
				<div className={styles.reviewerName}>
					<Avatar src={'/images/avatar2.jpg'} size={28} />
					{selectedAssignment.Reviewer}
				</div>
			</div>
			<div className={styles.components}>
				<p className={styles.componentsTitle}>Components: </p>
				<div className={styles.componentTags}>
					<Tag color="#2db7f5">{selectedAssignment.Tags}</Tag>
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
					{/* <CommentBox 
						createdPerson="Dinh Trong Huy" 
						createdTime={new Date().toLocaleString()}  
						isEditted={false}
						commentContent="please read doc more carefully because there are some point that not clear."
						/> */}
					{comments.map(comment => {
						return <CommentBox 
							createdPerson={comment.createdPerson} 
							createdTime={comment.createdTime}  
							isEditted={comment.isEditted}
							commentContent={comment.commentContent}
						/>
					})}
				</div>
				<div className={styles.newComment}>
					<Avatar src='/images/avatar1.jpg'/>
					<Editor getValue={getCommentValueHandler} ref={childRef}/>
				</div>
				<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px'}}>
					<div style={{display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px'}}>
						<p style={{fontSize: '14px', fontWeight: 700, color: '#777'}}>Pro tip: </p>
						<p >Press <Tag size={20} color="#ccc">M</Tag> to comment</p>
					</div>
					<div style={{display: 'flex', gap: '5px'}}>
						<Button size={'middle'}>Clear</Button>
						<Button type="primary" size={'middle'} onClick={addCommentHandler}>
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
	const params = useParams();
	const assignmentId = parseInt(params.assignmentId);

	const openUploadImageModal = () => {
		setUploadModalOpen(true);
	}	
	  
	const handleOk = () => {
		setUploadModalOpen(false);
	};
	
	const handleCancel = () => {
		setUploadModalOpen(false);
	};

	const selectedAssignment = db[assignmentId-1];
	
	return (
		<div className={styles.assignmentsDetailsTab}>
			<Modal title="Basic Modal" open={uploadModalOpen} onOk={handleOk} onCancel={handleCancel} size={'large'} style={{maxWidth: '600px', maxHeight: '800px'}}>
				<ImageUpload />
			</Modal>
			<div style={{display: 'flex', gap: '5px'}}>
				{issueTypeIcon[selectedAssignment.Type]}
				<p className={styles.assginmentId}>{selectedAssignment.Id}</p>
			</div>
			<p className={styles.title}>
				{selectedAssignment.Title}
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
