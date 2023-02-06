const search=document.getElementById("search");
const submit=document.getElementById("submit");
const random=document.getElementById("random");
const mealEle=document.getElementById("meals");
const resultHeading=document.getElementsByClassName("result-heading");
const singleEle=document.getElementById("single-meal");

//search for meals
function searchMeal(e){
    e.preventDefault();

    singleEle.innerHTML="";
    //clear single meal
    //get search meal
    const term=search.value;
     //console.log(search.value);


//check for empty
if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    
    .then((res) => res.json())
    .then((data) => {
       // console.log(data);
        resultHeading.innerHTML=`<h2>Search Result for ${term}</h2>`;
        if(data.meals===null){
            resultHeading.innerHTML=`<h2>There is no result for ${term}</h2>`;
        }else{
            mealEle.innerHTML=data.meals.map((meal) =>`
            <div class="meal">
            <img src="${meal.strMealThumb}"alt=${meal.strMeal}>"
            <div class="meal-info" data-mealID="${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
            </div>
            </div>
            `
                )
                .join("");
        }

    }); 
    search.value="";
}else{
    alert("Please insert your favourite dish");
}
}
//Fetch meal by id
function getMealById(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    
    .then((data) =>{
        console.log(data);
       const meal=data.meals[0];
       addMealToDOM(meal);
    });
}
//random meal
function randomMeal(){
    mealEle.innerHTML="";
    resultHeading.innerHTML="";
    fetch(
        `https://www.themealdb.com/api/json/v1/1/random.php`
    ).then(res =>res.json()).then(data =>{
        const meal=data.meals[0];
        addMealToDOM(meal);
    })
}

//add meal to DOM
function addMealToDOM(meal){
const ingredients=[];
for(let i=0; i<=20; i++){
    if(meal[`strIngredient${i}`]){
        ingredients.push(`
       ${meal[`strIngredients${i}`]}- ${meal[`strMeasure${i}`]} `);
    }else{
        break;
    }
}
singleEle.innerHTML=`
<div class="single-meal">
<h1>${meal.strMeal}</h1>
<img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
<div class="single-info">
${meal.srrCategory ?`<p>${meal.srrCategory}</P>` :''}
${meal.strArea ? `<p>${meal.strArea}</p>`:''}
</div>
<div class="main">
<p>${meal.strInstructions}</p>
<h2> Ingredients</h2>
<ul>
${ingredients.map(ing => `<li>${ing}</li>`).join("")}
</ul>
</div>
</div>`
}



submit.addEventListener("submit",searchMeal);
random.addEventListener("click",randomMeal);
mealEle.addEventListener("click", (e) =>{
    console.log(e.path);
    const mealInfo = e.path.find((item) =>{
       // console.log(e.item);
        if(item.classList){
            return item.classList.contains("meal-info");
        }else{
            return false;
        }
    });
    if(mealInfo){
        const mealID=mealInfo.getAttribute("data-mealid");
        getMealById(mealID);
    }
});