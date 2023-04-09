import React from 'react';
import { ImageBackground} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const LoaderComponent = ({ isLoading }) => {
    if (isLoading) {
        return <ImageBackground source={require('./../../assets/background4.png')} style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
            <ActivityIndicator animating={isLoading} color={'red'} />
        </ImageBackground>
    }
}

export default LoaderComponent;