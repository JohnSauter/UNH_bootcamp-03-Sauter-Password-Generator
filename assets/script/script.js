// Assignment Code
const generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  const password = generatePassword();
  const passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

/* Function to test a string for being formatted like a number. 
 * It must contain at least one decimal digits, it can have more
 * than one, and a decimal point is allowed.  */
function is_numeric (text) {
  if (typeof text != "string") {
    return false;
  }
  /* isNAN is false for well-formed numbers, but also for the empty
   * string and for a string containing only blanks.  Therefore we
   * also test that the input can be parsed as a number using
   * parseFloat which, unlike Number, will fail if given only
   * spaces.  */
  return (!isNaN(text) && !isNaN(parseFloat(text)));
}

/* Function to choose a character at random from a string.  */
function choose_character (choices) {
    /* Get 16 random bits.  These bits are random enough to be used for
    * security purposes such as password generation.  */
    const random_array = new Uint16Array(1);
    window.crypto.getRandomValues(random_array);
    /* The random number will be an integer between 0 and 65535, 
     * inclusive.  */
    let random_number = random_array[0];
    /* Scale the random number.  The result will be greater than 
     * or equal to zero and less than the number of allowed characters.  */
    random_number = Math.floor((random_number * choices.length) / 65536);
    /* Use that value to select a character from the string of 
     * characters from we must choose, and return it.  */
    const random_character = choices.charAt(random_number);
    return (random_character);
}

/* Function to generate and display a password.  */
function generatePassword() {
  let password_length_valid = 0;

  /* Ask for a password length.  Keep asking until we get a valid answer.  */
  while (password_length_valid == 0) {
    password_length = prompt("How many characters in your password?")
    if (!password_length) {
      alert("Do not cancel the requestor or leave it empty: provide some text and press OK.");
      continue;
    }
    if (!is_numeric(password_length)) {
      alert("The password length must be a number.");
      continue;
    }
    if (Math.floor(password_length) != password_length) {
      alert("The password length must be an integer.")
      continue;
    }
    if ((password_length < 8) || (password_length > 128)) {
      alert("The password length must be between 8 and 128, inclusive.");
      continue;
    }
    password_length_valid = 1;
  }

  /* We have a valid password length.  Now get the other criteria.  
  * The user must specify at least one category of characters to include.  */
  const OK_text = "OK to include, Cancel to not include.";
  let selection_valid = 0;
  let include_lower_case = false;
  let include_upper_case = false;
  let include_numeric = false;
  let include_special = false;
  while (selection_valid == 0) {
    include_lower_case = confirm("Inlcude lower case letters? " + OK_text);
    include_upper_case = confirm("Include upper case letters? " + OK_text);
    include_numeric = confirm("Include numeric digits? " + OK_text);
    include_special = confirm("Include special characters? " + OK_text);
    if (include_lower_case || include_upper_case || include_numeric ||
      include_special) {
        selection_valid = 1;
    } else {
        alert("You must specify at least one category of characters.");
    }
  }

  /* We have a valid length and at least one category of characters
   * has been selected.  Form a string consisting of the allowed
   * characters, and choose a character from each.  */
  let allowed_characters = "";
  let password = "";
  if (include_lower_case) {
    const lower_case_letters = "abcdefghijklmnopqrstuvwxyz";
    allowed_characters = allowed_characters + lower_case_letters;
    password = password + choose_character (lower_case_letters);
  }
  if (include_upper_case) {
    const upper_case_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    allowed_characters = allowed_characters + upper_case_letters;
    password = password + choose_character (upper_case_letters);
  }
  if (include_numeric) {
    const numerics = "0123456789";
    allowed_characters = allowed_characters + numerics;
    password = password + choose_character(numerics);
  }
  if (include_special) {
    let special_characters = "~`!@#$%^&*()_-+={[}]:;'<,>.?/";
    special_characters = special_characters + '"';
    allowed_characters = allowed_characters + special_characters;
    password = password + choose_character(special_characters);
  }
 
    /* Accumulate characters chosen at random from the allowed characters
     * until we have enough.  */
  while (password.length < password_length) {
    const random_character = choose_character (allowed_characters);
    password = password + random_character;
  }

  /* Since the first few characters were not very randomly chosen,
   * shuffle the string to conceal the weak choices.  */
  const password_array = password.split("");
  for (let i = 0; i < password.length; i++) {

    /* Exchange the character at position i with the character at
     * a random position.  */
    const random_array = new Uint16Array(1);
    window.crypto.getRandomValues(random_array);
    /* The random number will be an integer between 0 and 65535, 
     * inclusive.  */
    let random_number = random_array[0];
    /* Scale the random number.  The result will be greater than 
     * or equal to zero and less than the number of characters in
     * the password.  */
    random_number = Math.floor((random_number * password.length) / 65536);
    const temp_char = password_array[i];
    password_array[i] = password_array[random_number];
    password_array[random_number] = temp_char;
  }
  password = password_array.join("");
  return (password);
}