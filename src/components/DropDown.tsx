import React  from 'react';




type DropDownProps = {
    options: string[]
    selected: string
    label: string
    onSelectionChange: (e: string, lable: string)=>void
}


const DropDown = ({options, selected, label, onSelectionChange}: DropDownProps)=>{

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        onSelectionChange(e.target.value, label)
    }
    
    return (
        <div>
             
                <label>{label}</label>
                <select  value={selected} onChange={(e)=>onChangeHandler(e)}>
                        {options.map((elm: string)=>{
                            return <option data-testid="option" key={elm} value={elm}>{elm}</option>
                        })}
                </select>
     

        </div>
    )
}

export default DropDown
