import { Button } from 'react-bootstrap'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
var navbarbutton = document.getElementsByClassName('landinglink')



export default function Header() {
    const [cartshow, setCartshow] = useState(false)
    const navigate = useNavigate();

    const handleCart = () => {
        setCartshow(!cartshow);
    }

    const handleProfile = () => {
        navigate('/dashboard')
    }

    // for (var i = 0; i < navbarbutton.length; i++) {   
    //     navbarbutton[i].addEventListener("click", function() {
    //         document.querySelectorAll('.active').forEach((item) => {
    //             item.classList.remove("active");
    //             })
    //         this.parentElement.classList.add("active");
    //     })
    // }

    return (
        <div className='header-wrapper'>
            <div className="menuLeft">
                <div className="logo">
                    <h1 className="logo-text">Trust PCs</h1>
                </div>
                <div className="menu-items">
                    <div className="link-wrapper landing active"><Link to={'/'} className="landinglink">home</Link></div>
                    <div className="link-wrapper categories"><Link to={'/categories'} className="landinglink">categories</Link></div>
                    <div className="link-wrapper about"><Link to={'/'} className="landinglink">about</Link></div>
                    <div className="link-wrapper contact"><Link to={'/'} className="landinglink">contact</Link></div>
                </div>
            </div>
            <div className="menuRight">
                <div className="theme-switch"><ThemeToggle /></div>
                <Button className="cart button" onClick={handleCart}></Button>
                <Button className="profile button" onClick={handleProfile}></Button>
                {/* <Popover show={cartshow}>

                </Popover> */}
            </div>
        </div>
    )
}
