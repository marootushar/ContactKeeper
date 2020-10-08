import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        type: "personal",
        id: 1,
        name: "Aman Poddar",
        email: "poddar.aman@gmail.com",
        phone: "+91-8776320288",
      },
      {
        type: "personal",
        _id: 2,
        name: "Chaitanya Jalan",
        email: "jalan.chaitanya@gmail.com",
        phone: "+91-9934298342",
      },
      {
        type: "professional",
        id: 3,
        name: "Tushar Maroo",
        email: "maroo.tushar33@gmail.com",
        phone: "+91-7277608859",
      },
    ],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact
  const addContact = (contact) => {
    contact.id = uuidv4();
    dispatch({
      type: ADD_CONTACT,
      payload: contact,
    });
  };

  // Delete Contact
  const deleteContact = (id) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  };

  // Set Current Contact
  const setCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

  // Update Contact
  const updateContact = (contact) => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact,
    });
  };

  // Filter Contacts
  const filterContacts = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text,
    });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
