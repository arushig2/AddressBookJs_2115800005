class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.address = address;
      this.city = city;
      this.state = state;
      this.zip = zip;
      this.phone = phone;
      this.email = email;
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
  
  const contact = new Contact(
    "John",
    "Doe",
    "123 Main St",
    "New York",
    "NY",
    "10001",
    "123-456-7890",
    "john.doe@example.com"
  );
  
  console.log(contact.displayContact());
  