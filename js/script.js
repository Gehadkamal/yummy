// declare variables
var x = [];

var row = document.getElementById("rowData");

// loading screen  
search("").then(() => {
    $(".loading-screen").fadeOut(500, () => {
        $("body").css("overflow", "visible")
    })
})
// header
// side nav-bar

$('.menu-btn ').click(function () {
    let BoxWidth = $("#mySidenav").width();
    if (BoxWidth == "250") {

        $("#mySidenav").width("0px");
        $("#main").css("margin-left", "0px");
        document.getElementById("days").innerHTML = `<span class="fa fa-align-justify "></span>`;

    } else {
        $("#main").css("margin-left", "250px");
        $("#mySidenav").width("250px");
        // document.getElementsByClassName("menu-btn").innerHtml='<span class="fa fa-align-justify fa-times"></span>';
        document.getElementById("days").innerHTML = `<span class="fa fa-align-justify fa-times"></span>`;
        $(".nac a ").animate({
            opacity: "0",
            paddingTop: "500px"
        }, 500)
        $(".nac #item").animate({

            opacity: "1",
            paddingTop: "25px"
        }, 500)
        $(".nac #item1").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 600)
        $(".nac #item2").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 700)
        $(".nac #item3").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 800)
        $(".nac #item4").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 900)

        // })

    }
})

// search (get data from api)

async function search(q) {
    $(".loading-container").fadeIn(100)
    let dataOfmeal = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`);
    dataOfmeal = await dataOfmeal.json();
    displayMeals(dataOfmeal.meals)
    $(".loading-container").fadeOut(400)
    return dataOfmeal;
}

function displayMeals(x) {

    let meals = ""
    for (let i = 0; i < x.length; i++) {
        meals += `
        <div class="col-md-6 col-lg-3 my-3 myM  shadow">
            <div onclick="getMeal('${x[i].idMeal}')" class="movie shadow rounded position-relative">
                <div class="post ">
                    <img src='${x[i].strMealThumb}' class="w-100 rounded-2" />
                    <div class="layer d-flex align-items-center ">
                        <div class="info p-2">
                            <h2>${x[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }
    row.innerHTML = meals
    $("html, body").animate({
        scrollTop: 0
    }, 200)
}

async function getByLetter(letter) {
    if (letter) {
        $(".loading-container").fadeIn(100)
        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        meals = await meals.json()
        if (meals.meals) {
            displayMeals(meals.meals)
        }
        $(".loading-container").fadeOut(100)
    }
}

// get meals

async function getMeal(mealID) {
    $(".loading-container").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    meal = await meal.json()
    displayMealHome(meal.meals[0])
    $(".loading-container").fadeOut(500)
}

function displayMealHome(meal) {
    let recipes = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class=" my-3 mx-1 p-2 alert-success rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li> `
        }
    }

    let tags = meal.strTags?.split(",")
    let cartona = ""
    for (let i = 0; i < tags?.length; i++) {
        cartona += `<li class="my-3 mx-1 p-1 alert-danger rounded">${tags[i]}</li>`
    }

    let str = `
    <div class="col-md-4 myM text-white">
					<img class="w-100" src="${meal.strMealThumb}" alt=""
						srcset=""><br>
					<h1>${meal.strMeal}</h1>
				</div>
				<div class="col-md-8 myM text-white text-left">
					<h2>Instructions</h2>
					<p>${meal.strInstructions}</p>
					<p class="text-left"><span class="fw-bolder "> Area</span> : ${meal.strArea}</p>
					<p class="text-left"><span class="fw-bolder ">Category </span> : ${meal.strCategory}</p>
					<h3>Recipes :</h3>
					<ul class="d-flex " id="recipes">
					</ul>

					<h3 class="my-2 mx-1 p-1">Tags :</h3>
					<ul class="d-flex " id="tags">
					</ul>

					
					<a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
					<a class="btn bg-danger youtube text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
				</div>`
    row.innerHTML = str
    document.getElementById("recipes").innerHTML = recipes
    document.getElementById("tags").innerHTML = cartona
    $("html, body").animate({
        scrollTop: 0
    }, 200)

}



// category

async function categories(e) {
    y = await fetch(`https://www.themealdb.com/api/json/v1/1/${e}`);
    y = await y.json()
    return y;

}

async function dataOfCategory(category) {
    $(".loading-container").fadeIn(100)
    let mealsofCategory = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    mealsofCategory = await mealsofCategory.json()
    displayMeals(mealsofCategory.meals)
    $(".loading-container").fadeOut(500)
}
function displayCategories() {
    let cartona = ""
    for (var i = 0; i < x.length; i++) 
      cartona += `
     <div class="col-md-6 col-lg-3 my-3 myM shadow">
        <div class="movie shadow rounded position-relative">
            <div onclick="dataOfCategory('${x[i].strCategory}')" class="post">
                <img src='${x[i].strCategoryThumb}' class="w-100 rounded" />
                <div class="layer d-flex align-items-center ">
                    <div class="info p-2">
                        <h2>${x[i].strCategory}</h2>
                        <p>${x[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
            </div>
        </div>
     </div>`
    row.innerHTML = cartona
    $("html, body").animate({
        scrollTop: 0
    }, 200)
}


