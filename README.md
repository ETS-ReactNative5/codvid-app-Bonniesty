# codvid-app-Bonniesty
 ## Install
 ```
 npm install
 cd ios
sudo gem install cocoapods
pod install
  ```

## Task (Scroll to the end to view Demo video)
 Step 1:  Setup your REACT Native Environment (Finished)

 Step 2:  Go through REACT native Tutorial (Finished)

Build Hello Applications, Run Hello applications on emulator and your phone.

- Result:
Screenshot of emulator and photo of app on my phone with broken screen. :(
![image](https://github.com/BUEC500C1/codvid-app-Bonniesty/blob/master/scheenshot/1.png ) ![image](https://github.com/BUEC500C1/codvid-app-Bonniesty/blob/master/scheenshot/2.png)

 Step 3:  Develop use case to display a map. (Finished) 
- Result:
Screenshot of map of Boston

![image](https://github.com/BUEC500C1/codvid-app-Bonniesty/blob/master/scheenshot/3.png)

 Step 4:  On separate branch, exercise the CODVID-19 API (Documentation using postman) and display the data in your application as text.  Be fancy!  Style your results.  (Finished) 
 - Result:
 Create a new Branch and test display data
 
 ![image](https://github.com/BUEC500C1/codvid-app-Bonniesty/blob/master/scheenshot/data1.png)
 
 Step 5:  Overlay the data on the maps.  (Finished) 
 
 - Approach:
  First I call summary API to get the summary of world cases number. Then I use API to get country list that has cases. 
 `codes for fetch data of country list`
  ```javascript
  let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        //GET Countries
        var arr = [];
        fetch("https://api.covid19api.com/countries", requestOptions)
            .then(response => response.json())
            .then(responseJson => {
                var i;
                for( i = 0; i < responseJson.length; i++){
                    arr.push(responseJson[i]['Slug']);
                }
                this.setState({
                    CountryList: arr
                });
            });
 ```
 
 After that, for each, I get LIVE data from live API and show the data on the map for this country.
 `codes for fetch each country data step by step`
 ```javascript
   async display_marker(){
        let countryList =this.state.CountryList;
        var markerArray  = [];
        var i = 0;
        for( i = 0; i< countryList.length; i++){
            //GET Live By Country All Status
            try {
                var url = "https://api.covid19api.com/live/country/" + countryList[i];
                let requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };
                //append marker for each country
                await fetch(url, requestOptions)
                    .then(response => response.json())
                    .then(responseJson => {
                        if(responseJson.length != 0) {
                            console.log(url);
                            markerArray.push(
                                //html codes
                            );
                        }

                    });
            }catch(error) {
                console.error(error);
            }
        }
        this.setState({
            MarkerList: markerArray
        });
 ```

API I used:
 ```
 https://api.covid19api.com/summary
 https://api.covid19api.com/countries
 https://api.covid19api.com/live/country/[country_name]
  ```
 - Result and Demo:  
 ![image](https://github.com/BUEC500C1/codvid-app-Bonniesty/blob/master/scheenshot/map-all.png)
 ![image](https://github.com/BUEC500C1/codvid-app-Bonniesty/blob/master/scheenshot/map-case.png)
 ## Demo
 ![Alt Text](https://github.com/BUEC500C1/codvid-app-Bonniesty/blob/master/scheenshot/demo.gif)
