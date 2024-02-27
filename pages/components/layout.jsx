
import NavBar from './NavBar';

const MyLayout = ({ children }) => {
  return (
    <div className="relative">
      <NavBar/>
      <div className="p-4">{children}</div>
    </div>
  )
}

export default MyLayout;