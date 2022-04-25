import React, { useEffect } from 'react'
import { Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Cookies from 'universal-cookie'
import Landing from './components/Landing';
import Categories from './components/Categories';

const cookies = new Cookies();
if (cookies.get('theme') == null){
    cookies.set('theme', 'light', {sameSite: 'lax'})
}

export default function LandingPage() {
    

    return (
        <>
            <div className='landing-wrapper'>
                <Header />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/categories" element={<Categories />} />
                </Routes>
                
            </div>
        </>
  )
}
