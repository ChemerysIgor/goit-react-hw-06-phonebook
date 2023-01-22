// import { createReducer } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
// import { useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import { addContact, deleteContact } from './actions';
const contactInitialState = {
  contacts: [
    { id: 'id-1', contact: { name: 'Rosie Simpson', number: '459-12-56' } },
    { id: 'id-2', contact: { name: 'Hermione Kline', number: '443-89-12' } },
    { id: 'id-3', contact: { name: 'Eden Clements', number: '645-17-79' } },
    { id: 'id-4', contact: { name: 'Annie Copeland', number: '227-91-26' } },
  ],
};

const contactSlice = createSlice({
  name: 'сontacts',
  initialState: contactInitialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.contacts.push(action.payload);
      },
      prepare(contact) {
        return {
          payload: {
            id: nanoid(5),
            contact,
          },
        };
      },
    },

    deleteContact: {
      reducer(state, action) {
        const index = state.contacts.findIndex(
          contact => contact.id === action.payload
        );

        state.contacts.splice(index, 1);
      },
    },
  },
});

export const { addContact, deleteContact } = contactSlice.actions;
export const contactReducer = contactSlice.reducer;
export const selectContacts = state => state.contact.contacts;

const persistConfig = {
  key: 'root',
  storage,
};

export const persistedContactReducer = persistReducer(
  persistConfig,
  contactReducer
);
