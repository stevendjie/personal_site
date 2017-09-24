'use strict';

/*function validateHuman(honeypot) {
  if (honeypot) {  //if hidden form filled up
    console.log("Robot Detected!");
    return true;
  } else {
    console.log("Welcome Human!");
  }
}*/

// get all data in form and return object
function getFormData() {
  var elements = document.getElementById("contact-form").elements; // all form elements
  var fields = Object.keys(elements).map(function(k) {
    if(elements[k].name !== undefined) {
      return elements[k].name;
    // special case for Edge's html collection
    }else if(elements[k].length > 0){
      return elements[k].item(0).name;
    }
  }).filter(function(item, pos, self) {
    return self.indexOf(item) == pos && item;
  });
  var data = {};
  fields.forEach(function(k){
    data[k] = elements[k].value;
    var str = ""; // declare empty string outside of loop to allow
                  // it to be appended to for each item in the loop
    if(elements[k].type === "checkbox"){ // special case for Edge's html collection
      str = str + elements[k].checked + ", "; // take the string and append 
                                              // the current checked value to 
                                              // the end of it, along with 
                                              // a comma and a space
      data[k] = str.slice(0, -2); // remove the last comma and space 
                                  // from the  string to make the output 
                                  // prettier in the spreadsheet
    }else if(elements[k].length){
      for(var i = 0; i < elements[k].length; i++){
        if(elements[k].item(i).checked){
          str = str + elements[k].item(i).value + ", "; // same as above
          data[k] = str.slice(0, -2);
        }
      }
    }
  });
  console.log(data);
  return data;
}

function validateForm() {

    //configuration of error messages
    var captcha_error = "Wrong captcha. Try again."
    var email_error = "Invalid email. Try again."
    
    var message_error = "Message too short. Try again."

    var errors_queue = [];
    //name validation
    var $name = $(".name");
    
    var name_text = $name.val();
    if (name_text == "")  $name.addClass("error");


    //email validation/^([A-Za-z0-9_\-\.]){1,}\@([A-Za-z0-9_\-\.]){1,}\.([A-Za-z]{2,4})$/
    var $email = $(".email");
    var email_pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,10})+$/;//regex
    var email_text = $email.val();
    if (email_text == "")  $email.addClass("error");
    else if (!email_pattern.test(email_text)){
      $email.css({
      "color":"#b9353f", "font-weight":"bold"});
      errors_queue.push(email_error);
    }

    //message validation
    var $message = $(".message");
    if ($message.val().length <= 2){
      if ($message.val().length == 0) $message.addClass("error");
      else{ 
        $message.css({
        "color":"#b9353f", "font-weight":"bold"});
        errors_queue.push(message_error);
      }

    }


    //captcha validation
    var $captcha = $(".captcha");
    var captcha_value = $("#code").text();
    var captcha_submitted = $captcha.val();
    if (captcha_submitted == "")  $captcha.addClass("error");
    else if (captcha_value != captcha_submitted){
      $captcha.css({
      "color":"#b9353f", "font-weight":"bold"});
      errors_queue.push(captcha_error);
    }
    if (!(captcha_value == captcha_submitted) || !(email_pattern.test(email_text))
     || ($message.val().length < 2)){
      alert(errors_queue.shift());//dequeue
      return false;
    }
    else return true;
}

function handleFormSubmit(event) {  // handles form submit withtout any jquery
  event.preventDefault();           // we are submitting via xhr below
  var data = getFormData();         // get the values submitted in the form

  /* OPTION: Remove this comment to enable SPAM prevention, see README.md
  if (validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
    return false;
  }
  */

  /*if( !validEmail(data.email) ) {   // if email is not valid show error
    document.getElementById('email-invalid').style.display = 'block';
    return false;
  } else {*/

    if (!validateForm()){
      return false;
    } else {
    var url = event.target.action;  //
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        console.log( xhr.status, xhr.statusText )
        console.log(xhr.responseText);
        document.getElementById('contact-form').style.display = 'none'; // hide form
        document.getElementById('thankyou_message').style.display = 'block';
        return;
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
    xhr.send(encoded);
    }
}
function loaded() {
  console.log('contact form submission handler loaded successfully');
  // bind to the submit event of our form
  var form = document.getElementById('contact-form');
  form.addEventListener("submit", handleFormSubmit, false);
};

document.addEventListener('DOMContentLoaded', loaded, false);
