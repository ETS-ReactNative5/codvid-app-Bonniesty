// citation:  https://github.com/facebook/react-native
//            https://github.com/react-native-community/react-native-maps
//           https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest#27454960-ea1c-4b91-a0b6-0468bb4e6712

import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import MapView , {Marker, Callout} from 'react-native-maps';



class App extends React.Component {
    constructor(){
        super();
        this.state = {
            "NewConfirmed": '',
            "TotalConfirmed": '',
            "NewDeaths": '',
            "TotalDeaths": '',
            "NewRecovered": '',
            "TotalRecovered": '',
            "CountryList" :[],
            "MarkerList":[]
        }
    }

    // get countries list that had cases
    fetch_country_list(){
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

                this.display_marker();

            });
    }

    //get world summary data
    fetch_world_summary(){
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        //GET Summary
        fetch("https://api.covid19api.com/summary", requestOptions)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    TotalConfirmed: responseJson['Global']['TotalConfirmed'],
                    TotalRecovered: responseJson['Global']['TotalRecovered'],
                    TotalDeaths: responseJson['Global']['TotalDeaths'],
                    NewConfirmed: responseJson['Global']['NewConfirmed'],
                    NewRecovered: responseJson['Global']['NewRecovered'],
                    NewDeaths: responseJson['Global']['NewDeaths']

                });
            });

    }

    //get each country data and create a related marker
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
                            var last = responseJson.length - 1;
                            console.log(url);
                            markerArray.push(
                                <Marker
                                    coordinate={{
                                        latitude: responseJson[last]["Lat"],
                                        longitude: responseJson[last]["Lon"]
                                    }}
                                >
                                    <Callout>
                                        <Text style={styles.markerTextBold}>{responseJson[last]["Country"]} Live
                                            Data</Text>
                                        <Text style={styles.markerText}>Time:<Text
                                            style={styles.markerNum}> {responseJson[last]["Date"]}</Text></Text>
                                        <Text style={styles.markerText}>Confirmed:<Text
                                            style={styles.markerNum}> {responseJson[last]["Confirmed"]}</Text></Text>
                                        <Text style={styles.markerText}>Recovered:<Text
                                            style={styles.markerNum}> {responseJson[last]["Recovered"]}</Text></Text>
                                        <Text style={styles.markerText}>Deaths:<Text
                                            style={styles.markerNum}> {responseJson[last]["Deaths"]}</Text></Text>
                                        <Text style={styles.markerText}>Active:<Text
                                            style={styles.markerNum}> {responseJson[last]["Active"]}</Text></Text>
                                    </Callout>
                                </Marker>
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

    }

    componentDidMount() {
        this.fetch_world_summary();
        this.fetch_country_list();
    }

    render() {

        const marker = this.state.MarkerList;
        return (
            <View >
                <MapView style = {styles.map} region={{

                    latitude: 37.0902,
                    longitude: -95.7129,
                    latitudeDelta: 35,
                    longitudeDelta: 35,

                }}>

                    <View style = {styles.container}>
                        <Text style = {styles.text}>
                            <Text style = {styles.textBold}>World Covid19 Data{"\n"}</Text>
                            TotalConfirmed:<Text style = {styles.textNum}> {this.state.TotalConfirmed}{"\n"}</Text>
                            NewConfirmed: <Text style = {styles.textNum}>{this.state.NewConfirmed}{"\n"}</Text>
                            TotalRecovered: <Text style = {styles.textNum}>{this.state.TotalRecovered}{"\n"}</Text>
                            NewRecovered: <Text style = {styles.textNum}>{this.state.NewRecovered}{"\n"}</Text>
                            TotalDeaths: <Text style = {styles.textNum}>{this.state.TotalDeaths}{"\n"}</Text>
                            NewDeaths: <Text style = {styles.textNum}>{this.state.NewDeaths}{"\n"}</Text>
                            Countries Number: <Text style = {styles.textNum}>{this.state.CountryList.length}</Text>
                        </Text>
                    </View>
                    {marker}
                </MapView>
            </View>

    );
    }
}

const styles = StyleSheet.create ({
    container: {
        //alignItems: 'center',
        marginTop: 50,
        padding: 20,
    },
    text: {
        fontWeight: "bold",
        marginTop: 70,
        color: '#0cbb48',
    },
    textBold: {
        fontWeight: "bold",
        fontSize:20,
        color: '#3036bb',

    },
    textNum: {
        fontWeight: "bold",
        color: '#bb251b',

    },
    map:{
        width: "100%",
        height: "100%"
    },
    markerTextBold:{
        fontWeight: "bold",
        color: '#3036bb',
    },
    markerText:{
        color: '#0cbb48',
    },
    markerNum:{
        color: '#bb251b',
    },

})

export default App;
