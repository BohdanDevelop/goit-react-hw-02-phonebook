import { Component } from 'react';
import Contacts from './Components/Contacts';
import ContactsForm from './Components/ContactsForm';
import Filter from './Components/Filter';
import style from './PhoneBook.module.scss';
import { nanoid } from 'nanoid';

class PhoneBook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],

    filter: '',
  };

  handleFilter = evt => {
    const { value } = evt.target;
    this.setState({ filter: value });
  };

  handleSubmit = (evt, name, number, reset) => {
    const allTheName = this.state.contacts.map(elem => elem.name.toUpperCase());
    if (allTheName.includes(name.toUpperCase())) {
      alert(`${name} is already in contacts`);
    } else {
      this.setState(prevState => {
        const newContacts = [
          ...prevState.contacts,
          {
            name,
            number,
            id: `id-${prevState.contacts.length + 1}`,
          },
        ];
        return {
          contacts: newContacts,
        };
      });
    }

    reset();
  };

  onDeleteClick = evt => {
    if (evt.target.type === 'button') {
      const deleteName = evt.target.name.toLowerCase();
      const newContacts = this.state.contacts.filter(
        element => element.name.toLowerCase() !== deleteName
      );
      this.setState({
        contacts: newContacts,
      });
    }
  };
  render() {
    const { contacts, filter } = this.state;

    const filterContacts = contacts
      .filter(({ name }) =>
        name.toUpperCase().includes(filter.toUpperCase().trim())
      )
      .map(({ name, number }) => {
        return (
          <li className={style.li} onClick={this.onDeleteClick} key={nanoid()}>
            <div>
              {name} : {number}
            </div>
            <button className={style.button} name={name} type="button">
              Delete
            </button>
          </li>
        );
      });

    return (
      <>
        <ContactsForm handleSubmit={this.handleSubmit} />
        <Filter filter={filter} handleFilter={this.handleFilter} />
        {filter ? (
          <ul>{filterContacts}</ul>
        ) : (
          <Contacts names={contacts} onClick={this.onDeleteClick} />
        )}
      </>
    );
  }
}

export default PhoneBook;
