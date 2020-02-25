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




activitiesFieldsetElement.addEventListener('change', (event) => {

   const activitiesCheckBoxes = document.querySelectorAll(".activities input");
   
   //totalCost += parseInt(event.target.getAttribute("data-cost"));

   totalCost = 0;

   for (i=0; i < activitiesCheckBoxes.length; i++)
   {
      if (activitiesCheckBoxes[i].checked)
      {
         totalCost += parseInt(activitiesCheckBoxes[i].getAttribute("data-cost"));
      }
   }

   if (totalCost > 0)
   {
      totalCostLabel.style.display = "block";
      totalCostLabel.innerText = totalCost;
   }
   else
   {
      totalCostLabel.style.display = "none";
   }
   

});