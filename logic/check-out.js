let foodItems = JSON.parse(localStorage.getItem("foodData")) || []
const theGrid = document.getElementById("food-Grid")

const firstFour = ["Product", "Size", "Quantity", "Total Price"].map(e => `<div>${e}</div>`).join("");



function generateProducts(){
    if (foodItems.length ==0){
       return theGrid.innerHTML = firstFour + '<div class="noItem"><img src="pictures/picsvg_download.svg" alt=""><p>You don\'t have anything in the cart</p></div>'
        
    }
    else {
       return theGrid.innerHTML = firstFour + foodItems.map((foodwithId)=> {
        let {id, amount} = foodwithId;
        let {name,price,link} = food.find((e)=> e.id ==id);
        return `  <div class="items">
        <div class="things">
            <div class="div-img">
                <img src="${link}" alt="">
            </div>
            <div class="info">
                <p>${name}</p>
                <p>${price}</p>
            </div>
        </div>
         <div class="size">
            <select name="" >
                <option value="">Big Bowl</option>
                <option value="">Medium Bowl</option>
                <option value="">Small Bowl</option>
            </select>
        </div>
        <div class="quan">
            <div onclick="decrement('${id}')">
                <img src="pictures/2mMV0E01.svg" alt="">
            </div>
            <div>
                <p id="${id}">${amount}</p>
            </div>
            <div onclick="increment('${id}')">
                <img src="pictures/Ls6B0m01.svg" alt="" >
            </div>
        </div>
        <div class="total">
            <p id="${id + 'total'}">$${amount * price}</p></div>

        <div class="cancel" onclick="remove('${id}')"><img src="pictures/uNKkRg01 (1).svg" alt=""></div>
    </div>
    `
       }).join("")    
    }
}
createOption();
generateProducts();
updateCart();   
update("lala")
function increment(id){
    let foodObject = foodItems.find((e)=> e.id == id);
    foodObject.amount += 1;
    update(id);
    
}
function decrement(id){
    let foodObject = foodItems.find((e)=> e.id == id);
    foodObject.amount -= 1;
    if (foodObject.amount == 0){
        foodItems = foodItems.filter((e) => e.amount > 0)
        generateProducts(foodItems)
        update(id)

    }else {
        update(id)
    }
   

}

function update(id){
    let foodObject = foodItems.find((e)=> e.id == id)
    if (foodObject !== undefined){
        document.getElementById(`${id}`).innerText = foodObject.amount;
        document.getElementById(`${id + "total"}`).innerText = foodObject.amount * food.find((e)=> e.id == id).price;
    }
    localStorage.setItem("foodData", JSON.stringify(foodItems))
    updateCart();
    
    
}
function remove(id){
    let foodObject = foodItems.find((e)=> e.id == id);
    foodItems.splice(foodItems.indexOf(foodObject),1);
    updateCart();
    generateProducts();
    update();

}
function updateCart(){
    if (foodItems.length == 0) {
        document.getElementById("updateItems").innerText = "0"
        document.getElementById("sub-total").innerText =  "$0"  
        document.getElementById("total").innerText = document.getElementById("sub-total").innerText;

    }else{
        
        document.getElementById("sub-total").innerText =  "$" + foodItems.map((e)=> food.find((f)=> e.id == f.id).price * e.amount).reduce((acc, curr)=> acc + curr),0; 
        document.getElementById("total").innerText = document.getElementById("sub-total").innerText;
        document.getElementById("updateItems").innerText = foodItems.map((e)=> e.amount).reduce((acc,curr) => acc + curr),0;
    }
}
function createOption(){
    for (let i = 01 ; i <= 12 ; i ++){
        let childOption  = document.createElement('option')
        childOption.innerText = i
        childOption.setAttribute("value", i)
        document.getElementById("month").appendChild(childOption)
    }
    for (let g = 1960 ; g <= 2023 ; g ++){
        let childOption  = document.createElement('option')
        childOption.innerText = g
        childOption.setAttribute("value", g)
        document.getElementById("year").appendChild(childOption)
    }
}  
function turn(){
    document.getElementById("sidebar").classList.toggle("appear")
}
document.getElementById("form-thing").addEventListener("submit", ()=> {
    document.querySelector("input[type='hidden']").value =JSON.stringify(foodItems);
  });