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

/* Function to test a string for being formatted like a number.  */
function is_numeric (text) {
  if (typeof text != "string") {
    return false;
  }
  return (!isNaN(text) && !isNaN(parseFloat(text)));
}

function generatePassword() {
  let password_length_valid = 0;
  while (password_length_valid == 0) {
    password_length = prompt("How many characters in your password?")
    if (!password_length) {
      alert("Do not just cancel the requestor, provide some text.");
      continue;
    }
    if (!is_numeric(password_length)) {
      alert("The response must be a number.");
      continue;
    }
    if ((password_length < 8) || (password_length > 128)) {
      alert("The password length must be between 8 and 128, inclusive.");
      continue;
    }
    password_length_valid = 1;
  }
  const OK_text = "OK to include, cancel to not include.";
  let selection_valid = 0;
  let include_lower_case = false;
  let include_upper_case = false;
  let include_numeric = false;
  let include_special = false;
  while (selection_valid == 0) {
    include_lower_case = confirm("Inlcude lower case? " + OK_text);
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
   * characters.  */
  let allowed_characters = "";
  if (include_lower_case) {
    allowed_characters = allowed_characters + "abcdefghijklmnopqrstuvwxyz";
  }
  if (include_upper_case) {
    allowed_characters = allowed_characters + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (include_numeric) {
    allowed_characters = allowed_characters + "0123456789";
  }
  if (include_special) {
    allowed_characters = allowed_characters + "~`!@#$%^&*()_-+={[}]:;'<,>.?/";
    allowed_characters = allowed_characters + '"';
  }
   
  /* If the random mumber generator just produces pseudo random
   * numbers it will generate the same password every time it is
   * run, given the same constraints.  To prevent that, mix the time
   * with the random numbers.  */
  let random_seed = Date.now();

  /* Accumulate characters chosen at random from the allowed characters
   * until we have enough.  */
  let password = "";
  while (password.length < password_length) {
    let random_number = Math.random();
    random_number = random_number * allowed_characters.length;
    random_number = (random_number + random_seed);
    random_number = random_number % allowed_characters.length;
    const random_character = allowed_characters.charAt(random_number);
    password = password + random_character;
  }
  return (password);
}