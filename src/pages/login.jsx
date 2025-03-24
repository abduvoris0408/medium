import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../utils/apiservice'

const Login = () => {
	const navigate = useNavigate()

	const onFinish = async values => {
		try {
			const res = await apiClient.post('/account/login/', {
				phone_number: values.phoneNumber,
				password: values.password,
			})

			console.log('Serverdan kelgan javob:', res.data)

			const { access, refresh } = res.data.data.token

			if (!access || !refresh) {
				throw new Error('Server token qaytarmadi!')
			}

			localStorage.setItem('accessToken', access)
			localStorage.setItem('refreshToken', refresh)

			message.success('Login successful! Redirecting...')
			navigate('/')
		} catch (error) {
			console.error('Xatolik:', error.response?.data || error.message)
			message.error(
				error.response?.data?.message ||
					'Login failed! Please check your credentials.'
			)
		}
	}

	return (
		<div className='bg-black'>
			<div className='container w-[90%] mx-auto flex py-2 '>
				<div className='w-1/2 flex justify-center items-center'>
					<div className='bg-white/5 border border-white/5 backdrop-blur-xs p-6 rounded-lg shadow-lg w-[80%] max-w-md  z-15'>
						<h2 className='text-white text-center text-2xl '>
							Login
						</h2>
						<Form
							name='basic'
							layout='vertical'
							initialValues={{ remember: true }}
							onFinish={onFinish}
							autoComplete='off'
						>
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
									{
										pattern: /^[0-9]+$/,
										message: 'Only numbers are allowed!',
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

export default Login