// area
async function area(area) {
    $(".loading-container").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    meals = await meals.json()
    displayMeals(meals.meals.slice(0, 20))
    $(".loading-container").fadeOut(500)
}
function displayArea() {
    let e = ""
    for (var i = 0; i < x.length; i++) e += `
    <div class="col-md-6 col-lg-3 my-3 myM  shadow">
        <div class="movie shadow rounded position-relative">
            <div onclick=(area('${x[i].strArea}')) class="post ">
                <i class="fa-solid fa-city text-info fa-3x"></i>
                <h2 class="text-white">${x[i].strArea}</h2>
            </div>
        </div>
    </div>`
    row.innerHTML = e
    $("html, body").animate({
        scrollTop: 0
    }, 200)


}

function displayIngredients() {
    let e = ""
    for (var i = 0; i < x.length; i++) e += `
    <div class="col-md-6 col-lg-3 my-3 myM  shadow">
        <div onclick="getMainIngredient('${x[i].strIngredient}')" class="movie shadow rounded position-relative">
            <div class="post ">
                <i class="fa-solid fa-bowl-food text-success fa-3x"></i>
                <h2 class="text-white">${x[i].strIngredient}</h2>
                <p class="text-white">${x[i].strDescription.split(" ").splice(0, 20).join(" ")}</p>
            </div>
        </div>
    </div>`
    row.innerHTML = e
    $("html, body").animate({
        scrollTop: 0
    }, 200)
}

