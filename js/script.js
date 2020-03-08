/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
by Brad Rock
******************************************/


/*Structure of file:
DOM setup
Event listeners
Error message handlers
Validation functions
*/



// DOM SETUP************************************************************************************************
// *********************************************************************************************************


//get the form, html, and button elements
const formElement = document.querySelector("form");
const htmlElement = document.querySelector("html");
const button = document.querySelector("button");




//setup of DOM is based on order that the elements appear on the page



//perform name input element-related setup****************************************************************

//get the name input element
const nameInputElement = document.getElementById("name");


//put name input field (the first field on the page) in focus state (cursor automatically active there when
//loading the page)
nameInputElement.focus();

//create the validation error message that notifies the user that the name field cannot be empty
const nameErrorMessage = document.createElement("LABEL");

nameErrorMessage.innerText = "Name field cannot be empty.";

nameErrorMessage.style.display = "none";

nameErrorMessage.style.color = "firebrick";

//insert the validation message into the fieldset of which the name element is a child
const basicInfoFieldset = nameInputElement.parentElement;

basicInfoFieldset.insertBefore(nameErrorMessage, nameInputElement.nextSibling);

// (end of name input element-related setup)*******************************************************************







//perform email input element-related setup************************************************************


const emailInputElement = document.getElementById("mail");


//set up the validation error message that notifies the user that the name field cannot be empty
//content of the message depends on whether field is blank or contains an invalid email address when
//user focuses out of it, so the inner text of the error message element is set in the
//event listener
const emailErrorMessage = document.createElement("LABEL");

emailErrorMessage.style.display = "none";

emailErrorMessage.style.color = "firebrick";

basicInfoFieldset.insertBefore(emailErrorMessage, emailInputElement.nextSibling);


// (end of email input element-related setup)****************************************************************







//perform "title" section-related setup"******************************************************************

const titleSelectElement = document.getElementById("title");

const otherTitleElement = document.getElementById("other-title");

//hide the field where the user specifies their job role if they choose "other" (unhidden if they
//actually choose this option as set in event listener for job role select element)

otherTitleElement.style.display = "none";


// (end of title section-related setup)****************************************************************





//perform t-shirt design select element-related setup************************************************************

//get the design select element
const designSelectElement = document.getElementById("design");

//get the first option element within the select element with the id "design"
const designSelectOptionElement = document.querySelector("#design option");

//set the first option element to be hidden so that it cannot be selected by the user (only displayed before user makes a choice)
designSelectOptionElement.hidden = true;

// (end of t-shirt design select element-related setup)****************************************************************






//perform t-shirt color select element-related setup******************************************************
const colorSelectElement = document.getElementById("color");

const colorDivElement = document.getElementById("colors-js-puns");

//hide the color div element initially--is unhidden in event handler when user
//selects a t-shirt design
colorDivElement.style.display = "none";



//set up "Please select a T-shirt color" option element

const pleaseSelectColorOptionElement = document.createElement("OPTION");

pleaseSelectColorOptionElement.innerText = "Please select a T-shirt color";

colorSelectElement.insertBefore(pleaseSelectColorOptionElement, colorSelectElement.childNodes[0]);

colorSelectElement.selectedIndex = "0";

//set as hidden so it cannot actually be selected by the user, only displayed as a default
colorSelectElement.childNodes[0].hidden = true;



// (end of t-shirt color select element-related setup)*******************************************************************






//perform setup operations pertaining to the activities fieldset*********************************************

const activitiesFieldsetElement = document.querySelector("fieldset.activities");

//set up label to display total cost of selected activities
let totalCost = 0;

const totalCostLabel = document.createElement("LABEL");

totalCostLabel.style.display = "none";

activitiesFieldsetElement.appendChild(totalCostLabel);




//set up validation error message for activity section

const activityErrorMessage = document.createElement("LABEL");

activityErrorMessage.style.display = "none";

activityErrorMessage.style.color = "firebrick";

activityErrorMessage.innerText = "You must select at least one activity.";

activitiesFieldsetElement.appendChild(activityErrorMessage);



// (end of activities fieldset-related setup)*******************************************************************







//perform payment section-related setup**********************************************************************


const creditCardInputElement = document.getElementById("cc-num");
const creditCardDivElement = document.getElementById("credit-card");
const zipCodeInputElement = document.getElementById("zip");
const cvvInputElement = document.getElementById("cvv");
const payPalDivElement = document.querySelector("div.paypal");
const bitcoinDivElement = document.querySelector("div.bitcoin");


