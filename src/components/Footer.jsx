import React from 'react'
import { FaDiscord, FaGithub, FaInstagram, FaTelegram } from 'react-icons/fa'

const Footer = () => {
	return (
		<div className=' bg-black  py-5 backdrop-blur-xs sticky w-full  z-10 flex justify-between items-center px-6 text-white'>
			<div className='container w-[85%] mx-auto flex justify-between '>
				<span>2025 Future All Rights Reserved</span>
				<div className='flex gap-4'>
					<a
						href='https://github.com/'
						target='_blank'
						rel='noopener noreferrer'
					>
						<FaGithub size={24} />
					</a>
					<a
						href='https://discord.com/'
						target='_blank'
						rel='noopener noreferrer'
					>
						<FaDiscord size={24} />
					</a>
					<a
						href='https://t.me/'
						target='_blank'
						rel='noopener noreferrer'
					>
						<FaTelegram size={24} />
					</a>
					<a
						href='https://instagram.com/'
						target='_blank'
						rel='noopener noreferrer'
					>
						<FaInstagram size={24} />
					</a>
				</div>
			</div>
		</div>
	)
}

export default Footer