// intgrediant
async function getMainIngredient(mealName) {
    $(".loading-container").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`)
    meal = await meal.json()
    displayMeals(meal.meals)
    $(".loading-container").fadeOut(500)
}


// declare for contact usssssssssssss
let userName;
let userEmail;
let userPhone;
let userAge;
let userPassword;
let userRePassword;
let userNameAlert;
let userEmailAlert;
let userPhoneAlert;
let userAgeAlert;
let userpasswordAlert;
let userRepasswordAlert;

let name = false,
    email = false,
    phone = false,
    age = false,
    password = false,
    repassword = false;

function validation() {

    if (urname) {
        if (userNameValid()) {
            userName.classList.remove("is-invalid")
            userName.classList.add("is-valid")
            userNameAlert.classList.replace("d-block", "d-none")
            userNameAlert.classList.replace("d-block", "d-none")

        } else {
            userName.classList.replace("is-valid", "is-invalid")
            userNameAlert.classList.replace("d-none", "d-block")
        }
    }

    if (email) {
        if (userEmailValid()) {
            userEmail.classList.remove("is-invalid")
            userEmail.classList.add("is-valid")
            userEmailAlert.classList.replace("d-block", "d-none")
            userEmailAlert.classList.replace("d-block", "d-none")
        } else {
            userEmail.classList.replace("is-valid", "is-invalid")
            userEmailAlert.classList.replace("d-none", "d-block")
        }
    }

    if (phone) {
        if (userPhoneValid()) {
            userPhone.classList.remove("is-invalid")
            userPhone.classList.add("is-valid")
            userPhoneAlert.classList.replace("d-block", "d-none")
            userPhoneAlert.classList.replace("d-block", "d-none")
        } else {
            userPhone.classList.replace("is-valid", "is-invalid")
            userPhoneAlert.classList.replace("d-none", "d-block")
        }
    }

    if (age) {
        if (userAgeValid()) {
            userAge.classList.remove("is-invalid")
            userAge.classList.add("is-valid")
            userAgeAlert.classList.replace("d-block", "d-none")
            userAgeAlert.classList.replace("d-block", "d-none")
        } else {
            userAge.classList.replace("is-valid", "is-invalid")
            userAgeAlert.classList.replace("d-none", "d-block")
        }
    }

    if (password) {
        if (userPasswordValid()) {
            userPassword.classList.remove("is-invalid")
            userPassword.classList.add("is-valid")
            userpasswordAlert.classList.replace("d-block", "d-none")
            userpasswordAlert.classList.replace("d-block", "d-none")
        } else {
            userPassword.classList.replace("is-valid", "is-invalid")
            userpasswordAlert.classList.replace("d-none", "d-block")
        }
    }

    if (repassword) {
        if (userRePasswordValid()) {
            userRePassword.classList.remove("is-invalid")
            userRePassword.classList.add("is-valid")
            userRepasswordAlert.classList.replace("d-block", "d-none")
            userRepasswordAlert.classList.replace("d-block", "d-none")
        } else {
            userRePassword.classList.replace("is-valid", "is-invalid")
            userRepasswordAlert.classList.replace("d-none", "d-block")
        }
    }

    if(userNameValid() && userEmailValid() && userPhoneValid() && userAgeValid() && userPasswordValid() && userRePasswordValid()){
        document.getElementById("submitBtn").removeAttribute("disabled")
    }else{
        document.getElementById("submitBtn").setAttribute("disabled","true")
    }

}

function userNameValid() {
    return /^[a-zA-Z ]+$/.test(userName.value)
}

function userEmailValid() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.value)
}

function userPhoneValid() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value)
}

function userAgeValid() {
    return /^[1-9][0-9]?$|^100$/.test(userAge.value)
}

function userPasswordValid() {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value)
}

function userRePasswordValid() {
    return userPassword.value == userRePassword.value
}

// displayyy
$(".sidenav a").click(async (e) => {
    let listBy = e.target.getAttribute("data-list")

    document.getElementById("search-container").innerHTML = ""
    row.innerHTML = ""
    $("html, body").animate({
        scrollTop: 0
    }, 200)

    if (listBy == "search") {
        row.innerHTML = ""
        document.getElementById("search-container").innerHTML = ` 
        <div class= "container  ms-5 ">
        <div class="row">
				<div class="col-md-5 "><input id="searchInput" class="form-control mb-2 ps-5 " placeholder="Search By Name">
				</div>
				<div class="col-md-5">
					<input class="form-control " type="text" maxlength="1" id="letter"
						placeholder="search By First Letter...">
				</div>

			</div>
            </div>`

        $("#searchInput").keyup((e) => {
            search(e.target.value)
        })
        $("#letter").keyup((e) => {
            getByLetter(e.target.value)
        })

        $('#letter').on("input", function () {
            if (this.value.length > 1)
                this.value = this.value.slice(0, 1);
        });
    }


    let click_event = new CustomEvent('click');
    document.querySelector('.menu-btn').dispatchEvent(click_event);

    let y;

    if (listBy == "categories") {
        $(".loading-container").fadeIn(100)

        y = await categories(listBy + ".php")
        x = y.categories.splice(0, 20);
        displayCategories()
        $(".loading-container").fadeOut(500)
    } else if (listBy == "area") {
        $(".loading-container").fadeIn(100)

        y = await categories("list.php?a=list")
        x = y.meals.splice(0, 20);
        displayArea()
        $(".loading-container").fadeOut(500)
    } else if (listBy == "ingredients") {
        $(".loading-container").fadeIn(100)

        y = await categories("list.php?i=list")
        x = y.meals.splice(0, 20);
        displayIngredients()
        $(".loading-container").fadeOut(500)
    } else if (listBy == "contact") {

        row.innerHTML = `
        <section id="contact" class="container myM w-75 mx-auto mb-5 ">
		<div class="p-2">
			<h2 class="text-light mb-5">ContacUs...</h2>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<input class="form-control shadow " onkeyup="validation()" id="name"
							placeholder="Enter Your Name">
						<div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
							Special Characters and Numbers not allowed
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="email" placeholder="Enter Email">
						<div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
							Enter valid email. *Ex: xxx@yyy.zzz
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="phone" placeholder="Enter phone">
						<div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
							Enter valid Phone Number
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="age" placeholder="Enter Age">
						<div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
							Enter valid Age
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="password"
							placeholder="Enter Password">
						<div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
							Enter valid password *Minimum eight characters, at least one letter and one number:*
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="rePassword"
							placeholder="Enter RePassword">
						<div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
							Enter valid Repassword
						</div>
					</div>
				</div>


			</div>

			<button type="submit" disabled id="submitBtn" class="btn m-5 btn-outline-danger">Submit</button>
		</div>

	</section>`
        userName = document.getElementById("name"),
            userEmail = document.getElementById("email"),
            userPhone = document.getElementById("phone"),
            userAge = document.getElementById("age"),
            userPassword = document.getElementById("password"),
            userRePassword = document.getElementById("rePassword"),
            userNameAlert = document.getElementById("namealert"),
            userEmailAlert = document.getElementById("emailalert"),
            userPhoneAlert = document.getElementById("phonealert"),
            userAgeAlert = document.getElementById("agealert"),
            userpasswordAlert = document.getElementById("passwordalert"),
            userRepasswordAlert = document.getElementById("repasswordalert");

        userName.addEventListener("focus", () => {
            urname = true
        })
        userEmail.addEventListener("focus", () => {
            email = true
        })
        userPhone.addEventListener("focus", () => {
            phone = true
        })
        userAge.addEventListener("focus", () => {
            age = true
        })
        userPassword.addEventListener("focus", () => {
            password = true
        })
        userRePassword.addEventListener("focus", () => {
            repassword = true
        })
    }

})

