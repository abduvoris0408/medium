// import { CheckOutlined, EditOutlined, UserOutlined } from '@ant-design/icons'
// import {
// 	Avatar,
// 	Button,
// 	Card,
// 	Col,
// 	DatePicker,
// 	Form,
// 	Input,
// 	Row,
// 	Select,
// 	Typography,
// } from 'antd'
// import React, { useState } from 'react'

// const { Title, Text } = Typography
// const { Option } = Select

// const ProfilePage = () => {
// 	const [isEditing, setIsEditing] = useState(false)
// 	const [form] = Form.useForm()

// 	const initialValues = {
// 		full_name: 'John Doe',
// 		title: 'Software Engineer',
// 		email: 'johndoe@example.com',
// 		phone_number: '+1234567890',
// 		town_city: 'New York, USA',
// 		date_birth: null,
// 		gender: 'Male',
// 	}

// 	const handleEdit = () => {
// 		setIsEditing(!isEditing)
// 	}

// 	const handleFinish = values => {
// 		console.log('Updated values:', values)
// 		setIsEditing(false)
// 	}

// 	return (
// 		<div className='bg-black pb-35'>
// 			<Row
// 				justify='center'
// 				style={{ marginTop: 50, position: 'relative', zIndex: 10 }}
// 			>
// 				<Col xs={24} sm={18} md={12} lg={10}>
// 					<Card
// 						style={{
// 							textAlign: 'center',
// 							borderRadius: 10,
// 							boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
// 							position: 'relative',
// 							zIndex: 20,
// 						}}
// 					>
// 						<Avatar
// 							size={100}
// 							icon={<UserOutlined />}
// 							style={{ marginBottom: 20 }}
// 						/>
// 						{!isEditing ? (
// 							<>
// 								<Title level={3}>
// 									{initialValues.full_name}
// 								</Title>
// 								<Text type='secondary'>
// 									{initialValues.title}
// 								</Text>
// 								<br />
// 								<Text strong>Email:</Text> {initialValues.email}
// 								<br />
// 								<Text strong>Phone:</Text>{' '}
// 								{initialValues.phone_number}
// 								<br />
// 								<Text strong>Location:</Text>{' '}
// 								{initialValues.town_city}
// 								<br />
// 								<Text strong>Birthdate:</Text> January 1, 1990
// 								<br />
// 								<Text strong>Gender:</Text>{' '}
// 								{initialValues.gender}
// 								<br />
// 								<Button
// 									type='primary'
// 									icon={<EditOutlined />}
// 									style={{ marginTop: 20 }}
// 									onClick={handleEdit}
// 								>
// 									Edit Profile
// 								</Button>
// 							</>
// 						) : (
// 							<Form
// 								form={form}
// 								layout='vertical'
// 								onFinish={handleFinish}
// 								initialValues={initialValues}
// 							>
// 								<Form.Item
// 									name='full_name'
// 									label='Full Name'
// 									rules={[{ required: true }]}
// 								>
// 									<Input />
// 								</Form.Item>
// 								<Form.Item name='title' label='Title'>
// 									<Input />
// 								</Form.Item>
// 								<Form.Item
// 									name='email'
// 									label='Email'
// 									rules={[{ required: true, type: 'email' }]}
// 								>
// 									<Input />
// 								</Form.Item>
// 								<Form.Item
// 									name='phone_number'
// 									label='Phone Number'
// 								>
// 									<Input />
// 								</Form.Item>
// 								<Form.Item name='town_city' label='Location'>
// 									<Input />
// 								</Form.Item>
// 								<Form.Item name='date_birth' label='Birthdate'>
// 									<DatePicker style={{ width: '100%' }} />
// 								</Form.Item>
// 								<Form.Item name='gender' label='Gender'>
// 									<Select>
// 										<Option value='Male'>Male</Option>
// 										<Option value='Female'>Female</Option>
// 										<Option value='Other'>Other</Option>
// 									</Select>
// 								</Form.Item>
// 								<Form.Item>
// 									<Button
// 										type='primary'
// 										icon={<CheckOutlined />}
// 										htmlType='submit'
// 										block
// 									>
// 										Save Changes
// 									</Button>
// 								</Form.Item>
// 							</Form>
// 						)}
// 					</Card>
// 				</Col>
// 			</Row>
// 		</div>
// 	)
// }

// export default ProfilePage

