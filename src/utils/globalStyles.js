
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Animated,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';

export const globalStyles =  {

    backgroundColor : useColorScheme() === "dark"? "black" : "white",
    textColor : "white"

}