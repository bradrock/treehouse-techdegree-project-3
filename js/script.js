/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
by Brad Rock
******************************************/

//need to add something that disregards credit card validation if user switches payment methods


//put name input field (the first field on the page) in focus state
const nameInputElement = document.getElementById("name");
const emailInputElement = document.getElementById("mail");
const userFormElement = document.querySelector("form");
const creditCardInputElement = document.getElementById("cc-num");
const creditCardDivElement = document.getElementById("credit-card");
const zipCodeInputElement = document.getElementById("zip");
const cvvInputElement = document.getElementById("cvv");

const button = document.querySelector("button");

const container = document.querySelector("div.container");

const htmlElement = document.querySelector("html");

nameInputElement.focus();


//hide the field where the user specifies their job role if they choose "other" (unhidden if they actually choose this option)
const otherTitleElement = document.getElementById("other-title");
otherTitleElement.style.display = "none";

//selects first option element within the select element with the id "design"
const designSelectOptionElement = document.querySelector("#design option");

//sets the element to be hidden so that it cannot be selected by the user (only displayed before user makes a choice)
designSelectOptionElement.hidden = true;


const colorSelectElement = document.getElementById("color");





const newColorOptionElement = document.createElement("OPTION");

newColorOptionElement.innerText = "Please select a T-shirt theme";



colorSelectElement.insertBefore(newColorOptionElement, colorSelectElement.childNodes[0]);

colorSelectElement.selectedIndex = "0";

const colorSelectOptions = document.querySelectorAll("#color option");

for (i = 0; i < colorSelectOptions.length; i++)
   {

      colorSelectOptions[i].hidden = true;

   }

const jsPunsOptions = document.querySelectorAll(".js-puns");

const heartJsOptions = document.querySelectorAll(".heart-js");


const designSelectElement = document.getElementById("design");


const activitiesFieldsetElement = document.querySelector("fieldset.activities");

let totalCost = 0;

const totalCostLabel = document.createElement("LABEL");

totalCostLabel.style.display = "none";

activitiesFieldsetElement.appendChild(totalCostLabel);






const nameCannotBeBlankLabel = document.createElement("LABEL");

nameCannotBeBlankLabel.innerText = "Name field cannot be empty.";

nameCannotBeBlankLabel.style.display = "none";

nameCannotBeBlankLabel.style.color = "firebrick";

const basicInfoFieldset = nameInputElement.parentElement;

basicInfoFieldset.insertBefore(nameCannotBeBlankLabel, nameInputElement.nextSibling);




const emailValidationMessage = document.createElement("LABEL");

emailValidationMessage.style.display = "none";

emailValidationMessage.style.color = "firebrick";

basicInfoFieldset.insertBefore(emailValidationMessage, emailInputElement.nextSibling);



const activityValidationMessage = document.createElement("LABEL");

activityValidationMessage.style.display = "none";

activityValidationMessage.style.color = "firebrick";

activityValidationMessage.innerText = "You must select at least one activity.";

activitiesFieldsetElement.appendChild(activityValidationMessage);



const creditCardValidationMessage = document.createElement("LABEL");

creditCardValidationMessage.style.display = "none";

creditCardValidationMessage.style.color = "firebrick";

creditCardValidationMessage.innerText = "You must enter a valid credit card number.";

creditCardDivElement.appendChild(creditCardValidationMessage);



const zipCodeValidationMessage = document.createElement("LABEL");

zipCodeValidationMessage.style.display = "none";

zipCodeValidationMessage.style.color = "firebrick";

zipCodeValidationMessage.innerText = "You must enter a valid zip code.";

creditCardDivElement.appendChild(zipCodeValidationMessage);



const cvvValidationMessage = document.createElement("LABEL");

cvvValidationMessage.style.display = "none";

cvvValidationMessage.style.color = "firebrick";

cvvValidationMessage.innerText = "You must enter a valid CVV.";

creditCardDivElement.appendChild(cvvValidationMessage);



const masterValidationMessage = document.createElement("LABEL");

masterValidationMessage.style.display = "none";

masterValidationMessage.style.color = "firebrick";

masterValidationMessage.id = "master-validation-message";

masterValidationMessage.innerText = "Insufficient information has been provided for submission. Please see the error messages above.";

//userFormElement.insertBefore(masterValidationMessage, button);

userFormElement.appendChild(masterValidationMessage);

