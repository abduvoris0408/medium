'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { TracingBeam } from '../components/ui/tracing-beam'
import { apiClient } from '../utils/apiservice'

const Blogmore = () => {
	const { blogid } = useParams()
	const [blog, setBlog] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		apiClient
			.get(`/blog/retrieve/${blogid}`)
			.then(response => {
				setBlog(response.data)
				setLoading(false)
			})
			.catch(error => {
				console.error('Xatolik:', error)
				setLoading(false)
			})
	}, [blogid])

	return (
		<div className='bg-black py-6'>
			<TracingBeam className='px-6'>
				<div className='max-w-2xl mx-auto antialiased pt-4 relative'>
					{loading ? (
						<div className='flex items-center justify-center  py-65'>
							<Loader />
						</div>
					) : (
						<div className='mb-10'>
							<h2 className='bg-black text-white rounded-full text-2xl w-fit px-4 py-1 mb-4 '>
								Blog haqida
							</h2>
							<p className={'text-xl mb-4 text-white'}>
								{blog?.title}
							</p>

							<div className='text-sm prose prose-sm dark:prose-invert'>
								{blog?.image && (
									<img
										src={blog.image}
										alt='blog thumbnail'
										className='rounded-lg mb-10 object-cover w-125 h-125'
									/>
								)}
								<p className='text-white'>
									{blog?.description}
								</p>
							</div>

							<div className='flex items-center gap-4 mt-6'>
								<img
									src={
										blog?.owner?.avatar ||
										'https://via.placeholder.com/50'
									}
									alt={blog?.owner?.full_name}
									width={50}
									height={50}
									className='w-10 h-10 rounded-full border-2 border-gray-700'
								/>
								<div>
									<p className='text-white font-medium'>
										{blog?.owner?.full_name}
									</p>
									<p className='text-gray-500 text-xs'>
										{new Date(
											blog?.date_created
										).toLocaleDateString()}
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</TracingBeam>
		</div>
	)
}
export default Blogmore
