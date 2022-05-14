
import { useEffect, useRef, useState } from 'react';



const ThemeSwitch = ()=>{

    const switchRef = useRef<HTMLInputElement>(null)
    const [theme, setTheme] = useState('')

    useEffect(()=>{
        
        if(window.localStorage.getItem('theme') && switchRef.current?.className !== 'active'){
            setTheme('Dark')
            document.body.style.background = "#2d2c2c"
            document.body.style.color = "white"
            switchRef.current?.classList.add("active")
            switchRef.current?.click()
        }


    },[theme])

    const changetheme = (e: React.MouseEvent<HTMLInputElement, MouseEvent>)=>{
        if(theme && switchRef.current?.className === 'active'){
            window.localStorage.removeItem('theme')
            switchRef.current?.classList.remove("active")
            setTheme('')
            document.body.style.background = "#eee"
            document.body.style.color = "#2d2c2c"
        }else if(theme && switchRef.current?.className !== 'active'){
            window.localStorage.setItem('theme', 'Dark')
            switchRef.current?.classList.add("active")

        }else{
            window.localStorage.setItem('theme', 'Dark')
            setTheme('Dark')
        }
    }


    return (
        <div className='theme'>
        <span className='dark'> Dark Mode </span> 
     <label htmlFor='switch' className="switch">
     <input id="switch" type="checkbox" onClick={(e)=>changetheme(e)} ref={switchRef}/>
     <span className="slider round"></span>
     </label>
     </div>
    )
}

export default ThemeSwitch