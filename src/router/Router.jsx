import React from 'react'
import { useRoutes } from 'react-router-dom'
import Blogmore from '../pages/blogmore'
import Home from '../pages/home'
import Login from '../pages/login'
import ProfilePage from '../pages/profile'
import Register from '../pages/register'

const Router = () => {
	return useRoutes([
		{
			path: '/',
			element: <Home />,
		},
		{
			path: '/login',
			element: <Login />,
		},
		{
			path: '/register',
			element: <Register />,
		},
		{
			path: '/profile',
			element: <ProfilePage />,
		},
		{
			path: '/blogmore/:blogid',
			element: <Blogmore />,
		},
	])
}

export default Router
