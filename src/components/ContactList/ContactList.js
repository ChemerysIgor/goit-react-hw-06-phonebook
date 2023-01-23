import React from 'react';
import { List, ContactCard } from './ContactList.styled';
import PropTypes, { shape } from 'prop-types';
import { useSelector } from 'react-redux';
import { selectContacts, deleteContact } from 'redux/contactSlice';
import { useDispatch } from 'react-redux';
import { selectFilter } from 'redux/filterSlice';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const onDeleteBtn = id => {
    dispatch(deleteContact(id));
  };

  const getVisibleContacts = contacts.filter(contact =>
    contact.contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <List>
        {getVisibleContacts.map(item => {
          const { id, contact } = item;
          const { name, number } = contact;
          return (
            <ContactCard key={id}>
              {' '}
              {name}: {number}
              <button type="button" onClick={() => onDeleteBtn(id)}>
                Delete
              </button>
            </ContactCard>
          );
        })}
      </List>
    </>
  );
};

ContactList.propTypes = {
  contactArr: PropTypes.arrayOf(
    shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func,
};

export default ContactList;
