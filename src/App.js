import React from "react";
import style from "./component/styles.module.css";

import Form from "./component/Form/Form";
import ContactList from "./component/Contact/Contact";
import Search from "./component/Search/Search";

export default class Mobile extends React.Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  addContact = (contact) => {
    this.setState({
      contacts: [contact, ...this.state.contacts],
    });
  };

  veluesFilter = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };
  getFilter = () => {
    const { filter, contacts } = this.state;
    const filterValues = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterValues)
    );
  };

  checkName = (newName, numbers) => {
    return this.state.contacts.some(
      ({ name }) => name === Object.values(newName).join("")
    );
  };

  deletedContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  render() {
    const filterContact = this.getFilter();

    return (
      <div className={style.container}>
        <h1 className={style.headingForm}>Телефонна книга</h1>
        <Form onSubmit={this.addContact} contactList={this.checkName} />
        <h2 className={style.contactList}>Контакти</h2>
        <Search velue={this.state.filter} Search={this.veluesFilter} />
        <ContactList
          contactList={filterContact}
          onDeleted={this.deletedContact}
        />
      </div>
    );
  }
}