import { CheckOutlined, EditOutlined, UserOutlined } from '@ant-design/icons'
import {
	Avatar,
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	Row,
	Select,
	Typography,
	message,
} from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../utils/apiservice'

const { Title, Text } = Typography
const { Option } = Select

const ProfilePage = () => {
	const [isEditing, setIsEditing] = useState(false)
	const [form] = Form.useForm()
	const [userData, setUserData] = useState(null)
	const navigate = useNavigate()

	const fetchUserData = async () => {
		try {
			const response = await apiClient.get('/account/me')
			setUserData(response.data)
			form.setFieldsValue({
				...response.data,
				date_birth: response.data.date_birth
					? dayjs(response.data.date_birth)
					: null,
			})
		} catch (error) {
			console.error('Error fetching user data:', error)
			message.error('Failed to load profile data.')
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('accessToken')
		if (!token) {
			message.warning('Please log in first.')
			navigate('/login')
		} else {
			fetchUserData()
		}
	}, [])

	const handleEdit = () => {
		setIsEditing(true)
	}

	const handleFinish = async values => {
		try {
			const updateData = {
				...values,
				date_birth: values.date_birth
					? values.date_birth.format('YYYY-MM-DD')
					: null,
				gender: Number(values.gender),
			}

			await apiClient.patch('/account/me/', updateData)
			message.success('Profile updated successfully!')
			setIsEditing(false)
			fetchUserData()
		} catch (error) {
			console.error('Error updating profile:', error)
			console.error('Serverdan qaytgan xato:', error.response?.data)
			message.error(
				error.response?.data?.message || 'Failed to update profile.'
			)
		}
	}

	const handleCancel = () => {
		setIsEditing(false)
		form.setFieldsValue({
			...userData,
			date_birth: userData?.date_birth
				? dayjs(userData.date_birth)
				: null,
		})
	}

	return (
		<div className='bg-black pb-35'>
			<Row
				justify='center'
				style={{ marginTop: 50, position: 'relative', zIndex: 10 }}
			>
				<Col xs={24} sm={18} md={12} lg={10}>
					<Card
						style={{
							textAlign: 'center',
							borderRadius: 10,
							boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
						}}
					>
						<Avatar
							size={100}
							icon={<UserOutlined />}
							style={{ marginBottom: 20 }}
						/>

						{!isEditing ? (
							<>
								<Title level={3}>
									{userData?.full_name || 'Loading...'}
								</Title>
								<Text type='secondary'>{userData?.title}</Text>
								<br />
								<Text strong>Email:</Text> {userData?.email}
								<br />
								<Text strong>Phone:</Text>{' '}
								{userData?.phone_number}
								<br />
								<Text strong>Location:</Text>{' '}
								{userData?.town_city}
								<br />
								<Text strong>Birthdate:</Text>{' '}
								{userData?.date_birth || 'N/A'}
								<br />
								<Text strong>Gender:</Text> {userData?.gender}
								<br />
								<Button
									type='primary'
									icon={<EditOutlined />}
									style={{ marginTop: 20 }}
									onClick={handleEdit}
								>
									Edit Profile
								</Button>
							</>
						) : (
							<Form
								form={form}
								layout='vertical'
								onFinish={handleFinish}
							>
								<Form.Item
									name='full_name'
									label='Full Name'
									rules={[{ required: true }]}
								>
									<Input />
								</Form.Item>
								<Form.Item name='title' label='Title'>
									<Input />
								</Form.Item>
								<Form.Item
									name='email'
									label='Email'
									rules={[{ required: true, type: 'email' }]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									name='phone_number'
									label='Phone Number'
								>
									<Input />
								</Form.Item>
								<Form.Item name='town_city' label='Location'>
									<Input />
								</Form.Item>
								<Form.Item name='date_birth' label='Birthdate'>
									<DatePicker style={{ width: '100%' }} />
								</Form.Item>
								<Form.Item name='gender' label='Gender'>
									<Select>
										<Option value={1}>Male</Option>
										<Option value={2}>Female</Option>
										<Option value={3}>Other</Option>
									</Select>
								</Form.Item>
								<Form.Item>
									<Button
										type='primary'
										icon={<CheckOutlined />}
										htmlType='submit'
										block
									>
										Save Changes
									</Button>
									<Button
										type='default'
										onClick={handleCancel}
										block
										style={{ marginTop: 10 }}
									>
										Cancel
									</Button>
								</Form.Item>
							</Form>
						)}
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default ProfilePage
