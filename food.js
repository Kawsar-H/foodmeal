const buttonFind = document.getElementById('button-find');
const foodList = document.getElementById('food');
const foodDetails = document.querySelector('.details');
console.log(foodDetails);

buttonFind.addEventListener('click' , foodEventList);
foodList.addEventListener('click', foodDetailsList);


function foodEventList(){
    let serachText = document.getElementById('searchc-food').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${serachText}`)
    .then(res => res.json())
    .then(data => {
        let main = "";
        if(data.meals){
            data.meals.forEach(food => {
                main +=`
                <div class="food-item" data-id="${food.idMeal}">
                <div class="food-img">
                    <img src="${food.strMealThumb}" alt="">
                </div>
                <div class="food-name">
                    <h4>${food.strMeal}</h4>
                    <a href="#" class="details-button">Details</a>
                </div>
            </div>
            
            `;
                
            });
        }
        else{
            main = "Cannot Anything find So sorry"
        }
        foodList.innerHTML = main; 
    });
}

function foodDetailsList(element){
    element.preventDefault();
    if(element.target.classList.contains('details-button')){
        let fooditem = element.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${fooditem.dataset.id}`)
        .then(res => res.json())
        .then(data => foodData(data.meals));
    }
}

function foodData(food){
    console.log(food);
    food = food[0];
    let main =`
   
                      <div class="food-details-img ">
                        <img src="${food.strMealThumb}" alt="">

                    </div>
                    <h2 class="foods-titles">${food.strMeal}</h2>
                    <div class="ingredents">
                        <h4>Ingredients</h4>
                        <p>${food.strInstructions}</p>
                        
                    </div>
    
    `;
    foodDetails.innerHTML = main;
    foodDetails.parentElement.classList.add('showDetails');
}



