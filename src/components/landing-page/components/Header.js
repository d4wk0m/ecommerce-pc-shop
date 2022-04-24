import { Button, Popover } from 'react-bootstrap'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDatabase } from '../../products/context/DatabaseContext'
import { useAuth } from '../../authentication-module/context/AuthContext'
import ThemeToggle from './ThemeToggle'

export default function Header() {
    const [cartshow, setCartshow] = useState(false)
    const { checkUser } = useDatabase()
    const { currentUser } = useAuth();

    const handleCart = () => {
        setCartshow(!cartshow);
    }

    const addOffer = () => {
        checkUser(currentUser.email)
    }

    return (
        <div className='header-wrapper'>
            <div className="menuLeft">
                <div className="logo">
                    <h1 className="logo-text">Trust PCs</h1>
                </div>
                <div className="menu-items">
                    <div className="link-wrapper home active"><Link to={'/dashboard'} className="landinglink">home</Link></div>
                    <div className="link-wrapper categories"><Link to={'/dashboard'} className="landinglink">categories</Link></div>
                    <div className="link-wrapper about"><Link to={'/dashboard'} className="landinglink">about</Link></div>
                    <div className="link-wrapper contact"><Link to={'/dashboard'} className="landinglink">contact</Link></div>
                </div>
            </div>
            <div className="menuRight">
                <div className="theme-switch"><ThemeToggle /></div>
                <Button className="cart button" onClick={handleCart}></Button>
                <Button className="profile button" onClick={addOffer}></Button>
                <Popover show={cartshow}>

                </Popover>
            </div>
        </div>
    )
}
