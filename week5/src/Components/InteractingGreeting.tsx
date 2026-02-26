import { useState } from "react" ;

export default function InteractingGreeting() {
  const [ firstname, setFirstName] = useState("");
   const [ lastname, setLastName] = useState("");
    const [ age, setAge] = useState("");
    return(
        <div>
            <h2>Enter your first name:</h2>
            <input id='txtFirstName' type='text' value={firstname}
            onChange={updateStateName} />
            <h2>Enter your last name</h2>
            <input id='txtLastName' type='text' value={lastname} onChange={updateStateName} />
            <h2>Enter your age</h2>
            <input id='Age' type='number' value={age} onChange={updateStateName} />
            <button onClick={updateStateName}>Update!</button>
             <h1>
                
            </h1>
        </div>
       
    );
    

     function updateStateName() {
        setFirstName((document.getElementById('txtFirstName') as HTMLInputElement).value);
        setLastName((document.getElementById('txtLastName') as HTMLInputElement).value);
        setAge((document.getElementById('Age') as HTMLInputElement).value);
    }
}
