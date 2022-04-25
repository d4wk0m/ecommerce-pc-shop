import React, {useEffect} from 'react'

export default function Categories() {
    useEffect(() => {
        document.querySelectorAll('.active').forEach((item) => {
            item.classList.remove("active");
            })
        document.getElementsByClassName('categories')[0].classList.add('active')
    }, [])
    return (
        <div>Categories</div>
    )
}