//get the payment select element
const paymentSelectElement = document.getElementById("payment");

//get the option within the payment select element that says "Select Payment Method"
const paymentSelectPaymentOption = document.querySelector("#payment option[value='select method']");

//set this option to be hidden so that it does not show up as a selectable option for the user
//(it only shows up initially as the default selection)
paymentSelectPaymentOption.hidden = true;


//create and insert payment validation error message
const paymentSelectionErrorMessage = document.createElement("LABEL");

paymentSelectionErrorMessage.style.display = "none";

paymentSelectionErrorMessage.style.color = "firebrick";

paymentSelectionErrorMessage.innerText = "You must select a payment option.";

formElement.insertBefore(paymentSelectionErrorMessage, button);




//create and insert credit card number validation error message
const creditCardErrorMessage = document.createElement("LABEL");

creditCardErrorMessage.style.display = "none";

creditCardErrorMessage.style.color = "firebrick";

creditCardErrorMessage.innerText = "You must enter a valid credit card number.";

creditCardDivElement.appendChild(creditCardErrorMessage);


//create and insert zip code validation error message
const zipCodeErrorMessage = document.createElement("LABEL");

zipCodeErrorMessage.style.display = "none";

zipCodeErrorMessage.style.color = "firebrick";

zipCodeErrorMessage.innerText = "You must enter a valid zip code.";

creditCardDivElement.appendChild(zipCodeErrorMessage);


//create and insert cvv validation error message
const cvvErrorMessage = document.createElement("LABEL");

cvvErrorMessage.style.display = "none";

cvvErrorMessage.style.color = "firebrick";

cvvErrorMessage.innerText = "You must enter a valid CVV.";

creditCardDivElement.appendChild(cvvErrorMessage);



//hide all elements until user picks a payment option...when payment option is selected then
//event listener causes the appropriate payment div to be visible
payPalDivElement.style.display = "none";

bitcoinDivElement.style.display = "none";

creditCardDivElement.style.display = "none";



// (end of payment section-related setup)*******************************************************************







//setup of the master validation error message********************************************************************

const masterErrorMessage = document.createElement("LABEL");

masterErrorMessage.style.display = "none";

masterErrorMessage.style.color = "firebrick";

masterErrorMessage.id = "master-validation-message";

masterErrorMessage.innerText = "Insufficient information has been provided for submission. Please see the error messages above.";

formElement.appendChild(masterErrorMessage);


// (end of setup for the master validation error message)*********************************************************



// END OF DOM SETUP*****************************************************************************************
// *********************************************************************************************************




//EVENT LISTENERS******************************************************************************************
//some of these simply call validation error message handlers, while others perform other operations instead/as well

nameInputElement.addEventListener('input', nameErrorMessageHandler);
nameInputElement.addEventListener('focusout', nameErrorMessageHandler);

emailInputElement.addEventListener('input', emailErrorMessageHandler);
emailInputElement.addEventListener('focusout', emailErrorMessageHandler);

titleSelectElement.addEventListener('input', (event) => {

   //if the user selects "other" as their title, then set the "other title" input element to display
   //if they choose any other title, then hide the "other title" input element
   if (event.target.value === 'other')
   {
      otherTitleElement.style.display = "block";
   }
   else
   {
      otherTitleElement.style.display = "none";
   }

});



designSelectElement.addEventListener('input', (event) => {

   //any input necessarily means choosing a design, so unhide the color div element upon design selection
   colorDivElement.style.display = "block";


      //if the js puns design has been selected, set the js puns colors to display and the heart js colors
      //to be hidden, and vice versa
      //also, reset the selected option to be the "Please select a T-shirt color" when design is switched
   if (event.target.value === "js puns")
   {
      
      colorSelectElement.selectedIndex = "0";
      
      
      for (i = 1; i < 4; i++)
      {
         colorSelectElement[i].hidden = false;
      }

      for (i = 4; i <= 6; i++)
      {
         colorSelectElement[i].hidden = true;
      }

   }

   else if (event.target.value === "heart js") 
   {
      
      colorSelectElement.selectedIndex = "0";

     
      for (i = 1; i < 4; i++)
      {
         colorSelectElement[i].hidden = true;
      }

      for (i = 4; i <= 6; i++)
      {
         colorSelectElement[i].hidden = false;
      }
   }

});




