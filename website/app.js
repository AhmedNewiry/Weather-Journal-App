/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
// Personal API Key for OpenWeatherMap API
const apiKey="7f4459ffd0b69aa5be89cb34bae6157c&units=imperial";
//selecting the "Generate" button using DOM
const button=document.getElementById("generate");

//  creating asynchronous  "GET "function to get the data from OpenWeatherMap API
const getApiTemp = async ()=>{
    const zipCodeValue=document.getElementById("zip").value;
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?zip=${zipCodeValue},us&appid=${apiKey}`;
    const response= await fetch(apiUrl);
    try{
        // truning the obtained data into javascript object
        const newData= await response.json();
        const apiTemp=newData.main.temp 
        //returning the temperature  
        return apiTemp;
         //  handling the error
    }catch(error){
        console.log(error);
    }

    };
    

//creating asynchronous "POST" function to send the data to our local server app endpoint
const postProjectData=async(url="",data={})=>{
const projectData= await fetch(url,{
    method:"POST",
    credentials:"same-origin",
    headers:{
        "content-type":"application/json"
    },
    body:JSON.stringify(data)    
})
}

//  creating asynchronous  "GET "function to fetch the data from our local server app endpoint
const getProjectData=async()=>{

const projectData= await fetch("/getprojectdata");
try{
    // truning the obtained data into javascript object
    const getData=await projectData.json();
    //udating the HTML elements innerHTML properties dynamically according to data returned by the app GET route.
    document.getElementById("date").innerHTML =`Date: ${getData.date}`;
    document.getElementById("temp").innerHTML =`Temperature: ${Math.round(getData.temp)} degrees` ;
    document.getElementById("content").innerHTML = `Feeling: ${getData.feelings}`;
    
  //  handling the error  
}catch(err){
    console.log(err) 
}
}


// creating "updateUi" function that will execute all async functions and update the UI for a Weather-Journal App
const updateUi= ()=>{
    //assigning the value of the textarea that the user will enter to a variable
    const sensation=document.getElementById("feelings").value;
    //chaining all async functions using .then()
    getApiTemp().then(apiTemp=>{
        postProjectData("/postprojectdata",{
        date:newDate,
        feelings:sensation,
        temp:apiTemp
    })
    }).then(
        getProjectData
    )
}

// Adding "click" event listener to "Generate" button to execute "updateUi" function.
button.addEventListener("click",updateUi);