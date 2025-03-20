class Contact {
  constructor(firstName, lastName, address, city, state, zip, phone, email) {
    this.firstName = this.validateName(firstName, "First Name");
    this.lastName = this.validateName(lastName, "Last Name");
    this.address = this.validateAddress(address, "Address");
    this.city = this.validateAddress(city, "City");
    this.state = this.validateAddress(state, "State");
    this.zip = this.validateZip(zip);
    this.phone = this.validatePhone(phone);
    this.email = this.validateEmail(email);
  }

  validateName(name, fieldName) {
    const nameRegex = /^[A-Z][a-zA-Z]{2,}$/;
    if (!nameRegex.test(name)) {
      throw new Error(
        `${fieldName} must start with a capital letter and have at least 3 characters.`
      );
    }
    return name;
  }

  validateAddress(value, fieldName) {
    if (value.length < 4) {
      throw new Error(`${fieldName} must have at least 4 characters.`);
    }
    return value;
  }

  validateZip(zip) {
    const zipRegex = /^[1-9][0-9]{5}$/;
    if (!zipRegex.test(zip)) {
      throw new Error(
        "Zip code must be a 6-digit number, not starting with 0."
      );
    }
    return zip;
  }

  validatePhone(phone) {
    const phoneRegex = /^[+]?[0-9]{1,4}[-\s]?[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      throw new Error(
        "Phone number must be a valid 10-digit number with an optional country code."
      );
    }
    return phone;
  }

  validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format.");
    }
    return email;
  }

  updateDetails(field, newValue) {
    try {
      switch (field) {
        case "firstName":
          this.firstName = this.validateName(newValue, "First Name");
          break;
        case "lastName":
          this.lastName = this.validateName(newValue, "Last Name");
          break;
        case "address":
          this.address = this.validateAddress(newValue, "Address");
          break;
        case "city":
          this.city = this.validateAddress(newValue, "City");
          break;
        case "state":
          this.state = this.validateAddress(newValue, "State");
          break;
        case "zip":
          this.zip = this.validateZip(newValue);
          break;
        case "phone":
          this.phone = this.validatePhone(newValue);
          break;
        case "email":
          this.email = this.validateEmail(newValue);
          break;
        default:
          throw new Error("Invalid field name.");
      }
      console.log(`${field} updated successfully!`);
    } catch (error) {
      console.error("Error updating contact:", error.message);
    }
  }

  displayContact() {
    return `
    Name: ${this.firstName} ${this.lastName}
    Address: ${this.address}, ${this.city}, ${this.state} - ${this.zip}
    Phone: ${this.phone}
    Email: ${this.email}
    `;
  }
}

class AddressBook {
  constructor() {
    this.contacts = [];
  }

  addContact(contact) {
    if (contact instanceof Contact) {
      const isDuplicate =
        this.contacts.filter(
          (c) =>
            c.firstName === contact.firstName && c.lastName === contact.lastName
        ).length > 0;

      if (isDuplicate) {
        console.log(
          "Duplicate contact! This person already exists in the Address Book."
        );
      } else {
        this.contacts.push(contact);
        console.log("Contact added successfully!");
      }
    } else {
      throw new Error("Invalid contact object.");
    }
  }

  findContact(name) {
    return this.contacts.find(
      (contact) => contact.firstName === name || contact.lastName === name
    );
  }

  editContact(name, field, newValue) {
    const contact = this.findContact(name);
    if (contact) {
      contact.updateDetails(field, newValue);
    } else {
      console.log("Contact not found.");
    }
  }

  findAndEditContact(name, updatedDetails) {
    const contact = this.findContact(name);
    if (contact) {
      try {
        for (const key in updatedDetails) {
          if (contact.hasOwnProperty(key)) {
            contact.updateDetails(key, updatedDetails[key]);
          }
        }
        console.log("Contact updated successfully:", contact.displayContact());
      } catch (error) {
        console.error("Error updating contact:", error.message);
      }
    } else {
      console.error("Contact not found.");
    }
  }

  deleteContact(name) {
    const index = this.contacts.findIndex(
      (contact) => contact.firstName === name || contact.lastName === name
    );

    if (index !== -1) {
      const removedContact = this.contacts.splice(index, 1);
      console.log(
        "Contact deleted successfully:",
        removedContact[0].displayContact()
      );
    } else {
      console.log("Contact not found.");
    }
  }

