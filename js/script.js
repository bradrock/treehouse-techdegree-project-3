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


var selectedTime = "";

var wasChecked = false;

activitiesFieldsetElement.addEventListener('change', (event) => {

   const activitiesCheckBoxes = document.querySelectorAll(".activities input");

   selectedTime = event.target.getAttribute("data-day-and-time");

   wasChecked = event.target.checked;

   

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
      if(!event.target.isSameNode(activitiesCheckBoxes[i]))
      {
         //if it was already checked, then we're not going to change it
         if (!activitiesCheckBoxes[i].checked)
         {
            //test whether the option is a match for the time to the targeted option
            if (activitiesCheckBoxes[i].getAttribute("data-day-and-time") == selectedTime)
            {
               //if wasChecked is true, then time matches should be disabled; if wasChecked is false,
               //then time matches should be enabled--this line accomplishes either option based on
               //the value of wasChecked
               activitiesCheckBoxes[i].disabled = wasChecked;

               if (activitiesCheckBoxes[i].disabled)
               {
                  activitiesCheckBoxes[i].parentNode.style.color = "grey";
               }
               else
               {
                  activitiesCheckBoxes[i].parentNode.style.color = "initial";
               }

            }
         }

      }  
   }

   




// else //(was unchecked)
// {

//    for (i=0; i < activitiesCheckBoxes.length; i++)
//    {
//       if (activitiesCheckBoxes[i].checked)
//       {
//          totalCost += parseInt(activitiesCheckBoxes[i].getAttribute("data-cost"));

//          if (activitiesCheckBoxes[i].getAttribute("data-day-and-time") == selectedTime)
//          {
//             activitiesCheckBoxes[i].disabled = "false";
//          }

//       }


//    }

// }

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