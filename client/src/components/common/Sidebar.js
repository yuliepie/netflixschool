import React from 'react'
import {Link} from 'react-router-dom';
import {SidebarData} from './SidebarData'
import './Sidebar.css';
import { IconContext } from 'react-icons';
import Footer from './Footer'


function Sidebar() {
    // const [sidebar, setSidebar] = useState(true);

    // // const showSidebar = () => setSidebar(!sidebar)

    // const showSidebar = () => {
    //     if (window.location.pathname === "/test") {
    //         return <SideComponent props = {false}/>
    //     }
    //     return <SideComponent props = {true}/>
    // }

    return (
        <>
            <IconContext.Provider value={{color:'white'}}>
                <nav className='nav-menu active'>
                    <ul className="nav-menu-items" >
                        <div className="logoInline">
                            <h1>Netflix school</h1>
                        </div>
                        {SidebarData.map((item) => {
                            return(
                                <div key={item.title} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </div>
                            )
                        })}
                        <br />
                        <div className="footerIn">
                            <hr />
                            <Footer />
                        </div>
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default Sidebar;
