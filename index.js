const { Command } = require('commander');
const program = new Command();

program
  .option('-a, --action [String]', 'choose action')
  .option('-i, --id [String]', 'user id')
  .option('-n, --name [String]', 'user name')
  .option('-e, --email [String]', 'user email')
  .option('-p, --phone [String]', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: refaktor
const {listContacts, getContactById, removeContact, addContact} = require('./contacts');

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts()
      break;

    case 'get':
      getContactById(id)
      break;

    case 'add':
      addContact(name, email, phone)
      break;

    case 'remove':
      removeContact(id)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);