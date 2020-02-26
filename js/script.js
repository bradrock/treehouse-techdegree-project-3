/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
by Brad Rock
******************************************/


//put name input field (the first field on the page) in focus state
document.getElementById("name").focus();


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

        

      //   if (i > 0 && i < 4)
      //   {
      //    colorSelectOptions[i].classList.add("js-puns");
      //   }
      //   else if (i >= 4)
      //   {
      //    colorSelectOptions[i].classList.add("heart-js");
      //   }

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


const paymentSelectElement = document.getElementById("payment");

const paymentSelectPaymentOption = document.querySelector("#payment option[value='select method']");

// const paymentCreditCardOption = document.querySelector("#payment option[value='credit card']");

// const paymentPaypalOption = document.querySelector("#payment option[value='paypal']");

// const paymentBitcoinOption = document.querySelector("#payment option[value='bitcoin']");

paymentSelectPaymentOption.hidden = true;

const creditCardDiv = document.querySelector("div.credit-card");

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

      creditCardDiv.style.display = "block";

      payPalDiv.style.display = "none";

      bitcoinDiv.style.display = "none";


   break;

   case "paypal":

      payPalDiv.style.display = "block";   
   
      creditCardDiv.style.display = "none";

      bitcoinDiv.style.display = "none";

   break

   case "bitcoin":

      bitcoinDiv.style.display = "block";
   
      payPalDiv.style.display = "none";

      creditCardDiv.style.display = "none";

   break;

   default:


}



});