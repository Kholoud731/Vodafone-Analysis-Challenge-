
const ThemeSwitch = ()=>{
    return (
        <div className='theme'>
        <span className='dark'> Dark Mode </span> 
     <label htmlFor='switch' className="switch">
     <input id="switch" type="checkbox"/>
     <span className="slider round"></span>
     </label>
     </div>
    )
}

export default ThemeSwitch