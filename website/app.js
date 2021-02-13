//Date Function
const DateFunction=()=> {
    let d = new Date();
    const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    const  newData= months[d.getMonth()]+'.'+ d.getDate()+'.'+ d.getFullYear();
    return newData
  }
  
  // Global Variables 
  const key = "c118caab6aa62a1b7cdd9ced75fc1513&units=imperial";
  const ZipCode=()=>{ const z=document.getElementById('zip').value;
  return z;
}

   
  
  // Event listener 
  document.getElementById('generate').addEventListener('click',(event)=>{
    event.preventDefault();
    dataFunction();
  });
    
//data in object
  const dataFunction=() =>{
    const data = {
         zipCode:ZipCode (),
         date: DateFunction(),
          content: feelingFunction()
         
      };
  
      // API Information 
      getAPI(data.zipCode).then(d => {
          data.temp = d.main.temp;
          data.humidity = d.main.humidity;
          data.description = d.weather[0].description;
          postFunction(data); 
          updatesUI();
      })
    
          
  };
 //feelings function
  const feelingFunction=()=> {
    const fellings = document.getElementById('feelings').value;
    return fellings
  }
  //git information
  const getAPI=async()=> {
    
      const url='https://api.openweathermap.org/data/2.5/weather?zip=';
      const re=await fetch(url+ZipCode()+"&appid="+key)
     try{ 
       return re.json()
      }
     catch(error) {
      console.log("error", error);
    }
  }
  
  
  // Post Data 
  const postFunction = async ( data)=>{
      const  response = await fetch(`/add`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),         
      });
    
      try {
        const newRes = await  response.json();
        return newRes;
      }catch(error) {
        console.log("error", error);
      }
    };
  //updatesUI
  const updatesUI=async() =>{
      let  response = await fetch(`/all`);
     
        response.json().then(data => {
             
             document.getElementById('date').innerHTML = `Date :${data.date}`;
             document.getElementById('temp').innerHTML = `Temperature: ${data.temp}`;
             document.getElementById('humidity').innerHTML = `Humidity : ${data.humidity}`;
             document.getElementById('description').innerHTML = ` weather : ${data.description}`;
             document.getElementById('content').innerHTML = `feeling ${data.content}`;
          })
     
        }
  
        
  
  
  
  
  