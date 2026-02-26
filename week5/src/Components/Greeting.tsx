interface PersonProps {
    firstname: string;
    lastname: string;
    age: number;
}

export default function Greeting({firstname, lastname, age}: PersonProps ) {
   

    const adultMsg = (age >= 18 ? "You are an adult" : "You are not an adult")

    return <h1>Hello {firstname} {lastname}, your age is {age}....{adultMsg}
            </h1>
    
}


