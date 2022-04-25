import React, {useEffect} from 'react'

export default function Landing() {
    useEffect(() => {
        document.querySelectorAll('.active').forEach((item) => {
            item.classList.remove("active");
            })
        document.getElementsByClassName('landing')[0].classList.add('active')
    }, [])
    return (
        <div>Landing</div>
    )
}
