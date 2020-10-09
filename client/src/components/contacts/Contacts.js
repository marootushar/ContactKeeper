import React, { useContext, useEffect, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = (props) => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <AnimatePresence>
          {filtered !== null
            ? filtered.map((contact) => (
                <motion.div
                  positionTransition
                  key={contact._id}
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <ContactItem contact={contact} />
                </motion.div>
              ))
            : contacts.map((contact) => (
                <motion.div
                  positionTransition
                  key={contact._id}
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <ContactItem contact={contact} />
                </motion.div>
              ))}
        </AnimatePresence>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
