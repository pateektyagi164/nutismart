document.addEventListener("DOMContentLoaded", function () {
  document.querySelector('.docs').style.display = "none";
  

  
  const btns = document.querySelectorAll(".sidebar-btn");
  btns.forEach(BTN => BTN.classList.remove("active"));
  document.getElementById('home').classList.add("active");
  localStorage.setItem("tracker", "home");

  btns.forEach(b => {
    b.addEventListener("click", function () {
      btns.forEach(BTN => BTN.classList.remove("active"));
      this.classList.add("active");
      localStorage.setItem("tracker", this.id);
    });
  });

  
  

function docs() {
  document.querySelector('.docs').style.display = "block";
  document.querySelector('.content').style.display = "none";
  
  const docsSection = document.querySelector('.docs');
  if (docsSection) {
    docsSection.innerHTML = `
      <div class="instructions-content">
        <h2>How to Use Search Recipes By Nutrients</h2>
        <ol>
          <li>Open the relevant search page from the sidebar.</li>
          <li>Fill in the required fields (nutrients, ingredients, etc.).</li>
          <li>Click <b>Submit</b> to see recipe results.</li>
          <li>Review the recipes and steps provided.</li>
          <li>Reload the page to start a new search.</li>
        </ol>
        <p><b>Tip:</b> Leave fields blank if you don’t want to filter by that value.</p>
      </div>
      <pre>   </pre>
      <div class="instructions-content">
        <h2>How to Use Search Recipes by Ingredients</h2>
        <ol>
          <li>Open the <b>Search recipes by ingredients</b> page from the sidebar.</li>
          <li>In the form, enter the ingredients you have, separated by commas (e.g., <i>chicken, +broccoli, +rice</i>).</li>
          <li>Enter the number of recipes you want to see.</li>
          <li>Click the <b>Submit</b> button.</li>
          <li>Browse the recipe results and follow the preparation steps.</li>
          
          <li>Reload the page to start a new search.</li>
        </ol>
        <p><b>Tip:</b> The more ingredients you enter, the more specific your results will be. Leave the field blank to see recipes with any ingredients.</p>
      </div>
      <pre>   </pre>
      <div class="imp">
        <h2><b>Important Note</b></h2>
        <p>
This application uses a free Spoonacular API key in the frontend, which allows only 150 requests per day. If you reach this daily limit, you can obtain your own free API key from the Spoonacular website and replace the API key in the code for continued use.
</p>
        </div>
        `;

   }
  };

