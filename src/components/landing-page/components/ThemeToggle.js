import React, { useEffect, useState } from 'react'
import '../css/themetoggle.css'
import "https://code.iconify.design/1/1.0.4/iconify.min.js"
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function ThemeToggle() {
    const [toggle, setToggle] = useState();
    useEffect(() => {
        initialTheme()
    }, [])
    function initialTheme(){
        var root = document.querySelector(':root');
        if (cookies.get('theme') === 'light'){
            root.style.setProperty('--background', "#F6F6F6")
            root.style.setProperty('--main', '#111111')
            setToggle(false)
        }
        else if(cookies.get('theme') === 'dark'){
            root.style.setProperty('--background', "#111111")
            root.style.setProperty('--main', '#F6F6F6')
            setToggle(true)
        }
    }
    function toggleTheme(){
        var root = document.querySelector(':root');
        if (cookies.get('theme') === 'light'){
            root.style.setProperty('--background', "#111111")
            root.style.setProperty('--main', '#EBEBEB')
            root.style.setProperty('--secondary', '#CCCCCC')
            cookies.set('theme', 'dark', {sameSite: 'lax'})
        }
        else{
            root.style.setProperty('--background', "#F6F6F6")
            root.style.setProperty('--main', '#111111')
            cookies.set('theme', 'light', {sameSite: 'lax'})
        }
        
    }
    return (
        <>
            <label>
            <input className='toggle-checkbox' type='checkbox' defaultChecked={ toggle }></input>
            <div className='toggle-slot' onClick={toggleTheme}>
                <div className='sun-icon-wrapper'>
                <div className="iconify sun-icon" data-icon="feather-sun" data-inline="false"></div>
                </div>
                <div className='toggle-button'></div>
                <div className='moon-icon-wrapper'>
                <div className="iconify moon-icon" data-icon="feather-moon" data-inline="false"></div>
                </div>
            </div>
        </label>
        </>
        
    )
}
