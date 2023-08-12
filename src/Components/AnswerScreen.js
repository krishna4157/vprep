// import {  RewardedAd, RewardedAdEventType, TestIds,BannerAd, BannerAdSize } from "@react-native-firebase/admob";
import { RewardedAd,InterstitialAd, GAMBannerAd, BannerAdSize, TestIds, AdEventType } from 'react-native-google-mobile-ads'; 

import { useNavigation } from "@react-navigation/native";
import React, {useRef, useEffect, useState, useContext} from "react";
import { ActivityIndicator } from "react-native";
import {View,Text, Animated, ScrollView} from "react-native";
// import data from "../../data";
import CustomRadioButton from "./CustomRadioButton";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import _ from "lodash";
import { Time } from './CustomTimer';
import { useTheme } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { Alert } from "react-native";
import { BackHandler } from "react-native";
import CustomRadioButtonForAnswers from "./CustomRadioButtonForAnswers";
import Context from "../../Context";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
  
export const AnswerScreen = (props) => {

  const context = useContext(Context);
  console.log("context :",context);

  const savedAns = props?.route?.params?.savedAns;

  const sd = JSON.parse(context?.data);
  console.log("STR : ",sd);
  // console.log("Data123 : ", JSON.parse("{"+context?.data+"}"));
    const data  = {
     data :  JSON.parse(context?.data)
      
    
    }

  
  const { colors } = useTheme();


  const getData = (no) => {
    const testIndex = "test"+no;
    // switch(no) {
      // case 1 :
        return data.data[testIndex]
      // case 2 :
        // return data.data["test2"]
      // default :
        // return data.data["test1"]
    // }
  }

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "you cant go back, if you want to quit press the bottom", [
        {
          text: "OK",
          onPress: () => null,
          style: "cancel"
        },
        // { text: "YES", onPress: () => {} }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  var s = [1, 2, 3, 4];
    const navigation = useNavigation();
    // console.log("data : ", data.data);
    const testIndex = props?.route?.params?.testIndex;
    
    var demoData = getData(testIndex)?.arrayValue?.values;
    console.log("DEMO DATA : ",demoData,testIndex);
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
    const [bannerAd, setBannerAd] = React.useState(false);
    const [adLoaded, setAdLoaded] = React.useState(false);
    let adOpened = false;
    const showRewardAd = () => {
      // Create a new instance 
     
    }
  
    const showInterstitialAd = () => {
      InterstitialAd.onAdEvent((type, error) => {
        if (type === AdEventType.LOADED) {
          InterstitialAd.show();
        }
      });
      // InterstitialAd.load();
    }
  
    useEffect(() => {
      // showInterstitialAd();
      // showRewardAd()
      InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);
      RewardedAd.createForAdRequest(TestIds.REWARDED);
      setTimeout(() => {
        setBannerAd(true);
        setTimeout(() => {
          setBannerAd(false);
          setBannerAd(true);
  
        }, 5000)
      }, 5000);
    }, [])
  
    const [selected, setSelected] = React.useState(null);
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const [t, setT] = React.useState(30);
    const [mins, setMins] = useState(demoData.length)
    const [secs, setSecs] = useState(0)
    const [correctAnsCount, setCorrectAnsCount] = React.useState(0);
    const [submitPressed, setSubmitPressed] = React.useState(false);
  
  
    const selectOption = (val) => {
      setSelected(val);
    }
  
  
    const [loaded, setLoaded] = useState(false);
   
    let adProp;
    // const rewarded = RewardedAd.createForAdRequest('ca-app-pub-6130896341011703/3701852302', {
    //   requestNonPersonalizedAdsOnly: true,
    //   keywords: ['fashion', 'clothing'],
    // });
  
    // const eventListener1 = rewarded.onAdEvent((type, error, reward) => {
    //   console.log("data :", type,error,reward);
    //   if (type === RewardedAdEventType.LOADED && !adLoaded) {
    //     setAdLoaded(true);
    //     setTimeout(()=> {
    //       rewarded.show().catch((e) => {
    //         console.log("error : ", e);
    //       });
    //     }, 3000)      
        
    //   }
    //   if (type === "closed") {
    //     console.log('User earned reward of ', reward);
    //     clearInterval(adProp);
    //     // console.log("value : ", val);
    //     navigation.navigate("FinalScoreScreen", { savedAns: savedAns, testIndex : testIndex  });
    //   }
    //       });
  
    
  
    const reloadAd = () => {
        
        // if (!rewarded.loaded) {
          // rewarded.load();
        // }

    }
  
    useEffect(() => {
  
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        }
      ).start();
  
      setTimeout(() => {
        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          }
        ).start();
      }, 500);
  
      setT(30)
    }, [questionIndex])
  
    const tick = async () => {
      // const {t} =this.props;
      //    await console.log('asdas', 'iam printing');
      setT(t - 1);
    }
  
    const getIndex = (val) => {
      switch (val) {
        case "a":
          return 0;
        case "b":
          return 1;
        case "c":
          return 2;
        case "d":
          return 3;
        default:
          return val
      }
  
  
    }
  
  
  
  
  
  
  
  
  
    const resetTimer = () => {
      if (questionIndex < demoData.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setMins(demoData.length);
        setSecs(0);
      }
    }
  
    const onPressNextButton = () => {
      setQuestionIndex(questionIndex + 1);
      setSelected(null);
      // resetTimer()
    }
  
  
    const onPressResetButton = () => {
      setQuestionIndex(0);
      setSelected(null);
      setMins(demoData.length);
      setSecs(0);
    }
  
    const onPressBackButton = () => {
      setQuestionIndex(questionIndex - 1);
      setSelected(null);
      // setMins(13);
      // setSecs(0);
    }
  
    const renderAdUntilLoaded=()=>{
      adProp = setInterval(()=> {
        reloadAd();     
      },2000);
      // if(rewarded.loaded){
      //   setSubmitPressed(false);
      //   eventListener1();
      // }
    }
  
    const onShowAd = async () => {
      // rewarded.load();
      setSubmitPressed(true);
  renderAdUntilLoaded();
    }

    console.log()
  
    return (
      <View style={{height:"100%",backgroundColor:colors.background}}>
        <Animated.View style={{ flex: 1, opacity: fadeAnim, backgroundColor: colors.background }}>
        {submitPressed && <View style={{position:'absolute',zIndex:2,width:'100%',height:'100%',justifyContent:'center'}}>
        <ActivityIndicator size={60} />
        </View>}  
          <ScrollView style={{  width: '100%', flexShrink: 1 }}>
            {demoData.map((v ,i)=>{
              return (
            <View style={{ flexShrink: 1, flexWrap: 'wrap' }} key={i}>
              <View style={{ flexDirection: 'row', padding: 10, marginTop: 0 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.textColor }}>{i+1}. </Text>
                <Text style={{ fontSize: 18, flexWrap: 'wrap', width: '90%', color: colors.textColor }}>{v.mapValue.fields.Q.stringValue}</Text>
              </View>
              {v.mapValue.fields.Opt.arrayValue.values.map((value, index) => {

                return (
                  <CustomRadioButtonForAnswers 
                  colors={colors} 
                  key={index} 
                  wrongAnsIcon={<MaterialIcons name="cancel" size={20} color={'red'} />}  
                  correctAnsIcon={<MaterialIcons name="check-circle" size={20} color={'black'} />} 
                  optionSelectColor={'#FFB830'} 
                  radioButtonColor={'black'} 
                  index={index} 
                  value={getIndex(v.mapValue.fields.A.stringValue)}
                  selectedOptionIndex={savedAns[i] != undefined ? savedAns[i].selectedAnswer : ""} 
                  option={value.stringValue}
                  showWrongIcon={true} 
                  showCorrectIcon={true} 
                  getRightIconIndex={getIndex(v.mapValue.fields.A.stringValue)} 
                  />
                )
              })}

            </View>
              )
          })}
            <View style={{ height: 100 }}></View>
          </ScrollView>
          <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={()=>{
              navigation.goBack();
            }} style={{backgroundColor:'#3B9AE1',padding:10, borderRadius:10}}>
            <Text style={{color: 'white', textAlign:'center'}}>GO BACK TO RESULT PAGE</Text>  
            </TouchableOpacity>
            {/* <Text style={{fontWeight:'bold',color:'black'}}>Correct : {correctAnsCount}</Text> */}
            {/* <Text style={{ fontWeight: 'bold', color: colors.textColor }}>Total Questions : {demoData.length}</Text> */}
            {/* <Time showInterstitialAd={showInterstitialAd} onShowAd={onShowAd} showRewardAd={showRewardAd} rewarded={rewarded} savedAns={savedAns} onPressBackButton={onPressBackButton} onPressResetButton={onPressResetButton} demoData={demoData} questionIndex={questionIndex} onPressNextButton={onPressNextButton} mins={mins} setMins={setMins} secs={secs} setSecs={setSecs} resetTimer={resetTimer} t={t} tick={tick} /> */}
          </View>
  
        </Animated.View>
       
        {/* <AdBanner bannerAd={bannerAd} /> */}
  
      </View>
    );
  
}

const AdBanner = (props) => {
    if (!props.bannerAd)
      return null;
    return (<GAMBannerAd
      unitId={'ca-app-pub-6130896341011703/4109062322'}
      size={BannerAdSize.ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
  
    />)
  }