activitiesFieldsetElement.addEventListener('change', (event) => {

   const activitiesCheckBoxes = document.querySelectorAll(".activities input");

   const selectedTime = event.target.getAttribute("data-day-and-time");

   //wasChecked is true if the event involved checking a box and false if the event involved unchecking a box
   const wasChecked = event.target.checked;

   if (wasChecked)
   {
      //if wasChecked is true then necessarily an activity has been selected, so hide validation
      //message if it was visible
      activityErrorMessage.style.display = "none";

      //add the cost of the selected activity to the total cost
      totalCost += parseInt(event.target.getAttribute("data-cost"));

   }
   else
   {
      //if an activity was unchecked, subtract the cost of that activity from the total cost
      totalCost -= parseInt(event.target.getAttribute("data-cost"));
   }


   //loop through the checkboxes to enable/disable as necessary
   for (i=0; i < activitiesCheckBoxes.length; i++)
   {
      //skip over the node that was the target of the event, as we don't want to change it
      //also, test whether the option is a match for the time to the targeted option
      if(!event.target.isSameNode(activitiesCheckBoxes[i]) && activitiesCheckBoxes[i].getAttribute("data-day-and-time") == selectedTime)
      {
            //if the event was the checking of a box, we want to disable matches
            //if the event was the unchecking of a box, we want to enable matches
               if (wasChecked)
               {
                  activitiesCheckBoxes[i].disabled = true;
                  activitiesCheckBoxes[i].parentNode.style.color = "grey";
               }
               else
               {
                  activitiesCheckBoxes[i].disabled = false;
                  activitiesCheckBoxes[i].parentNode.style.color = "initial";
               }

      }  
   }

//if the cost is nonzero, make sure the total cost label is displayed
//if the cost is zero, hide the total cost label
   if (totalCost > 0)
   {
      totalCostLabel.style.display = "block";
      totalCostLabel.innerText = "Total: $" + totalCost;
   }
   else
   {
      totalCostLabel.style.display = "none";
   }
   

});






paymentSelectElement.addEventListener('input', (event) => {

   //execute the handler function, which will hide the validation message given that the user has
   //now necessarily selected a payment method when this event listener executes
   paymentSelectionErrorMessageHandler()

   //display the appropriate payment form div based on payment type user selects
   switch (event.target.value)
   {
      case "credit card":

         creditCardDivElement.style.display = "block";

         payPalDivElement.style.display = "none";

         bitcoinDivElement.style.display = "none";


      break;

      case "paypal":

         payPalDivElement.style.display = "block";   
   
         creditCardDivElement.style.display = "none";

         bitcoinDivElement.style.display = "none";

      break

      case "bitcoin":

         bitcoinDivElement.style.display = "block";
   
         payPalDivElement.style.display = "none";

         creditCardDivElement.style.display = "none";

      break;

   }

});

creditCardInputElement.addEventListener('input', creditCardErrorMessageHandler);
creditCardInputElement.addEventListener('focusout', creditCardErrorMessageHandler);

zipCodeInputElement.addEventListener('input', zipCodeErrorMessageHandler);
zipCodeInputElement.addEventListener('focusout', zipCodeErrorMessageHandler);

cvvInputElement.addEventListener('input', cvvErrorMessageHandler);
cvvInputElement.addEventListener('focusout', cvvErrorMessageHandler);


//event listener for submission of the form
formElement.addEventListener('submit', (event) => {

   //use masterValidation function to prevent submission if any element does not pass validation
   //then call all validation error message handlers, which will only display messages if user input is not valid
   if (masterValidation() == false)
   {

      event.preventDefault();      
      masterErrorMessage.style.display = "block";

      nameErrorMessageHandler();
      emailErrorMessageHandler();
      activityErrorMessageHandler();
      paymentSelectionErrorMessageHandler();
      

      


      if (paymentSelectElement.value == 'credit card')
      {
         creditCardErrorMessageHandler();
         zipCodeErrorMessageHandler();
         cvvErrorMessageHandler();
      }

      //scroll to bottom of HTML element so that user can see the validation message at bottom of page
      htmlElement.scrollIntoView(false);
   }
   


});

// END OF EVENT LISTENERS******************************************************************************
// ****************************************************************************************************





//ERROR MESSAGE HANDLERS*****************************************************************************
// *******************************************************************************************************

function nameErrorMessageHandler()
{
   
   if (!nameValidation(nameInputElement.value))
   {
      nameErrorMessage.style.display = "block";

      nameInputElement.style.borderColor = "firebrick";
   }
   else
   {
      nameErrorMessage.style.display = "none";

      nameInputElement.style.borderColor = "initial";
   }

}



