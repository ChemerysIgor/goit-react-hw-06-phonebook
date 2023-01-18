import { useState, useEffect } from "react";

import { nanoid } from 'nanoid';
import ContactForm from "./form/contactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import { GlobalStyles } from "./GlobalStyles";
import {Div} from './Div.styled'


export default function App() {
const [contacts, setContacts] = useState( JSON.parse(localStorage.getItem('contacts')) ?? [])
  const [filter, setFilter] = useState("")
 
  useEffect(
    () => {
      try {const getContact = localStorage.getItem('contacts');
      const parseContact = JSON.parse(getContact);
      
      if (parseContact) {
        setContacts(parseContact)
        }
      }
      catch (error) { console.log(error.message)}
      
    }, []);
  
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);
            
  const addContact = (contact) => {
    if (contacts.length !== 0) {
      const inContact = contacts.some(item => {
        console.log(item)
        return item.name.toLowerCase() === contact.name.toLowerCase()
      })
      if (inContact) {
        alert(`${contact.name} is already in the list`)
        return  contacts
      }

    contact.id = nanoid(5);
     setContacts(prevState => {
        return [...prevState, contact] }
      )
    }
  else { contact.id = nanoid(5);
      setContacts([contact])
    }
  }
     

 
    const deleteContact = id => {
      setContacts(prevState => {
        return prevState.filter(contact => contact.id !== id)
      });
    }

  const filteredContacts = () => {
     const normalizedFilter = filter.toLowerCase();
    
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
  
    }

  
 const filterData = (evt) => {
       setFilter(evt.target.value)
      }
     
  const contactsAfterFilter = filteredContacts()
     


  return (
    <>
          <GlobalStyles />
          <Div>
            <h1>Phonebook</h1>
            <ContactForm addContact={addContact} />
       
       
            <h2>Contacts</h2>
            <Filter filterData={filterData} />
            <ContactList contactArr={contactsAfterFilter} deleteContact={deleteContact} />
          </Div>
        </>
  )
}



