import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Router from './router/Router'
const App = () => {
	return (
		<div className='bg-black h-screen'>
			<Navbar />
			<Router />
			<Footer />
		</div>
	)
}

export default App
