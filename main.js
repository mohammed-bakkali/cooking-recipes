const url = "https://www.themealdb.com/api/json/v1/1/random.php";
const url1 = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let html = '';
let recipes = [];
function print() {
  for (let i = 0; i < 6; i++) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        recipes.push(data.meals[0]);
        html += `
          <div class="col-sm-12 col-md-4 col-lg-4 ">
            <div class="card" style="width: 18rem;">
              <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${data.meals[0].strMeal}</h5>
                <button type="button" class="btn btn-primary" id="btn-${i}">Primary</button>
              </div>
            </div>
          </div>
        `;
        document.getElementById("content").innerHTML = html;
        console.log(`${i} `)
        let btns = document.querySelectorAll("button.btn-primary");
        btns.forEach(function (btn, index) {
          btn.addEventListener("click", function() {
            let id = index;
            let mod = document.getElementById("window");
            mod.style.display = "block";
            mod.style.opacity = "1";
            document.getElementById("title").innerHTML = recipes[id].strMeal;
            document.getElementById("strArea").innerHTML = recipes[id].strArea;
            document.getElementById("prescription").innerHTML = recipes[id].strInstructions;

          });
        });
      });
  }
}
print();

function searchData(value) {
  let html = '';
  fetch(url1 + value).then((response) => { return response.json() }).then(data => { // url + value input
    for (let i = 0; i < 25; i++) {
      if (data.meals[i].strMeal.toLocaleUpperCase().startsWith(value.toLocaleUpperCase())) {
        html += `
      <div class="col-sm-12 col-md-4 col-lg-4 ">
        <div class="card" style="width: 18rem;">
          <img src="${data.meals[i].strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${data.meals[i].strMeal}</h5>
            <a href="#" class="btn btn-danger"  onclick="Modale()">Go somewhere</a></a>
          </div>
          </div>
        </div>
      `
        document.getElementById('content').innerHTML = html;
      }
    }
    if (value == "") {
      print()
    }
  });
}

function none() {
  let = document.getElementById('window').style.display = "none";
}



