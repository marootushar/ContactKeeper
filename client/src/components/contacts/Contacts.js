import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";

const Contacts = (props) => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;
  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }
  return (
    <AnimatePresence>
      {filtered !== null
        ? filtered.map((contact) => (
            <motion.div
              positionTransition
              key={contact.id}
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
              key={contact.id}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
            >
              <ContactItem contact={contact} />
            </motion.div>
          ))}
    </AnimatePresence>
  );
};

export default Contacts;
