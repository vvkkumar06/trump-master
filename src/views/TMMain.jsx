import NavigationView from './navigation/NavigationView';
import { StatusBar, View, ImageBackground } from 'react-native';
import { useFetchUserQuery } from './../redux/features/api';
import { Text } from 'react-native-paper';
import AnimatedLoader from "react-native-animated-loader";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function TMMain() {
    const { isLoading } = useFetchUserQuery();

    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await new Promise(resolve => setTimeout(resolve, 20000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View onLayout={onLayoutRootView}>
            <ImageBackground source={require('./../../assets/background3.png')} resizeMode="cover" style={{ width: '100%', height: '100%' }} >
                {
                    isLoading ? <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                        <AnimatedLoader
                            visible={true}
                            overlayColor='transparent'
                            source={require("./../assets/loaders/app.json")}
                            animationStyle={{ width: 250, height: 250 }}
                            speed={1}
                        >
                            <Text variant="headlineSmall">Loading...</Text>
                        </AnimatedLoader>
                    </View> : (
                        <>
                            <StatusBar hidden />
                            <NavigationView />
                        </>
                    )

                }

            </ImageBackground>
        </View>
    );
}