const listPeople = JSON.parse(localStorage.getItem("dataPeople")) || []
const form = document.getElementById("form")
const email = document.getElementById("email")
let check = false
let gender1 = "boy"

function select(gender, id){
   gender.style.borderColor = "white";
   document.getElementById(id).style.borderColor = "rgba(166, 163, 163, 0.459)";
   gender1 = `${gender.id}`
  
}
form.addEventListener("submit",(e)=> {
 
  
    let data = {}
    if (check){
        document.getElementById("email-valid").innerText = "Invalid details"
        
    }
    else {

        let objectPerson = new FormData(form);
        console.log(objectPerson)
        console.log(objectPerson.entries)
        for (let [key,value] of objectPerson.entries()){
            data[key] = value;
        }
        data["gender"] = gender1;
        listPeople.push(data);
        console.log(listPeople);
        localStorage.setItem("dataPeople", JSON.stringify(listPeople))
        setTimeout(()=>   window.location.href = "log-in.html" ,3000)
     
        document.getElementById("email-valid").innerText = ""

      
    }
    
})


email.addEventListener("input", (e)=> {
    for (let i = 0 ; i < listPeople.length; i++){
        if (listPeople[i].email == email.value){
            document.getElementById("email-verify").innerText = "Email is already Registered"
            check = true
            break
        }
        else{
            document.getElementById("email-verify").innerText = ""
            check = false
        }
    }
})