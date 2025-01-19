import "./NavBar.css"
import { Link } from "react-router"
export default function NavBar(){
    return(
        <nav>
         <Link to='/'>Home</Link>
        <Link to='/dashboard'><li >Dashboard</li></Link>
        <Link to='/report'><li >Report</li></Link>
      </nav>
    )
}