import React from 'react'
import Header from './components/Header'
import Cookies from 'universal-cookie'

const cookies = new Cookies();
if (cookies.get('theme') == null){
    cookies.set('theme', 'light', {sameSite: 'lax'})
}

export default function LandingPage() {
    return (
        <>
            <div className='landing-wrapper'>
                <Header />
            </div>
        </>
  )
}
