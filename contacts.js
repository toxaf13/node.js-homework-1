const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");


const fetchContacts = async () => {
   const data = await fs.readFile(contactsPath, {encoding: "utf-8"});
   const contactsList = JSON.parse(data);
   //console.table(contactsList)
   return contactsList;
}
const listContacts = async ()=> {
   const contacts = await fetchContacts();
   console.table(contacts);
   return;
}
 
 const getContactById = async (contactId) => {
   const contacts = await fetchContacts();
   const requestedContact = contacts.find(({ id }) => id === contactId);
   console.log(requestedContact)
   return requestedContact;
 }
 
 const  removeContact = async (contactId) => {
   const contacts = await fetchContacts();
   const filteredContacts = contacts.filter(({ id }) => id !== contactId);
   await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2),{encoding: "utf-8"});
   console.log('Remove contact')
 }
 
 const addContact = async (name, email, phone) => {
   const contacts = await fetchContacts();
   const lastId = Math.max(...contacts.map(c => parseInt(c.id, 10))) +1;
   const newContact = { id: lastId.toString(), name, email, phone };
   const updateContacts = [...contacts, newContact];
   await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2), {encoding: "utf-8"});
   console.log('Added new contact ')
 }

// (async ()=> {
//   const contacts = await listContacts();

//   console.log(contacts);

//   console.log(await listContacts('2'))

//   await removeContact('2');

//   await addContact ("Qwery","qwery@gmail.com","235436");

//   console.log(await listContacts());
// })();
  module.exports = {listContacts, getContactById, removeContact, addContact};