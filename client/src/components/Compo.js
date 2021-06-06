import Navbar from './Navbar'
import HomePage from './HomePage'
import MainPage from './MainPage'

export default function Compo() {
    return (
        
        <div>
            <Navbar/>
            {
                window.sessionStorage.getItem("status")==="online"&&
                <HomePage/>
            }
            {
                (window.sessionStorage.getItem("status")==="offline"||window.sessionStorage.getItem("status")===null)&&
                <MainPage/>
            }

        </div>
    )
}


  