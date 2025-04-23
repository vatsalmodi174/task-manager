
import { images } from '../../assets/assets'
import { Link } from 'react-router-dom'


function Landindcomponet() {
  // {landingPage}
  return (
    <>
    <div className="h-[600px] mt-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl container mx-auto px-4">
      <div className="flex flex-col items-center justify-center h-full text-white space-y-1">
      <img 
        src={images.imagethree} 
        alt="" 
        className="h-40 w-40  "
      />
        <h1 className="text-6xl font-bold">Let's Manage</h1>
        <h1 className="text-6xl font-bold">Your Own Tasks</h1>
       <Link to={'/dashboard'}><button className="mt-8 bg-white text-purple-700 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition">
          Get Started
        </button></Link>
      </div>
    </div>
  </>
  )
}

export default Landindcomponet