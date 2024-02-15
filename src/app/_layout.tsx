import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, useColorScheme } from 'react-native';
import { RoutineStoreProvider } from '../store/index';
import { Text } from '../components/Themed';
import Toast from 'react-native-toast-message';
import Colors from '../constants/Colors';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ThemeProvider value={DarkTheme}>
            <RoutineStoreProvider>
                <Stack
                    screenOptions={(props) => {
                        return {
                            headerBackTitle: 'Back',
                            headerRight: () => (
                                <Pressable
                                    onPress={() => {
                                        props.navigation.navigate(
                                            'routine/routines'
                                        );
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: Colors.dark.grayCool[200],
                                        }}
                                    >
                                        Routines
                                    </Text>
                                </Pressable>
                            ),
                        };
                    }}
                >
                    <Stack.Screen
                        name='(tabs)'
                        options={{
                            headerShown: false,
                        }}
                    />
                    {/* <Stack.Screen name='modal' options={{ presentation: 'modal' }} /> */}
                    <Stack.Screen name='routine/[routine_id]' />

                    <Stack.Screen
                        name='routine/createRoutine'
                        options={{ title: 'Create Routine' }}
                    />

                    <Stack.Screen
                        name='routine/routines'
                        options={{
                            title: 'Routines',
                            // presentation: 'modal',
                            headerRight: undefined,
                        }}
                    />
                    <Stack.Screen
                        name='session/[training_day_id]'
                        options={{
                            title: 'Session',
                            gestureEnabled: false,
                            headerLeft: () => <></>,
                        }}
                    />
                </Stack>
            </RoutineStoreProvider>
            <Toast />
        </ThemeProvider>
    );
}
