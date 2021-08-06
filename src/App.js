import React, {useState, useEffect } from 'react';
import {  FormControl, Input } from '@material-ui/core';

import './App.css';
import Message from './Message.js';
import './Message.css';
import db from './firebase.js';
import firebase from "firebase";
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';


function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]
);
  const [username, setUsername] = useState('');

  //useState = variable in react
  //useEffect = run code on a condition in react

  useEffect(() => {
    //run once when the app component loads
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot=> 
      {setMessages(snapshot.docs.map( doc => ({id: doc.id, message: doc.data()})))
    });
  },[])

  useEffect(() => {
    setUsername(prompt('Please write your username'))
  }, [])

  console.log(input);
  console.log(messages);


  const sendMessage = (event) => {
    

    event.preventDefault();

    db.collection('messages').add({

      message:input,
      username:username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    
    setInput('');
  }

  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100" alt='messenger'></img>
      <h1>Welcome To This Planet</h1>
      <h>Welcome {username}</h>

      <form className="app_form">
      <FormControl className="app_formControl">
       
      <Input className="app_input" placeholder='Enter a message' value={input} onChange= {event=> setInput(event.target.value)}></Input>


      <IconButton className="app_iconButton" disabled={!input} variant="contained" color="primary" type='submit' 
       onClick={sendMessage}> 
        
        <SendIcon/>
       </IconButton>
      </FormControl>
      
      </form>


      <FlipMove>
      {
        messages.map(({id, message}) => (
          <Message key={id} username={username} message={message} />
          
        ))
      }
      </FlipMove>

    </div>
  );
}

export default App;