//masterValidationMessage.style.marginBottom = "0em";







const paymentSelectElement = document.getElementById("payment");

const paymentSelectPaymentOption = document.querySelector("#payment option[value='select method']");

// const paymentCreditCardOption = document.querySelector("#payment option[value='credit card']");

// const paymentPaypalOption = document.querySelector("#payment option[value='paypal']");

// const paymentBitcoinOption = document.querySelector("#payment option[value='bitcoin']");

paymentSelectPaymentOption.hidden = true;



const payPalDiv = document.querySelector("div.paypal");

const bitcoinDiv = document.querySelector("div.bitcoin");

payPalDiv.style.display = "none";

bitcoinDiv.style.display = "none";


designSelectElement.addEventListener('input', (event) => {

   if (event.target.value === "js puns")
   {

      colorSelectElement.selectedIndex = "1";

      colorSelectElement[0].hidden = true;

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

      colorSelectElement.selectedIndex = "4";

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



paymentSelectElement.addEventListener('input', (event) => {

switch (event.target.value)
{
   case "credit card":

      creditCardDivElement.style.display = "block";

      payPalDiv.style.display = "none";

      bitcoinDiv.style.display = "none";


   break;

   case "paypal":

      payPalDiv.style.display = "block";   
   
      creditCardDivElement.style.display = "none";

      bitcoinDiv.style.display = "none";

   break

   case "bitcoin":

      bitcoinDiv.style.display = "block";
   
      payPalDiv.style.display = "none";

      creditCardDivElement.style.display = "none";

   break;

   default:


}



});




nameInputElement.addEventListener('focusout', (event) => {

   nameValidationHandler();


});


function nameValidationHandler()
{
   if (!nameValidation(nameInputElement.value))
   {
      nameCannotBeBlankLabel.style.display = "block";

      nameInputElement.style.borderColor = "firebrick";
   }
   else
   {
      nameCannotBeBlankLabel.style.display = "none";

      nameInputElement.style.borderColor = "initial";
   }

}

userFormElement.addEventListener('submit', (event) => {

   
   if (masterValidation() == false)
   {

      event.preventDefault();      
      masterValidationMessage.style.display = "block";

      if (nameValidation(nameInputElement.value) == false)
      {
         nameCannotBeBlankLabel.style.display = "block";
      }

      if (emailValidation(emailInputElement.value) > 1)
      {
         emailValidationMessage.style.display = "block";
      }


      if (activityValidation() == false)
      {
         activityValidationMessage.style.display = "block";
      }


      if (paymentSelectElement.value != 'credit-card' && creditCardValidation(creditCardInputElement.value))

      htmlElement.scrollIntoView(false);
   }
   
   
   


});

emailInputElement.addEventListener('focusout', (event) => {

   emailValidationHandler();

});


function emailValidationHandler()
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


creditCardInputElement.addEventListener('focusout', (event) => {

   if (creditCardValidation(creditCardInputElement.value))
   {
      creditCardValidationMessage.style.display = "none";
   }
   else
   {
      creditCardValidationMessage.style.display = "block";
   }

});


zipCodeInputElement.addEventListener('focusout', (event) => {

   if (zipCodeValidation(zipCodeInputElement.value))
   {
      zipCodeValidationMessage.style.display = "none";
   }
   else
   {
      zipCodeValidationMessage.style.display = "block";
   }

});


cvvInputElement.addEventListener('focusout', (event) => {

   if (cvvValidation(cvvInputElement.value))
   {
      cvvValidationMessage.style.display = "none";
   }
   else
   {
      cvvValidationMessage.style.display = "block";
   }

});





// function showCreditCardValidationMessage()
// {
//    creditCardValidationMessage.display = "block";
// }



   

function masterValidation()
{
   if (nameValidation(nameInputElement.value) && emailValidation(emailInputElement.value) == 1 && activityValidation() && (paymentSelectElement.value != 'credit-card' || (creditCardValidation(creditCardInputElement.value) && zipCodeValidation(zipCodeInputElement.value) && cvvValidation(cvvInputElement.value))))
   {
      return true;
   }
   else
   {
      return false;
   }
}



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

   let isAtLeastOneActivityChecked = false;

   for (i=0; i < activitiesCheckBoxes.length; i++)
   {
     
      if (activitiesCheckBoxes[i].checked)
      {
         isAtLeastOneActivityChecked = true;
         return true;
      }

   }

   return false;
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