// citation:  https://github.com/facebook/react-native
//            https://github.com/react-native-community/react-native-maps
//           https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest#27454960-ea1c-4b91-a0b6-0468bb4e6712

import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import MapView from 'react-native-maps';


class World_Summary extends React.Component {

    constructor(){
        super();
        this.state = {
            "NewConfirmed": '',
            "TotalConfirmed": '',
            "NewDeaths": '',
            "TotalDeaths": '',
            "NewRecovered": '',
            "TotalRecovered": ''
        }
    }

    componentDidMount() {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

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


    render() {
        return (

            <View style = {styles.container}>
                <Text style = {styles.text}>
                    <Text style = {styles.textBold}>World Covid19 Data{"\n"}</Text>
                    TotalConfirmed: {this.state.TotalConfirmed}{"\n"}
                    NewConfirmed: {this.state.NewConfirmed}{"\n"}
                    TotalRecovered: {this.state.TotalRecovered}{"\n"}
                    NewRecovered: {this.state.NewRecovered}{"\n"}
                    TotalDeaths: {this.state.TotalDeaths}{"\n"}
                    NewDeaths: {this.state.NewDeaths}{"\n"}
                </Text>
            </View>

        );
    }

}



class App extends React.Component {

    render() {
        return (
            <View >
                <World_Summary/>
            </View>

    );
    }
}

const styles = StyleSheet.create ({
    container: {
        //alignItems: 'center',
        marginTop: 50,
        padding: 20
    },
    text: {
        marginTop: 50,
        color: '#3036bb',
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 20,
    }


})

export default App;
