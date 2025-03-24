import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, Upload, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../utils/apiservice'

const Register = () => {
	const navigate = useNavigate()

	const onFinish = async values => {
		try {
			const formData = new FormData()
			formData.append('username', values.username)
			formData.append('phone_number', values.phoneNumber)
			formData.append('password', values.password)
			formData.append('password2', values.confirmPassword)

			if (values.avatar && values.avatar[0]?.originFileObj) {
				formData.append('avatar', values.avatar[0].originFileObj)
			}

			await apiClient.post('/account/register/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})

			message.success('Registration successful! Logging in...')
			handleLogin(values.phoneNumber, values.password)
		} catch (error) {
			console.log('Serverdan kelgan xato:', error.response?.data)
			message.error(
				error.response?.data?.message || 'Registration failed'
			)
		}
	}

	const handleLogin = async (phoneNumber, password) => {
		try {
			const res = await apiClient.post('/account/login/', {
				phoneNumber,
				password,
			})

			const { access, refresh } = res.data
			localStorage.setItem('accessToken', access)
			localStorage.setItem('refreshToken', refresh)

			message.success('Login successful! Fetching user data...')

			getUserData()
		} catch (error) {
			message.success('Endi Login qiling')
			navigate('/login')
		}
	}

	const getUserData = async () => {
		try {
			const token = localStorage.getItem('accessToken')
			const res = await apiClient.get('/account/user/', {
				headers: { Authorization: `Bearer ${token}` },
			})

			console.log('User data:', res.data)
			navigate('/')
		} catch (error) {
			message.error('Failed to fetch user data!')
		}
	}

	return (
		<div className='bg-black'>
			<div className='container w-[90%] mx-auto flex py-2'>
				<div className='w-1/2 flex justify-center items-center'>
					<div className='bg-white/5 border border-white/5 backdrop-blur-xs p-6 rounded-lg shadow-lg w-[80%] max-w-md '>
						<h2 className='text-white text-center text-2xl '>
							Register
						</h2>
						<Form
							name='basic'
							layout='vertical'
							onFinish={onFinish}
							autoComplete='off'
						>
							<Form.Item
								label={
									<span className='text-white'>Username</span>
								}
								name='username'
								rules={[
									{
										required: true,
										message: 'Please input your username!',
									},
								]}
							>
								<Input className='bg-gray-800 text-white border-gray-600' />
							</Form.Item>

							<Form.Item
								label={
									<span className='text-white'>
										Phone Number
									</span>
								}
								name='phoneNumber'
								rules={[
									{
										required: true,
										message:
											'Please input your phone number!',
									},
								]}
							>
								<Input
									className='bg-gray-800 text-white border-gray-600'
									type='number'
								/>
							</Form.Item>

							<Form.Item
								label={
									<span className='text-white'>Password</span>
								}
								name='password'
								rules={[
									{
										required: true,
										message: 'Please input your password!',
									},
								]}
							>
								<Input.Password className='bg-gray-800 text-white border-gray-600' />
							</Form.Item>

							<Form.Item
								label={
									<span className='text-white'>
										Confirm Password
									</span>
								}
								name='confirmPassword'
								dependencies={['password']}
								rules={[
									{
										required: true,
										message:
											'Please confirm your password!',
									},
								]}
							>
								<Input.Password className='bg-gray-800 text-white border-gray-600' />
							</Form.Item>

							<Form.Item
								label={
									<span className='text-white'>
										Upload Avatar
									</span>
								}
								name='avatar'
								valuePropName='fileList'
								getValueFromEvent={e => e && e.fileList}
							>
								<Upload
									listType='picture'
									beforeUpload={() => false}
									accept='image/*'
								>
									<Button icon={<UploadOutlined />}>
										Click to Upload
									</Button>
								</Upload>
							</Form.Item>

							<Form.Item>
								<Button
									type='primary'
									htmlType='submit'
									className='w-full'
								>
									Submit
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
				<div className='w-1/2 flex justify-center items-center'>
					<img
						className='w-3/4 h-140 object-contain'
						src='https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png'
						alt='logo'
					/>
				</div>
			</div>
		</div>
	)
}

export default Register
