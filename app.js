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
      throw new Error(`${fieldName} must start with a capital letter and have at least 3 characters.`);
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
      throw new Error("Zip code must be a 6-digit number, not starting with 0.");
    }
    return zip;
  }

  validatePhone(phone) {
    const phoneRegex = /^[+]?[0-9]{1,4}[-\s]?[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      throw new Error("Phone number must be a valid 10-digit number with an optional country code.");
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

  displayContact() {
    return `
    Name: ${this.firstName} ${this.lastName}
    Address: ${this.address}, ${this.city}, ${this.state} - ${this.zip}
    Phone: ${this.phone}
    Email: ${this.email}
    `;
  }
}

try {
  const contact = new Contact(
    "John",
    "Doe",
    "1234 Elm St",
    "New York",
    "New York",
    "100001",
    "+1-9876543210",
    "john.doe@example.com"
  );
  console.log(contact.displayContact());
} catch (error) {
  console.error("Error:", error.message);
}
try {
  const invalidContact = new Contact(
    "jo", // Invalid: Less than 3 chars & lowercase
    "doe", // Invalid: Lowercase
    "NY", // Invalid: Less than 4 chars
    "LA", // Invalid: Less than 4 chars
    "CA", // Invalid: Less than 4 chars
    "01234", // Invalid: Zip starts with 0
    "12345", // Invalid: Not a 10-digit phone
    "john.doe@com" // Invalid: Incorrect email format
  );
} catch (error) {
  console.error("Error:", error.message);
}
