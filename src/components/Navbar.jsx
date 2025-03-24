import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
	const navigate = useNavigate()
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		const token = localStorage.getItem('accessToken')
		setIsAuthenticated(!!token)

		if (
			!token &&
			window.location.pathname !== '/login' &&
			window.location.pathname !== '/register'
		) {
			navigate('/login')
		}
	}, [navigate])

	const handleLogout = () => {
		localStorage.removeItem('accessToken')
		localStorage.removeItem('refreshToken')
		setIsAuthenticated(false)
		navigate('/login')
	}

	return (
		<div className='border border-b-white/15 bg-white/2 py-5 backdrop-blur-xs sticky top-0 z-11'>
			<div className='container w-[85%] mx-auto'>
				<div className='flex justify-between items-center'>
					<h1 className='text-white text-3xl font-mono font-bold'>
						Future
					</h1>
					<ul className='flex items-center gap-3'>
						{isAuthenticated ? (
							<>
								<Link to='/' className='text-white'>
									<button className='cursor-pointer group relative bg-white/90 hover:bg-zinc-300 text-black font-semibold text-sm px-4 py-2 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-lg w-30'>
										<div className='relative flex items-center justify-center gap-2'>
											<span className='relative inline-block overflow-hidden'>
												<span className='block transition-transform duration-300 group-hover:-translate-y-full'>
													Blogs
												</span>
												<span className='absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0'>
													Bloglar
												</span>
											</span>
											<svg
												className='w-4 h-4 transition-transform duration-200 group-hover:rotate-45'
												viewBox='0 0 24 24'
											>
												<circle
													fill='currentColor'
													r='11'
													cy='12'
													cx='12'
												></circle>
												<path
													stroke-linejoin='round'
													stroke-linecap='round'
													stroke-width='2'
													stroke='white'
													d='M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5'
												></path>
											</svg>
										</div>
									</button>
								</Link>

								<Link to='/profile' className='text-white'>
									<button className='cursor-pointer group relative bg-white/90 hover:bg-zinc-300 text-black font-semibold text-sm px-4 py-2 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-lg w-30'>
										<div className='relative flex items-center justify-center gap-2'>
											<span className='relative inline-block overflow-hidden'>
												<span className='block transition-transform duration-300 group-hover:-translate-y-full'>
													Profile
												</span>
												<span className='absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0'>
													Profil
												</span>
											</span>
											<svg
												className='w-4 h-4 transition-transform duration-200 group-hover:rotate-45'
												viewBox='0 0 24 24'
											>
												<circle
													fill='currentColor'
													r='11'
													cy='12'
													cx='12'
												></circle>
												<path
													stroke-linejoin='round'
													stroke-linecap='round'
													stroke-width='2'
													stroke='white'
													d='M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5'
												></path>
											</svg>
										</div>
									</button>
								</Link>
								<button
									onClick={handleLogout}
									className='cursor-pointer group relative bg-red-500 hover:bg-red-600 text-white font-semibold text-sm px-4 py-2 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-lg w-30'
								>
									<div className='relative flex items-center justify-center gap-2'>
										<span className='relative inline-block overflow-hidden'>
											<span className='block transition-transform duration-300 group-hover:-translate-y-full'>
												Logout
											</span>
											<span className='absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0'>
												Chiqish
											</span>
										</span>
										<svg
											className='w-4 h-4 transition-transform duration-200 group-hover:rotate-45'
											viewBox='0 0 24 24'
										>
											<circle
												fill='currentColor'
												r='11'
												cy='12'
												cx='12'
											></circle>
											<path
												stroke-linejoin='round'
												stroke-linecap='round'
												stroke-width='2'
												stroke='white'
												d='M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5'
											></path>
										</svg>
									</div>
								</button>
							</>
						) : (
							<>
								<Link to='/register' className='text-white'>
									<button className='cursor-pointer group relative bg-white/90 hover:bg-zinc-300 text-black font-semibold text-sm px-4 py-2 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-lg w-30'>
										<div className='relative flex items-center justify-center gap-2'>
											<span className='relative inline-block overflow-hidden'>
												<span className='block transition-transform duration-300 group-hover:-translate-y-full'>
													Register
												</span>
												<span className='absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0'>
													Ro‘yxatdan o‘tish
												</span>
											</span>
											<svg
												className='w-4 h-4 transition-transform duration-200 group-hover:rotate-45'
												viewBox='0 0 24 24'
											>
												<circle
													fill='currentColor'
													r='11'
													cy='12'
													cx='12'
												></circle>
												<path
													stroke-linejoin='round'
													stroke-linecap='round'
													stroke-width='2'
													stroke='white'
													d='M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5'
												></path>
											</svg>
										</div>
									</button>
								</Link>
								<Link to='/login' className='text-white'>
									<button className='cursor-pointer group relative bg-white/90 hover:bg-zinc-300 text-black font-semibold text-sm px-4 py-2 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-lg w-30'>
										<div className='relative flex items-center justify-center gap-2'>
											<span className='relative inline-block overflow-hidden'>
												<span className='block transition-transform duration-300 group-hover:-translate-y-full'>
													Login
												</span>
												<span className='absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0'>
													Kirish
												</span>
											</span>
											<svg
												className='w-4 h-4 transition-transform duration-200 group-hover:rotate-45'
												viewBox='0 0 24 24'
											>
												<circle
													fill='currentColor'
													r='11'
													cy='12'
													cx='12'
												></circle>
												<path
													stroke-linejoin='round'
													stroke-linecap='round'
													stroke-width='2'
													stroke='white'
													d='M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5'
												></path>
											</svg>
										</div>
									</button>
								</Link>
							</>
						)}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Navbar
