import NavigationView from './navigation/NavigationView';
import { StatusBar, View } from 'react-native';
import { useFetchUserQuery } from './../redux/features/api';
import { Text } from 'react-native-paper';
import AnimatedLoader from "react-native-animated-loader";

export default function TMMain() {

    const { isLoading } = useFetchUserQuery();

    return (
        <>
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

        </>
    );
}