function myFunction()
{
    //Form Submission and values are stored inJavascript variables.
    document.getElementById("myForm").addEventListener("click", function(event){
    //To prevent reloading
    event.preventDefault()
});
    searchText=document.getElementById("search").value
    console.log(searchText)
    // Fetch API Called
      fetch('https://restcountries.eu/rest/v2/name/'+searchText)
      .then((res) => res.json())
      .then((data) => {
          // Response stored in countries
          countries=data;
          console.log(data)

          totalCountries=data.length
          output='';
          // Stored the data returned by API in session storage
          sessionStorage.setItem('data', JSON.stringify(data));
          sessionStorage.setItem('lastSearch', JSON.stringify(searchText));
          
          // For each country display result
          for(var i=0;i<totalCountries;i++)
          {
              console.log(countries[i].region)
               output+=`
                <div class="row">
                    <div class="column">
                        <a href="#" onclick=showDetails('${i}')>
                        <div class="card">
                        <div class="container">
                            <img src="${countries[i].flag}" alt="Avatar" style="width:50%">
                            <h4><b>Country: ${countries[i].name}</b></h4> 
                            <p>Capital: ${countries[i].capital}</p>    
                        </div>
                        </div>
                        </a>
                    </div>
                    <div class="column">
 
                        <div class="container">
                            <h4 align="center"><b>Major details</b></h4> 
                            <p align="left">Native Name: ${countries[i].nativeName}</p>
                            <p align="left">Population: ${countries[i].population}</p>
                            <p align="left">Region: ${countries[i].region}</p>
                            <i align="left">Please click on Card for further details.</p>
                        </div>

                    </div>
                </div>

                <br>`;
              console.log(countries[i].flag)
          }
          // Output data to html
          document.getElementById("countryDetails").innerHTML=output;
      })   
    console.log("Ending!!!")
}

// To go in details page
function showDetails(index){
    sessionStorage.setItem('index', JSON.stringify(index));
    window.location = 'details.html';
    return false;
}

function hideDetails()
{
    return false;
}

// When go back functionality executed
function goBack(){

    let flag = JSON.parse(sessionStorage.getItem('goBack'));
    let data = JSON.parse(sessionStorage.getItem('data'));
    countries=data;
          console.log(data)
          totalCountries=data.length
          output='';
          output+=`<h3>Last Searched Query</h3><br>`;
          console.log("Total Countries"+totalCountries)
          sessionStorage.setItem('data', JSON.stringify(data));
          // For each country take latest data from session storage and display, instead of again making API Call.
          for(var i=0;i<totalCountries;i++)
          {
              console.log(countries[i].region)
               output+=`
                <div class="row">
                    <div class="column">
                        <a href="#" onclick=showDetails('${i}')>
                        <div class="card">
                        <div class="container">
                            <img src="${countries[i].flag}" alt="Avatar" style="width:50%">
                            <h4><b>Country: ${countries[i].name}</b></h4> 
                            <p>Capital: ${countries[i].capital}</p>    
                        </div>
                        </div>
                        </a>
                    </div>
                    <div class="column">
 
                        <div class="container">
                            <h4 align="center"><b>Major details</b></h4> 
                            <p align="left">Native Name: ${countries[i].nativeName}</p>
                            <p align="left">Population: ${countries[i].population}</p>
                            <p align="left">Region: ${countries[i].region}</p>
                            <i align="left">Please click on Card for further details.</p>
                        </div>

                    </div>
                </div>

                <br>`;
              console.log(countries[i].flag)
          }
        // Display to page
        document.getElementById("countryDetails").innerHTML=output;
}

function getDetails()
{
        //window.location = 'details.html';
        let country = JSON.parse(sessionStorage.getItem('data'));
        //Grabbing data from session storage for the clicked element
        let index= sessionStorage.getItem('index');
        console.log(typeof(index))
        ind='';

        // For each detail in the clicked country, loop through and display on the details.html page
        for(var i =0;i<index.length;i++)
        {
            if(index[i]!='"')
                ind+=index[i]
        }
        console.log(country)
        console.log(country[ind].name)
        output='';
        output+=`
        <div class="row">
            <div class="column">
                
                <div class="card">
                <div class="container">
                    <img src="${country[ind].flag}" alt="Avatar" style="width:50%">
                    <h4><b>Country: ${country[ind].name}</b></h4> 
                    <p>Capital: ${country[ind].capital}</p>    
                </div>
                </div>
                
            </div>
            <div class="column">

                <div class="container">
                    <h4 align="center"><b>All details</b></h4> 
                    <p align="left">Native Name: ${country[ind].nativeName}</p>
                    <p align="left">Population: ${country[ind].population}</p>
                    <p align="left">Region: ${country[ind].region}</p>
                    <p align="left">Subregion: ${country[ind].subregion}</p>
                    <p align="left">Cioc: ${country[ind].cioc}</p>
                    <p align="left">Gini Index: ${country[ind].alpha2Code}</p>
                    <p align="left">Alpha2 Code: ${country[ind].alpha3Code}</p>
                    <p align="left">Area Code: ${country[ind].area}</p>
                    <p align="left">Numeric Code: ${country[ind].numericCode}</p>
                    <br>
                    <a href="javascript:history.back()" onclick=hideDetails()><i align="left">Please click on Card for further details.</i></a>
                </div>

            </div>
        </div>

        <br>`;

        document.getElementById("countryDetails").innerHTML=output;
}
