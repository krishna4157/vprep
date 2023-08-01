/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { DarkTheme, DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native';
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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import CustomRadioButton from './CustomRadioButton';
import React, { useRef, useEffect, useCallback, useState } from 'react';
// import data1 from '../../data';
import { Time } from './CustomTimer';
import admob, { InterstitialAd, RewardedAdEventType, AdEventType, TestIds, RewardedAd, BannerAd, BannerAdSize } from '@react-native-firebase/admob';
import { TestListPage } from './TestListPage';
import _ from 'lodash';
import FinalScoreScreen from './FinalScoreScreen';
import { IntroductionPage } from './IntroductionPage';
import { HomeScreen } from './HomeScreen';
import Images from '../assets/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { AnswerScreen } from './AnswerScreen';
import Context from '../../Context';

// import AdsPage from './AdsPage';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';



const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [pageValue, setPageValue] = React.useState("");
  const [theme, setTheme] = React.useState("light");
  const [serverData, setServerData] = React.useState("");
  const [adsData, setAdsData] = React.useState("");
  const allData = React.useRef([]);
  var categoryArr = ['9','17','18','19','21','22','24','27'];

  
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();




  useEffect(()=> {
    getData();
    getAdsData();
  },[])


  const pushNumberAtRandomIndex = (arr, num) => {
    const randomIndex = Math.floor(Math.random() * (arr.length -1));
    arr.splice(randomIndex,0,num);
    return arr;
  }

  const shuffleArray = (a) => {
    for(let i = a.length -1 ; i > 0 ; i--){
      const j = Math.floor(Math.random() * (i+1));
      [a[i], a[j]] = [a[j],a[i]];
    }
    return a;
  }

  const changeToExp = (v) => {

    let Options = shuffleArray(pushNumberAtRandomIndex(v.incorrect_answers,v.correct_answer));

    let temp = {
      mapValue : {
        fields : {
          A : {
            stringValue: Options.indexOf(v.correct_answer)
          },
          Opt : {
            arrayValue : {
              values : Options.map((v, i) =>{
                  return {
                    stringValue : v
                  }
              })
                        
            }
          },
          Q : {
            stringValue: v.question

          }
        }
      }
    };
    
    return temp;
  }

  const fetchDataFromOnline = async (d) => {
    const randomNumber = Math.floor(Math.random() * (categoryArr.length -1));
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${categoryArr[randomNumber]}&difficulty=easy&type=multiple`);
    categoryArr.splice(randomNumber,1);
    const data = await response.json();
    const responseData = data.results;
    console.log("DDD : ",d);

    if(responseData.length > 0){
    var changedData = responseData.map((v,i) => {
      return changeToExp(v);
    }) 
    var obj = { };
    obj[`test${Object.keys(d).length+1}`] = {
      'arrayValue' : {
        'values' : changedData
      },
      'stringValue' : responseData[0]?.category
    };
    const tempObj = {
      ...d,
      ...obj
    }
    console.log("SERVER DATA 2 : ",tempObj);
    allData.current = tempObj;  

  }
    // const stringifiedData  =JSON.stringify(tempObj);

  return allData.current;
    // setServerData(stringifiedData);
    // const parsedData = JSON.parse(serverData);
    // console.log("VVV : ",parsedData);
     
//     test1
// : 
// arrayValue
// : 
// values
    
    // ('https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple').then((v) => {
    //   console.log("VVV : ",v);
    // }).catch((e) => {
    //   console.log("ERROR : ",e);
    // });
  }

  const cutSides = (s) =>  { return s.substring(1, s.length - 1); }

  const getData = async () => {
      categoryArr = ['9','17','18','19','21','22','24','27'];
    // alert("HI")
    try {
      const value = await AsyncStorage.getItem('appOpened');
      fetch("https://firestore.googleapis.com/v1/projects/prep-f87be/databases/(default)/documents/data?key=AIzaSyDsCtB9PiFTtkJiDRmFEakbKvoohPRAGJUdn9tAIzaSyCw3TkVdC93uXqVfkL-VAQeNiqzsW6NKPw").then(r => r.json())

      // fetch("https://prep-f87be.web.app/data.json").then(r => r.json())
      .then(async (e) => {
        // alert(JSON.stringify(e));
        // console.log("HHHH1234 : ",e.documents[0].fields);
// fr.onload(e) => {
//   console.log("hell9 : ",JSON.parse(e.target.result))
// };


        // setServerData(e);
        // console.log("HEHE : ", JSON.parse(e));
        const stringifiedData  =JSON.stringify(e.documents[0].fields);
        console.log("ACT : ",e.documents[0].fields);
      allData.current = e.documents[0].fields;
        for(let i = 0; i< 8 ; i++){
            // setTimeout(()=>{
              console.log("AD : ",allData.current);
              allData.current = await fetchDataFromOnline(allData.current);
            // },5000);

        }
        console.log("FAD : ",allData.current);

        // alert(allData.current)
        setServerData(JSON.stringify(allData.current));
      // alert(JSON.stringify(e));
      }).catch(e => {
        console.log("ERRPR1 : ",e);
      })
      // setPageLoaded(true);
      if(value !== null) {
        setPageValue("MainScreen")
        // return "MainScreen";
        // value previously stored
      } else {
        setPageValue("IntroPage")
        // return 
      }
    } catch(e) {
      console.log("check error : ",e );
      setPageValue("IntroPage")
      // error reading value
    }
  }


  const getAdsData = async () => {
    // alert("HI")
    try {
      fetch("https://firestore.googleapis.com/v1/projects/prep-f87be/databases/(default)/documents/data/getAds?key=AIzaSyDsCtB9PiFTtkJiDRmFEakbKvoohPRAGJUdn9tAIzaSyCw3TkVdC93uXqVfkL-VAQeNiqzsW6NKPw").then(r => r.json())

      // fetch("https://prep-f87be.web.app/data.json").then(r => r.json())
      .then((e) => {
        // alert(JSON.stringify(e));
        console.log("56 : ",e.fields);
// fr.onload(e) => {
//   console.log("hell9 : ",JSON.parse(e.target.result))
// };


        // setServerData(e);
        // console.log("HEHE : ", JSON.parse(e));
        const stringifiedData  =JSON.stringify(e.fields);
        setAdsData(stringifiedData);
      // alert(JSON.stringify(e));
      }).catch(e => {
        console.log("ERRPR : ",e);
      })
      // setPageLoaded(true);
      
    } catch(e) {
      console.log("check error : ",e );
      setPageValue("IntroPage")
      // error reading value
    }
  }

  const MyLightTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: 'green',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };

  const MyDarkTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: 'black',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };

  const darkTheme = {
    ...DefaultTheme,
    roundness: 2,
    version: 3,
    colors: {
      ...DefaultTheme.colors,
      background : 'black',
      textColor : 'white',
      primary: '#3498db',
      secondary: '#f1c40f',
      tertiary: '#2C3333'
    },
    animation: {
      scale: 3.0,
    },
  };

  const whiteTheme = {
    ...DefaultTheme,
    roundness: 2,
    version: 3,
    colors: {
      ...DefaultTheme.colors,
      background : 'white',
      textColor : 'black',
      primary: '#3498db',
      secondary: '#f1c40f',
      tertiary: '#F1F1F1'
    },
    animation: {
      scale: 3.0,
    },
  };

  const changeTheme = () => {
    if(theme == "light"){
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <>
    {pageValue != "" && adsData ? <Provider theme={theme == "dark" ? darkTheme : whiteTheme}>
      <StatusBar barStyle={theme ? 'light-content' : 'dark-content'} />
       <Context.Provider value={{
          appTheme: theme,
          data : serverData,
        adsData : adsData,
          setAppTheme : () => {
            
              if(theme == "light"){
                setTheme("dark");
              } else {
                setTheme("light");
              }
            
          },
          getData : getData        
       }}>
      {serverData != "" && adsData != "" ? <NavigationContainer>
        <Stack.Navigator initialRouteName={pageValue} >
          
            <Stack.Screen options={{ title: 'Test', headerShown:false , headerStyle: {
                backgroundColor : theme != "light" ? "black" : "white"
              }}}
            name="IntroPage" component={IntroductionPage} />
          
          <Stack.Screen
            name="MainScreen" options={{
              headerBackVisible : false,
              headerStyle: {
                backgroundColor : theme != "light" ? "black" : "white"
              },
              headerTitle: (props) =>
                <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', backgroundColor : theme != "light" ? "black" : "white" }}>
                  <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 40, height: 40 }} source={Images.appIcon} />
                    <Text style={{ marginLeft: 5,marginTop: 5, fontSize: 20, color: theme == "light" ? "black" : "white",fontFamily:'EduVICWANTBeginner-Bold' ,textAlign:'center'}} {...props} >Hi VPREP USER, :)</Text>
                  </View>
                  <View style={{ flex:1,margin:5,padding:5 }}>
                    <TouchableOpacity onPress={changeTheme} style={{backgroundColor: theme == "dark" ? "black" : "white",margin:5,marginRight:20,borderColor:theme == "light" ? "black" :  "grey",borderWidth:0,borderRadius:10, justifyContent:'center',flexDirection:"row"}}>
                    <LottieView style={{ width: 40, height: theme == "dark" ?40 : 60, justifyContent:'center',alignSelf:'center' }} resizeMode='cover' source={theme == "dark" ? Images.moon : Images.sun} autoPlay loop={true} />
                      {/* <Text style={{padding:10,alignSelf:'center', color: theme != "dark" ? "black" : "white", textTransform : "uppercase"}}>{theme}</Text> */}
                    </TouchableOpacity>
                  </View>
                </View>
            }} component={TestListPage} />
          <Stack.Screen options={{ title: 'Quiz Test',    headerTintColor: theme == "light" ? "black" : "white"
,headerTitleStyle: {
            color : theme == "light" ? "black" : "white",
          }, headerStyle: {
                backgroundColor : theme != "light" ? "black" : "white",
              }}}
            name="Home" component={HomeScreen} />
          <Stack.Screen
            name="FinalScoreScreen" options={{ headerShown: false }} component={FinalScoreScreen} />
        <Stack.Screen
            name="AnswerScreen" options={{
              headerBackVisible : false,
              headerStyle: {
                backgroundColor : theme != "light" ? "black" : "white"
              },
              headerTitle: (props) =>
                <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', backgroundColor : theme != "light" ? "black" : "white" }}>
                  <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 40, height: 40 }} source={Images.appIcon} />
                    <Text style={{ marginLeft: 5,marginTop: 5, fontSize: 20, color: theme == "light" ? "black" : "white",fontFamily:'EduVICWANTBeginner-Bold' ,textAlign:'center'}} {...props} >Quiz Answers</Text>
                  </View>
                  <View style={{ flex:1,margin:5,padding:5 }}>
                    <TouchableOpacity onPress={changeTheme} style={{backgroundColor: theme == "dark" ? "black" : "white",margin:5,marginRight:20,borderColor:theme == "light" ? "black" :  "grey",borderWidth:0,borderRadius:10, justifyContent:'center',flexDirection:"row"}}>
                    <LottieView style={{ width: 40, height: theme == "dark" ?40 : 60, justifyContent:'center',alignSelf:'center' }} resizeMode='cover' source={theme == "dark" ? Images.moon : Images.sun} autoPlay loop={true} />
                      {/* <Text style={{padding:10,alignSelf:'center', color: theme != "dark" ? "black" : "white", textTransform : "uppercase"}}>{theme}</Text> */}
                    </TouchableOpacity>
                  </View>
                </View>
            }} component={AnswerScreen} />
        </Stack.Navigator>

      </NavigationContainer> : 
      <View style={{flex:1,                 backgroundColor : theme != "light" ? "white" : "black"      ,zIndex:10, position:'absolute',height:'100%',width:'100%',justifyContent:'center'}}>
      {/* <ActivityIndicator size={"large"} /> */}
      <LottieView style={{ width: 80, height: 80, justifyContent:'center',alignSelf:'center' }} resizeMode='cover' source={Images.loading} autoPlay loop={true} />
      <Text style={{fontSize:25,color : theme != "light" ? "white" : "black"
,fontWeight:'bold',textAlign:'center'}}>Loading...</Text>
      </View>
      }
      </Context.Provider>
    </Provider> :  <View style={{flex:1,                 backgroundColor : theme != "light" ? "black" : "white"      ,zIndex:10, position:'absolute',height:'100%',width:'100%',justifyContent:'center'}}>
      {/* <ActivityIndicator size={"large"} /> */}
      <LottieView style={{ width: 80, height: 80, justifyContent:'center',alignSelf:'center' }} resizeMode='cover' source={Images.loading} autoPlay loop={true} />
      <Text style={{fontSize:25,color : theme != "light" ? "white" : "black"
,fontWeight:'bold',textAlign:'center'}}>Loading...</Text>
      </View>}
    </>
  );
};



export default App;