function emailErrorMessageHandler()
{
   switch (emailValidation(emailInputElement.value))
   {
      case 1:
         emailErrorMessage.innerText = "Email field cannot be blank.";

         emailErrorMessage.style.display = "block";

         emailInputElement.style.borderColor = "firebrick";

      break;

      case 2:

         emailErrorMessage.innerText = "You must enter a valid email address.";

         emailErrorMessage.style.display = "block";

         emailInputElement.style.borderColor = "firebrick";
         

      break;


      case 3:

         emailErrorMessage.style.display = "none";

         emailInputElement.style.borderColor = "initial";

      break;

      default:

         emailErrorMessage.style.display = "none";

         emailInputElement.style.borderColor = "initial";
   }
}


//activity validation error message handler--this is only activated when user hits submit button
//the event listener for the activities fieldset disables the message in the event that the user checks a box
function activityErrorMessageHandler()
{

   if (activityValidation())
   {

         activityErrorMessage.style.display = "none";
   
   }
   else
   {
      activityErrorMessage.style.display = "block";
   }
}


function paymentSelectionErrorMessageHandler()
{
   if (paymentSelectionValidation())
   {
      paymentSelectionErrorMessage.style.display = "none";
   }
   else
   {
      paymentSelectionErrorMessage.style.display = "block";
   }

}


function creditCardErrorMessageHandler()
{
   if (creditCardValidation(creditCardInputElement.value))
   {
      creditCardErrorMessage.style.display = "none";

      creditCardInputElement.style.borderColor = "initial";

   }
   else
   {
      creditCardErrorMessage.style.display = "block";

      creditCardInputElement.style.borderColor = "firebrick";
   }

}


function zipCodeErrorMessageHandler()
{
   if (zipCodeValidation(zipCodeInputElement.value))
   {
      zipCodeErrorMessage.style.display = "none";

      zipCodeInputElement.style.borderColor = "initial";
   }
   else
   {
      zipCodeErrorMessage.style.display = "block";

      zipCodeInputElement.style.borderColor = "firebrick";
   }
}


function cvvErrorMessageHandler()
{
   if (cvvValidation(cvvInputElement.value))
   {
      cvvErrorMessage.style.display = "none";

      cvvInputElement.style.borderColor = "initial";
   }
   else
   {
      cvvErrorMessage.style.display = "block";

      cvvInputElement.style.borderColor = "firebrick";
   }
}


// END OF ERROR MESSAGE HANDLERS***********************************************************************
// *********************************************************************************************************
   





// VALIDATION FUNCTIONS*************************************************************************************
// *********************************************************************************************************

function nameValidation(name)
{
   if (name == "")
   {
      return false;
   }
   else
   {
      return true;
   }

}


function emailValidation(email)
{
   const emailTester = /^\S+@\S+\.\D{3}$/;

   if (email == "")
   {
      return 1;
   }
   else if (!emailTester.test(email))
   {
      return 2;
   }
   else
   {
      return 3;
   }
}


function activityValidation()
{

   const activitiesCheckBoxes = document.querySelectorAll(".activities input");

   

   for (i=0; i < activitiesCheckBoxes.length; i++)
   {
     
      if (activitiesCheckBoxes[i].checked)
      {
         
         return true;
      }

   }

   return false;
}

function paymentSelectionValidation()
{

   if (paymentSelectElement.value != "select method")
   {
      return true;
   }
   else
   {
      return false;
   }

}


function creditCardValidation(cardNumber)
{
   const cardNumberTester = /^\d{13,16}$/;

   if (cardNumberTester.test(cardNumber))
   {
      return true;
   }
   else
   {
      return false;
   }
}


function zipCodeValidation(zipCode)
{
   const zipCodeTester = /^\d{5}$/;

   if (zipCodeTester.test(zipCode))
   {
      return true;
   }
   else
   {
      return false;
   }
}

function cvvValidation(cvv)
{
   const cvvTester = /^\d{3}$/;

   if (cvvTester.test(cvv))
   {
      return true;
   }
   else
   {
      return false;
   }

}


function masterValidation()
{
   if (nameValidation(nameInputElement.value) && emailValidation(emailInputElement.value) == 3 && activityValidation() && paymentSelectionValidation() && ((paymentSelectElement.value != 'credit card') || (creditCardValidation(creditCardInputElement.value) && zipCodeValidation(zipCodeInputElement.value) && cvvValidation(cvvInputElement.value))))
   {
      return true;
   }
   else
   {
      return false;
   }
}

//END OF VALIDATION FUNCTIONS********************************************************************************
// **********************************************************************************************************