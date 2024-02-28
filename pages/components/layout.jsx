
import NavBar from './Navbar';

// eslint-disable-next-line react/prop-types
const MyLayout = ({ children }) => {
  return (
    <div className="relative">
      <div  className="fixed z-10 top-0 w-full">
      <NavBar/>
      </div>
      <div className="mt-11">{children}</div>
    </div>
  )
}

export default MyLayout;