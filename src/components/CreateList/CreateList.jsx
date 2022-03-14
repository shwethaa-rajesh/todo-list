import {useState} from 'react';
import './CreateList.css'
const CreateList=(props)=>{

    
    const [enteredList,setEnteredList]=useState('');
    
    const submitHandler = (event) => {
        event.preventDefault();
        const newList = {
            name: enteredList,
            tasks:[]
          };
            props.onCreateList(newList,)
            setEnteredList("");
        };
       // console.log(newTask)
        
    
    
    const listChangeHandler=(event)=>{
        setEnteredList(event.target.value)
    }
    return(
        <div className='create-task'>
            <h1>Create List</h1>
            <form onSubmit={submitHandler}>
                <div>
                        <input
                            value={enteredList}
                            onChange={listChangeHandler}
                            type="text"
                        ></input>
                </div>
                <button type="submit">Submit</button>
                <button className="cancel" onClick={props.onClick}>
                    Cancel
                </button>
            </form>
        </div>
        
    )
}

export default CreateList