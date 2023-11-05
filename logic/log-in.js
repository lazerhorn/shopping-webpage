const registered = JSON.parse(localStorage.getItem("dataPeople")) || []
const email = document.getElementById("email");
const form = document.getElementById("form")
const password = document.getElementById("password")
const allInputs = document.querySelectorAll("input");

let pass = false;

email.addEventListener("blur", (e) => {
    if (email.value == ""){
        document.getElementById("email-text").innerText = ""
        pass = false;

    }else{
        
        const object = registered.find((e) => e.email == email.value)
        if (object === undefined){
            document.getElementById("email-text").innerText = "Email is not registered"
            pass = false;
        }
        else {
            pass = true
            document.getElementById("email-text").innerText = ""
            
        }
    }

})
form.addEventListener("submit", (e)=> {
    
    

    if (pass){
        const object = registered.find((e) => e.email == email.value)
        if (object.password == password.value){
                console.log("hi")
                setTimeout(()=>window.location.href ="menu.html",2000) 
                document.querySelectorAll("p[id]").forEach((p) => {
                    p.innerText = "";
                  });
   
        }
        else{
            console.log("wrong")
            document.getElementById("submit-text").innerText = "Incorrect Password"
        }

    }
    else {
        document.getElementById("submit-text").innerText = "Email is not valid"

    }
    
    
    
})

form.addEventListener("blur",()=> {

  allInputs.forEach((i) => {
    if (i.value == ""){
        document.querySelectorAll("p[id]").forEach((p) => {
            p.innerText = "";
        })
    }
  })
})