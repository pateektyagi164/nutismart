document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('results').innerHTML = "";
  document.getElementById('ingredientInput').value = "";
  document.getElementById('numberofrecepies').value = "";
  document.getElementById('results').style.display = "none";
  document.querySelector('.docs').style.display = "none";

  
  const btns = document.querySelectorAll(".sidebar-btn");
  const track= localStorage.getItem("tracker");
 if(track){
  document.getElementById(`${track}`).classList.add("active");
 }


  btns.forEach(b => {
    b.addEventListener("click", function () {
      btns.forEach(BTN => BTN.classList.remove("active"));
      this.classList.add("active");
      localStorage.setItem("tracker", this.id);
    });
  });
});

function docs(){
    document.querySelector('.docs').style.display="block";
    document.querySelector('.content').style.display="none";
    
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

let track = localStorage.getItem("tracker");
if (track) {
  const btn1 = document.querySelector(`#${track}`);
   btn1.classList.add("active");
}

let btn = document.querySelectorAll(".sidebar-btn");
btn.forEach(b => {
  b.addEventListener("click", function () {
    btn.forEach(BTN => {
      BTN.classList.remove("active");
    });
    localStorage.clear();
    
    localStorage.setItem("tracker", this.id);
  });
});
async function submit(){
    document.getElementById('entryForm').style.display = "none";
    document.getElementById('results').style.display = "block";
    document.getElementById("results").innerHTML = "";
    const apiKey= "e2aab369f5714eef9c3961d5279b2e98";
    const string=`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${document.getElementById('ingredientInput').value}&number=${document.getElementById('numberofrecepies').value}&apiKey=${apiKey}`;

fetch(string)
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data) || data.length === 0) {
        document.getElementById("results").innerHTML = "<b>No results found.</b>";
        return;
      }
      for (let f = 0; f < data.length; f++) {
        let rrecepie = document.createElement("div");
        let rimage= document.createElement("img");
        let rinstructions = document.createElement("div");
        let re = "";
        
             
                let ke="";
                fetch(`https://api.spoonacular.com/recipes/${data[f].id}/analyzedInstructions?apiKey=${apiKey}`)
                .then(res => res.json())    
                .then(dat=>{
                    for(let i=0;i<dat.length;i++){
                        ke+= `<b>STEPS</b> : <br>`;
                        for(let j=0;j<dat[i].steps.length;j++){
                            ke += `${j+1}. ${dat[i].steps[j].step}<br>`;
                        }

                    };
                    rinstructions.innerHTML = ke;
                });

            
            
                rimage.setAttribute("src",`${data[f].image}`);
            
            
        

          re += `<b> title: </b>: ${data[f].title}<br>`;
            
        
        rrecepie.innerHTML = re;
       
        let recipeRow = document.createElement("div");
recipeRow.classList = "recipe-row";
recipeRow.appendChild(rimage);
recipeRow.appendChild(rrecepie);
recipeRow.appendChild(rinstructions);
document.getElementById("results").appendChild(recipeRow);

      }
    })
    .catch(err => {
      console.error("Error fetching data:", err);
      document.getElementById("results").innerHTML = "<b>Failed to fetch data. Please try again.</b>";
    });

}