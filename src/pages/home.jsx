import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { CardBody, CardContainer, CardItem } from '../components/ui/3d-card'
import { apiClient } from '../utils/apiservice'

const Home = () => {
	const [blogs, setBlogs] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const response = await apiClient.get('/blog/list/')
				setBlogs(response.data)
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}
		fetchBlogs()
	}, [])

	if (loading)
		return (
			<div className='flex items-center justify-center  py-65 '>
				<Loader />
			</div>
		)
	if (error) return <p className='text-red-500 text-center'>Error: {error}</p>

	return (
		<div className='bg-black '>
			<h1 className='text-white text-center font-serif text-3xl pt-4'>
				All blogs
			</h1>
			<div className='bg-black min-h-screen p-6 flex flex-wrap justify-center gap-6'>
				{blogs.map(blog => (
					<Link to={`/blogmore/${blog.id}`} key={blog.id}>
						<CardContainer className='inter-var'>
							<CardBody className='bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border'>
								<CardItem
									translateZ='50'
									className='text-xl font-bold text-neutral-600 dark:text-white'
								>
									{blog.title}
								</CardItem>
								<CardItem
									as='p'
									translateZ='60'
									className='text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300  h-10
               line-clamp-2 overflow-hidden text-ellipsis'
								>
									{blog.description}
								</CardItem>
								<CardItem
									translateZ='100'
									className='w-full  mt-4'
								>
									<img
										src={blog.image}
										height='1000'
										width='1000'
										className='h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl'
										alt='thumbnail'
									/>
								</CardItem>
								<div className='flex justify-between items-center mt-4'>
									<CardItem
										translateZ={20}
										className='px-4 py-2 rounded-xl text-xs font-normal dark:text-white'
									>
										Read More →
									</CardItem>
								</div>
							</CardBody>
						</CardContainer>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Home
