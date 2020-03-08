/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
by Brad Rock
******************************************/

//need to refactor
//get rid of t-shirt "select an option" select option
//check on whether master error message should disappear when all other elements are fixed
//should error messages disappear when corrected even if not focusout yet?



/*Structure of file:
DOM setup
Event listeners
Validation message handlers
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

//create the validation message that notifies the user that the name field cannot be empty
const nameValidationMessage = document.createElement("LABEL");

nameValidationMessage.innerText = "Name field cannot be empty.";

nameValidationMessage.style.display = "none";

nameValidationMessage.style.color = "firebrick";

//insert the validation message into the fieldset of which the name element is a child
const basicInfoFieldset = nameInputElement.parentElement;

basicInfoFieldset.insertBefore(nameValidationMessage, nameInputElement.nextSibling);

// (end of name input element-related setup)*******************************************************************







//perform email input element-related setup************************************************************


const emailInputElement = document.getElementById("mail");


//set up the validation message that notifies the user that the name field cannot be empty
//content of the message depends on whether field is blank or contains an invalid email address when
//user focuses out of it, so the inner text of the validation message element is set in the
//event listener
const emailValidationMessage = document.createElement("LABEL");

emailValidationMessage.style.display = "none";

emailValidationMessage.style.color = "firebrick";

basicInfoFieldset.insertBefore(emailValidationMessage, emailInputElement.nextSibling);


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


//don't think I need this anymore?
const newColorOptionElement = document.createElement("OPTION");

newColorOptionElement.innerText = "Please select a T-shirt theme";

colorSelectElement.insertBefore(newColorOptionElement, colorSelectElement.childNodes[0]);

colorSelectElement.selectedIndex = "0";

const colorSelectOptions = document.querySelectorAll("#color option");

for (i = 0; i < colorSelectOptions.length; i++)
   {
      colorSelectOptions[i].hidden = true;
   }
// **********************************

// (end of t-shirt color select element-related setup)*******************************************************************






//perform setup operations pertaining to the activities fieldset*********************************************

const activitiesFieldsetElement = document.querySelector("fieldset.activities");

//set up label to display total cost of selected activities
let totalCost = 0;

const totalCostLabel = document.createElement("LABEL");

totalCostLabel.style.display = "none";

activitiesFieldsetElement.appendChild(totalCostLabel);




//set up validation message for activity section

const activityValidationMessage = document.createElement("LABEL");

activityValidationMessage.style.display = "none";

activityValidationMessage.style.color = "firebrick";

activityValidationMessage.innerText = "You must select at least one activity.";

activitiesFieldsetElement.appendChild(activityValidationMessage);



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


//create and insert payment validation message
const paymentSelectionValidationMessage = document.createElement("LABEL");

paymentSelectionValidationMessage.style.display = "none";

paymentSelectionValidationMessage.style.color = "firebrick";

paymentSelectionValidationMessage.innerText = "You must select a payment option.";

formElement.insertBefore(paymentSelectionValidationMessage, button);




//create and insert credit card number validation message
const creditCardValidationMessage = document.createElement("LABEL");

creditCardValidationMessage.style.display = "none";

creditCardValidationMessage.style.color = "firebrick";

creditCardValidationMessage.innerText = "You must enter a valid credit card number.";

creditCardDivElement.appendChild(creditCardValidationMessage);


//create and insert zip code validation message
const zipCodeValidationMessage = document.createElement("LABEL");

zipCodeValidationMessage.style.display = "none";

zipCodeValidationMessage.style.color = "firebrick";

zipCodeValidationMessage.innerText = "You must enter a valid zip code.";

creditCardDivElement.appendChild(zipCodeValidationMessage);


//create and insert cvv validation message
const cvvValidationMessage = document.createElement("LABEL");

cvvValidationMessage.style.display = "none";

cvvValidationMessage.style.color = "firebrick";

cvvValidationMessage.innerText = "You must enter a valid CVV.";

creditCardDivElement.appendChild(cvvValidationMessage);



//hide all elements until user picks a payment option
payPalDivElement.style.display = "none";

bitcoinDivElement.style.display = "none";

creditCardDivElement.style.display = "none";



// (end of payment section-related setup)*******************************************************************







//setup of the master validation message********************************************************************

const masterValidationMessage = document.createElement("LABEL");

masterValidationMessage.style.display = "none";

masterValidationMessage.style.color = "firebrick";

masterValidationMessage.id = "master-validation-message";

masterValidationMessage.innerText = "Insufficient information has been provided for submission. Please see the error messages above.";

formElement.appendChild(masterValidationMessage);


// (end of setup for the master validation message)*********************************************************



// END OF DOM SETUP*****************************************************************************************
// *********************************************************************************************************




//EVENT LISTENERS******************************************************************************************
//some of these simply call validation message handlers, while others perform other operations instead/as well

nameInputElement.addEventListener('focusout', nameValidationMessageHandler);
emailInputElement.addEventListener('focusout', emailValidationMessageHandler);

titleSelectElement.addEventListener('input', (event) => {

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

   if (event.target.value === "js puns")
   {

      colorSelectElement.selectedIndex = "1";

      //may need to remove
      colorSelectElement[0].hidden = true;

      //may need to revise
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
      //check/may need to remove
      colorSelectElement[0].hidden = true;

      colorSelectElement.selectedIndex = "4";

      //may need to revise
      for (i = 0; i < 4; i++)
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

   const wasChecked = event.target.checked;

   if (wasChecked)
   {
      activityValidationMessage.style.display = "none";
      totalCost += parseInt(event.target.getAttribute("data-cost"));

   }
   else
   {
      totalCost -= parseInt(event.target.getAttribute("data-cost"));
   }


   //loop through the checkboxes to enable/disable as necessary
   for (i=0; i < activitiesCheckBoxes.length; i++)
   {
      //skip over the node that was the target of the event, as we don't want to change it
      //also, test whether the option is a match for the time to the targeted option
      if(!event.target.isSameNode(activitiesCheckBoxes[i]) && activitiesCheckBoxes[i].getAttribute("data-day-and-time") == selectedTime)
      {
            
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


creditCardInputElement.addEventListener('focusout', creditCardValidationMessageHandler);



paymentSelectElement.addEventListener('input', (event) => {

   paymentSelectionValidationMessageHandler()

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


zipCodeInputElement.addEventListener('focusout', zipCodeValidationMessageHandler);

cvvInputElement.addEventListener('focusout', cvvValidationMessageHandler)


formElement.addEventListener('submit', (event) => {

   
   if (masterValidation() == false)
   {

      event.preventDefault();      
      masterValidationMessage.style.display = "block";

      nameValidationMessageHandler();
      emailValidationMessageHandler();
      activityValidationMessageHandler();
      paymentSelectionValidationMessageHandler();
      

      


      if (paymentSelectElement.value == 'credit card')
      {
         creditCardValidationMessageHandler();
         zipCodeValidationMessageHandler();
         cvvValidationMessageHandler();
      }

      htmlElement.scrollIntoView(false);
   }
   


});

// END OF EVENT LISTENERS******************************************************************************
// ****************************************************************************************************





//VALIDATION MESSAGE HANDLERS*****************************************************************************
// *******************************************************************************************************

function nameValidationMessageHandler()
{
   if (!nameValidation(nameInputElement.value))
   {
      nameValidationMessage.style.display = "block";

      nameInputElement.style.borderColor = "firebrick";
   }
   else
   {
      nameValidationMessage.style.display = "none";

      nameInputElement.style.borderColor = "initial";
   }

}



function emailValidationMessageHandler()
{
   switch (emailValidation(emailInputElement.value))
   {
      case 1:
         emailValidationMessage.innerText = "Email field cannot be blank.";

         emailValidationMessage.style.display = "block";

         emailInputElement.style.borderColor = "firebrick";

      break;

      case 2:

         emailValidationMessage.innerText = "You must enter a valid email address.";

         emailValidationMessage.style.display = "block";

         emailInputElement.style.borderColor = "firebrick";
         

      break;


      case 3:

         emailValidationMessage.style.display = "none";

         emailInputElement.style.borderColor = "initial";

      break;

      default:

         emailValidationMessage.style.display = "none";

         emailInputElement.style.borderColor = "initial";
   }
}


//activity validation message handler--this is only activated when user hits submit button
//the event listener for the activities fieldset disables the message in the event that the user checks a box
function activityValidationMessageHandler()
{

   if (activityValidation())
   {

         activityValidationMessage.style.display = "none";
   
   }
   else
   {
      activityValidationMessage.style.display = "block";
   }
}


function paymentSelectionValidationMessageHandler()
{
   if (paymentSelectionValidation())
   {
      paymentSelectionValidationMessage.style.display = "none";
   }
   else
   {
      paymentSelectionValidationMessage.style.display = "block";
   }

}


function creditCardValidationMessageHandler()
{
   if (creditCardValidation(creditCardInputElement.value))
   {
      creditCardValidationMessage.style.display = "none";

      creditCardInputElement.style.borderColor = "initial";

   }
   else
   {
      creditCardValidationMessage.style.display = "block";

      creditCardInputElement.style.borderColor = "firebrick";
   }

}


function zipCodeValidationMessageHandler()
{
   if (zipCodeValidation(zipCodeInputElement.value))
   {
      zipCodeValidationMessage.style.display = "none";

      zipCodeInputElement.style.borderColor = "initial";
   }
   else
   {
      zipCodeValidationMessage.style.display = "block";

      zipCodeInputElement.style.borderColor = "firebrick";
   }
}


function cvvValidationMessageHandler()
{
   if (cvvValidation(cvvInputElement.value))
   {
      cvvValidationMessage.style.display = "none";

      cvvInputElement.style.borderColor = "initial";
   }
   else
   {
      cvvValidationMessage.style.display = "block";

      cvvInputElement.style.borderColor = "firebrick";
   }
}


// END OF VALIDATION MESSAGE HANDLERS***********************************************************************
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