  getContactCount() {
    return this.contacts.reduce((count) => count + 1, 0);
  }

  displayContactCount() {
    console.log(`Total Contacts: ${this.getContactCount()}`);
  }

  searchByCity(city) {
    const contactsInCity = this.contacts.filter(
      (contact) => contact.city === city
    );

    if (contactsInCity.length > 0) {
      console.log(`\nContacts in ${city}:`);
      contactsInCity.map((contact) => console.log(contact.displayContact()));
    } else {
      console.log(`No contacts found in ${city}.`);
    }
  }

  searchByState(state) {
    const contactsInState = this.contacts.filter(
      (contact) => contact.state === state
    );

    if (contactsInState.length > 0) {
      console.log(`\nContacts in ${state}:`);
      contactsInState.map((contact) => console.log(contact.displayContact()));
    } else {
      console.log(`No contacts found in ${state}.`);
    }
  }

  viewPersonsByCity(city) {
    const contactsInCity = this.contacts.filter(
      (contact) => contact.city === city
    );

    if (contactsInCity.length > 0) {
      console.log(`\nPersons in ${city}:`);
      contactsInCity.map((contact) => console.log(contact.displayContact()));
    } else {
      console.log(`No persons found in ${city}.`);
    }
  }

  viewPersonsByState(state) {
    const contactsInState = this.contacts.filter(
      (contact) => contact.state === state
    );

    if (contactsInState.length > 0) {
      console.log(`\nPersons in ${state}:`);
      contactsInState.map((contact) => console.log(contact.displayContact()));
    } else {
      console.log(`No persons found in ${state}.`);
    }
  }

  viewAllPersonsByCity() {
    const groupedByCity = this.contacts.reduce((acc, contact) => {
      acc[contact.city] = acc[contact.city] || [];
      acc[contact.city].push(`${contact.firstName} ${contact.lastName}`);
      return acc;
    }, {});

    console.log("\nPersons grouped by City:", groupedByCity);
  }

  viewAllPersonsByState() {
    const groupedByState = this.contacts.reduce((acc, contact) => {
      acc[contact.state] = acc[contact.state] || [];
      acc[contact.state].push(`${contact.firstName} ${contact.lastName}`);
      return acc;
    }, {});

    console.log("\nPersons grouped by State:", groupedByState);
  }

  countContactsByCity(city) {
    const contactsInCity = this.contacts.filter((contact) => contact.city === city);
    console.log(`\nNumber of contacts in ${city}: ${contactsInCity.length}`);
    return contactsInCity.length;
  }

  countContactsByState(state) {
    const contactsInState = this.contacts.filter((contact) => contact.state === state);
    console.log(`\nNumber of contacts in ${state}: ${contactsInState.length}`);
    return contactsInState.length;
  }

  displayContacts() {
    if (this.contacts.length === 0) {
      console.log("Address Book is empty.");
    } else {
      console.log("\nAddress Book Contacts:");
      this.contacts.forEach((contact, index) => {
        console.log(`\nContact ${index + 1}:`);
        console.log(contact.displayContact());
      });
    }
  }
}

try {
  const addressBook = new AddressBook();

  const contact1 = new Contact(
    "John",
    "Doe",
    "1234 Elm St",
    "New York",
    "Texas",
    "100001",
    "+1-9876543210",
    "john.doe@example.com"
  );

  const contact2 = new Contact(
    "Alice",
    "Smith",
    "5678 Oak St",
    "Los Angeles",
    "California",
    "900123",
    "+1-8765432109",
    "alice.smith@example.com"
  );

  const contact3 = new Contact(
    "Bob",
    "Brown",
    "7777 Maple Ave",
    "New York",
    "Texas",
    "700001",
    "+1-9999999999",
    "bob.brown@example.com"
  );

  addressBook.addContact(contact1);
  addressBook.addContact(contact2);
  addressBook.addContact(contact3);

  addressBook.displayContacts();

  addressBook.displayContactCount();

  addressBook.countContactsByCity("New York");

  addressBook.countContactsByState("California");
} catch (error) {
  console.error("Error:", error.message);
}
