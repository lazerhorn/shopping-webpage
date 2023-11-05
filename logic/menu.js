const grid = document.getElementById("grid")
let foodItems = JSON.parse(localStorage.getItem("foodData")) || []
let favouriteFood = JSON.parse(localStorage.getItem("likesFood")) || []
const search = document.getElementById("search")
const form = document.getElementById("form-input")
let thisElement;
let thatElement; 
function generateFood(foodThings){
    if (Array.isArray(foodThings)){
    grid.innerHTML = foodThings.map((fd)=> {

        let {id,name,price,link,desciption} = fd;
        let object = foodItems.find((e)=> e.id == fd.id )
    
        return `<div class="food-container">
        <div class="food-picture">
            <div class="hover-thing"> 
                <div class="favor" onclick =like('${id}') ><img src="pictures/picsvg_download (10).svg" class="first-child-fav" id='${id+'hello'}'>
                                <img src="pictures/wpIFuE01.svg" ></div>
                <div class="desc" onclick = words('${id}')><img src="pictures/1XNygM01 (1).svg" id='${id+'meow'}' class="first-child-desc">
                                <img src="pictures/picsvg_download (11).svg"></div>
                <div class="para para-left" id="${id+'para'}"><p>${desciption}</p></div>
            </div>  
            <img src='${link}' alt="" class="yummy">

        </div>
        <div class="food-info">
            <p>${name}</p>
            <p>$${price}0</p>
        </div>
        <div class="amount">
            <div>
                <img src="pictures/2mMV0E01.svg" alt="" onclick = decrement('${id}')>
            </div>
                <p id='${id}'>${object === undefined ? 0 : object.amount} </p>
            <div>
                <img src="pictures/Ls6B0m01.svg" alt="" onclick = increment('${id}')>
            </div>
                
        </div>
    </div>
    </div>`
    }).join("")
    ChangeColor();
}   else {
    
    return grid.innerHTML = `<div class="noItem"><img src="pictures/V8pWws01.svg"><p>There is not such item of '${foodThings}'
    </p><button onclick = "generateFood(food)">Go Back?</button>`
    
}
};

updateCart();
function increment(idOfFood){
    let foodObject = foodItems.find((food) => food.id == idOfFood)
    if (foodObject === undefined){
        foodItems.push({id: idOfFood, amount : 1 })
    
    }
    else {
        foodObject.amount += 1
    }
    console.log(foodItems)
    localStorage.setItem("foodData", JSON.stringify(foodItems))
    document.getElementById(`${idOfFood}`).innerText = foodItems.find((e)=> e.id == idOfFood).amount;
    updateCart();
}
function decrement(idOfFood){
    let foodObject = foodItems.find((food)=> food.id == idOfFood)
    if (foodObject === undefined) return;
    else {
        foodObject.amount -= 1;
    }
    foodItems = foodItems.filter((e)=> e.amount > 0 )
    localStorage.setItem("foodData", JSON.stringify(foodItems))
    document.getElementById(`${idOfFood}`).innerText = foodObject.amount;
    updateCart();
}


function updateCart(){
    if (foodItems.length == 0){
        document.getElementById("cart-amount").innerText = 0;
        
    
    }else{

        document.getElementById("cart-amount").innerText = foodItems.map((e)=> e.amount).reduce((acc, curr) => acc + curr),0;
    }
}
form.addEventListener("submit", (e)=> {
    e.preventDefault()
    let foodArray = food.filter((e)=> e.name == search.value)
    console.log(foodArray)
   
    if (foodArray.length == 0) {
        generateFood(search.value)
        search.value == ""
        console.log("string")
    }
    else {
   
        generateFood(foodArray)
        console.log("array")
    }
})
generateFood(food);

function change(object, otherObject1, otherObject2){
    let arrayThings = food.filter((e)=> e.type == object.id)
    if (object != thisElement) {
        object.style.cssText = 'border: 1px solid white'
        document.getElementById(`${otherObject1}`).style.border = "none"
        document.getElementById(`${otherObject2}`).style.border = "none"
        thisElement = object;
        generateFood(arrayThings)
        document.getElementById("historyyy").style.borderColor = "black"
        thatElement = ''
    }else {
        object.style.border = "none";
        generateFood(food)
        thisElement = ''
        document.getElementById("historyyy").style.borderColor = "black"

        thatElement = ''

    }

}
function like(id){
    document.getElementById(`${id+'hello'}`).classList.toggle("first-child-fav");
    if (document.getElementById(`${id+'hello'}`).classList.contains("first-child-fav")){
        let index = favouriteFood.findIndex((e)=> e.id == id)
        favouriteFood.splice(index,1)
        console.log(favouriteFood)
        localStorage.setItem("likesFood",JSON.stringify(favouriteFood))

    }else {
        let thisObject = food.find((e)=> e.id == id)
        favouriteFood.push(thisObject)
        console.log(favouriteFood)
        localStorage.setItem("likesFood",JSON.stringify(favouriteFood))



    }
}
function showhis(element){
    if (thatElement !== element.id){
        element.style.cssText = 'border: 1px solid white'
        generateFood(favouriteFood)
        const others = document.querySelectorAll(".icon")
        others.forEach((e)=> e.style.border = "none ")
        thatElement = element.id
        thisElement = ''
  
    }else {
        generateFood(food)
        element.style.borderColor = "black";
        thatElement = ""
        thisElement = ''
    }
}
function ChangeColor(){
    //first step is group all elements with the class of  first-child-fav
    let theImgElement = Array.from(document.querySelectorAll("img[class='first-child-fav']"))
    console.log(theImgElement)
    // let object (that contains all the elements with favaourites) = Allelements.filter((a) => favouriteFood.some((e) a.id == e.id )
    let theSelectedImgElement = theImgElement.filter((e)=> favouriteFood.some((f)=> e.id.includes(f.id)))
    // [] this.forEach((e) => e.removeAttribute("class" , first-child-fav))
    theSelectedImgElement.forEach((e)=> e.classList.toggle("first-child-fav"))
}
function words(id){
    document.getElementById(id+'meow').classList.toggle("first-child-desc")
    if (document.getElementById(id + "meow").classList.contains("first-child-desc")){
        document.getElementById(`${id + 'para'}`).classList.add("para-left");
    }
    else {
        document.getElementById(`${id + 'para'}`).classList.remove("para-left");

    }
}
function appear() {
    const nav = document.getElementById("nav")
    console.log(nav)
    nav.classList.toggle("appear")
}