import React from 'react'
import {NavLink} from 'react-router-dom';
import {SidebarData} from './SidebarData'
import './Sidebar.css';
import { IconContext } from 'react-icons';
import Footer from './Footer'
import {BiCameraMovie} from 'react-icons/bi'


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
                            <h1>Netflixschool<BiCameraMovie style={{color:'black'}}/></h1>
                        </div>
                        <div className="nav-text-boxs">
                            {SidebarData.map((item) => {
                                return(
                                    <div key={item.title} activeClassName="active" className={item.cName}>
                                        <NavLink
                                        exact={item.title === 'Main'} to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </div>
                                )
                            })}
                        </div>
                        <br />
                        <div className="footerIn">
                            <Footer />
                        </div>
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default Sidebar;
