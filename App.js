// citation:  https://github.com/facebook/react-native


import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import MapView from 'react-native-maps';




class App extends React.Component {
    render() {
        return (
            <MapView
                style={{ flex: 1 }}

                initialRegion={{
                    latitude: 42.3601,
                    longitude: -71.0589,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421}}
            />

        );
    }
}



export default App;
