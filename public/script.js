    const fullname = document.getElementById("fullname");
    const phonenumber = document.getElementById("phonenumber");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

// function for form varification
function formValidation() {
  
  // checking name length
  if (fullname.value.length < 2 || fullname.value.length > 20) {
    alert("Name length should be more than 2 and less than 21");
    fullname.focus();
    return false;
  }
   // checking phone number
  if (!phonenumber.value.match(/^[1-9][0-9]{9}$/)) {
    alert("Phone number must be 10 characters long number and first digit can't be 0!");
    phonenumber.focus();
    return false;
  }
  // checking email
  if (email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    alert("Please enter a valid email!");
    email.focus();
    return false;
  }
  // checking password
  if (!password.value.match(/^.{5,15}$/)) {
    alert("Password length must be between 5-15 characters!");
    password.focus();
    return false;
  }
  return true;
}