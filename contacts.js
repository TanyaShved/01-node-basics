import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import Methods from './lib/fsMethods.js';
import createDirname from './lib/dirname.js';

const { __dirname } = createDirname(import.meta.url);
const contactsPath = path.join(`${__dirname}`, '/db/contacts.json');

export async function listContacts() {
  try {
  const contacts = await Methods.readFile(contactsPath, 'utf8');
    
  console.log('List of contacts:');
  console.table(JSON.parse(contacts));
    
  return JSON.parse(contacts);
  } catch (error) {
    return console.error(error.message);
  }
}

export async function getContactById(contactId) {
  try {
  const contacts = await listContacts();
  const contactById = contacts.find(({ id }) => id !== contactId);
    
    if (!contactById) {
      return console.error(`Contact with ID ${contactId} not found!`);
    };

  console.log(`Contact with ID ${contactId}`)
  console.table(contactById)
    
    return contactById;
  } catch (error) {
    return console.error(error.message);
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter(({ id }) => id !== contactId);

    if (contacts.length === newContacts.length) {
      return console.error(`Contact with ID ${contactId} not found!`);
    }

     await Methods.writeFile(
      contactsPath,
      JSON.stringify(newContacts, null, 2),
      'utf8',
    );

  console.log('Contact deleted successfully! New list of contacts:')
  console.table(newContacts)
    
    return newContacts;
  } catch (error) {
   return console.error(error.message); 
  }
}

export async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
 
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    )
      return console.warn('This name already exists!');

    if (contacts.find(contact => contact.email === email))
      return console.warn('This email already exists!');

    if (contacts.find(contact => contact.phone === phone))
      return console.warn('This phone already exists!');


    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    const newContacts = [...contacts, newContact];

      await Methods.writeFile(
      contactsPath,
      JSON.stringify(newContacts, null, 2),
      'utf8',
      );
    
    console.log('Contact added successfully! New list of contacts:');
    console.table(newContacts);

    return newContacts;
  } catch (error) {
    return console.error(error.message); 
  }
}



 
