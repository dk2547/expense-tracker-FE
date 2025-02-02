import "./NavBar.css"
import { Link } from "react-router"
export default function NavBar(){
    return(
        <nav className="nav-container">
          <ul>
        <li> <Link to='/'>Home</Link></li>
       <li><Link to='/dashboard'>Dashboard</Link></li>
       <li><Link to='/report'>Report</Link></li>
        </ul>
      </nav>
    )
}