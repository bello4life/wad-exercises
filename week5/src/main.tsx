import React from 'react';
import ReactDOM from 'react-dom/client';
import Greeting from "./Components/Greeting";
import InteractingGreeting from "./Components/InteractingGreeting";

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<InteractingGreeting/>);