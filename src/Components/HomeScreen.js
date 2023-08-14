import { InterstitialAd, RewardedAd, RewardedAdEventType, TestIds,GAMBannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { useNavigation } from "@react-navigation/native";
import React, {useRef, useEffect, useState, useContext} from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import {View,Text, Animated, ScrollView} from "react-native";
// import data from "../../data";
import CustomRadioButton from "./CustomRadioButton";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import _ from "lodash";
import { Time } from './CustomTimer';
import { useTheme } from "react-native-paper";
import Context from "../../Context";
import { AdEventType } from "@react-native-firebase/admob";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

export const HomeScreen = (props) => {

  const context = useContext(Context);
  const sd = JSON.parse(context?.data);
  console.log("STR : ",sd);
  // console.log("Data123 : ", JSON.parse("{"+context?.data+"}"));
    const data  = {
     data :  JSON.parse(context?.data)
      
    
    }

    const adsData  = {
      data :  JSON.parse(context?.adsData)
       
     
     }

     console.log("ADS DATA : ",adsData?.data );
  
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

  var s = [1, 2, 3, 4];
    const navigation = useNavigation();
    const rewaredAd = adsData.data?.RewardedAd?.stringValue;
    const bannAd = adsData.data?.adsArray?.arrayValue?.values[0]?.stringValue; 
    // console.log("data : ", data.data);
    const testIndex = props?.route?.params?.testIndex;
    var demoData = getData(testIndex)?.arrayValue.values;
    console.log("DEE : ",demoData);
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
    const [bannerAd, setBannerAd] = React.useState(false);
    const [bannerAdByEnv, setBannerAdByEnv] = React.useState("");

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
      // InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);
      // RewardedAd.createForAdRequest(TestIds.REWARDED);
      if(bannerAdByEnv==""){
      setTimeout(() => {
        setBannerAd(true);
        setTimeout(() => {
          setBannerAd(false);
          setBannerAd(true);
          if(__DEV__){
              setBannerAdByEnv("ca-app-pub-3940256099942544/6300978111");
            // setBannerAdByEnv("ca-app-pub-3940256099942544/6300978111");
          } else {
            setBannerAdByEnv(bannAd);
            // setBannerAdByEnv("ca-app-pub-6130896341011703/5285605098");
          }
        }, 3000)
      }, 3000);
      }
    }, [])
  
    const [selected, setSelected] = React.useState(null);
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const [t, setT] = React.useState(30);
    const [mins, setMins] = useState(demoData.length)
    const [secs, setSecs] = useState(0)
    const [correctAnsCount, setCorrectAnsCount] = React.useState(0);
    const [savedAns, setSavedAnswers] = React.useState([]);
    const [submitPressed, setSubmitPressed] = React.useState(false);
  
  
    const selectOption = (val) => {
      setSelected(val);
    }
  
  
    const [loaded, setLoaded] = useState(false);
    // const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    //   requestNonPersonalizedAdsOnly: true,
    //   keywords: ['fashion', 'clothing'],
    // });
    let adProp;
    let unitId;
    console.log("REWARDED AD : ",rewaredAd );
    if(__DEV__){
      unitId = "ca-app-pub-3940256099942544/5224354917"
    } else {

      unitId = rewaredAd;
      // unitId = "ca-app-pub-6130896341011703/6705676166"
    }
    
    let rewarded = RewardedAd.createForAdRequest(unitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });
  
    const eventListener1 = rewarded.addAdEventListener(RewardedAdEventType.LOADED,()=>{
      if (!adLoaded) {
            setAdLoaded(true);
            setTimeout(()=> {
              rewarded.show().catch((e) => {
                console.log("error : ", e);
              });
            }, 3000);
      }
    });

    const eventListener2 = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD,()=>{
            clearInterval(adProp);
            navigation.navigate("FinalScoreScreen", { savedAns: savedAns, testIndex : testIndex  });
    });

    // .onAdEvent((type, error, reward) => {
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
        
        if (!rewarded.loaded) {
          rewarded.load();
        }

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
      },7000);
      if(rewarded.loaded){
        setSubmitPressed(false);
        // navigation.navigate("FinalScoreScreen", { savedAns: savedAns, testIndex : testIndex  });

        eventListener1();
        eventListener2();
      }
    }
  
    const onShowAd = async () => {
      // rewarded.load();
      setSubmitPressed(true);
      // navigation.navigate("FinalScoreScreen", { savedAns: savedAns, testIndex : testIndex  });
      renderAdUntilLoaded();
    }

    const windowHeight = Dimensions.get('window').height -10;
    const screenHeight = Dimensions.get('screen').height -10;

    return (
      <View style={{flex:1,backgroundColor:colors.background,marginBottom:0}}>
        <Animated.View style={{ flex: 1, opacity: fadeAnim, backgroundColor: colors.background }}>
        {submitPressed && <View style={{position:'absolute',zIndex:2,width:'100%',height:'100%',justifyContent:'center'}}>
        <ActivityIndicator size={60} />
        </View>}  
        <View style={{flex:1,flexDirection:'column', justifyContent:'space-between'}}>
          <>
          <ScrollView style={{ width: '100%', flexShrink: 1 }}>
            <View style={{ flexShrink: 1, flexWrap: 'wrap' }} >
              <View style={{ flexDirection: 'row', padding: 10, marginTop: 0 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.textColor }}>{questionIndex + 1}. </Text>
                <Text style={{ fontSize: 18, flexWrap: 'wrap', width: '90%', color: colors.textColor }}>{demoData[questionIndex].mapValue.fields.Q.stringValue}</Text>
              </View >
              <View style={{marginLeft:10}}>
              {demoData[questionIndex].mapValue.fields.Opt.arrayValue.values.map((value, index) => {
                console.log("values : ",value);
                return (
                  <CustomRadioButton colors={colors} key={index} wrongAnsIcon={<MaterialIcons name="cancel" size={15} color={'red'} />} getCancelIconIndex={3} correctAnsIcon={<MaterialIcons name="check-circle" size={20} color={'green'} />} optionSelectColor={'#FFB830'} radioButtonColor={'black'} index={_.find(savedAns, function (o) { return o?.questionIndex == questionIndex })?.selectedAnswer} onSelect={() => {
  
                    // if(selected == null){
                    selectOption(index);
                    var ci = getIndex(demoData[questionIndex].mapValue.fields.A.stringValue);
                    if (index == ci) {
                      setCorrectAnsCount(m => m + 1);
                    }
                    var array = savedAns;
                    //   var filtered = array.filter(function(value, index){ 
                    //     return value.questionIndex != questionIndex;
                    // });
                    // setSavedAnswers(filtered);
                    // alert(JSON.stringify(savedAns));
                    var checkIndex = _.findIndex(savedAns, (va, index) => { return va.questionIndex == questionIndex });
                    // alert("check index : "+checkIndex);    
                    if (checkIndex != -1) {
                      array.splice(checkIndex, 1);
                      array.push({
                        questionIndex: questionIndex,
                        selectedAnswer: index
                      });
                      setSavedAnswers(array);
  
                    } else {
                      array.push({
                        questionIndex: questionIndex,
                        selectedAnswer: index
                      });
                      setSavedAnswers(array);
  
                    }
  
                    // }
  
                  }} value={index} option={value.stringValue
                  } showWrongIcon={false} showCorrectIcon={false} getRightIconIndex={getIndex(demoData[questionIndex].mapValue.fields.A.stringValue)} />
                )
              })}
              </View>
            </View>
            {/* <Text>{JSON.stringify(savedAns)}</Text> */}
            <View style={{ height: 100 }}></View>
          </ScrollView>
          </>
          <>
          <View style={{ padding: 10, flexWrap:'wrap' }}>
            {/* <Text style={{fontWeight:'bold',color:'black'}}>Correct : {correctAnsCount}</Text> */}
            <Text style={{ fontWeight: 'bold', color: colors.textColor }}>Total Questions : {demoData.length}</Text>
            <Time showInterstitialAd={showInterstitialAd} onShowAd={onShowAd} showRewardAd={showRewardAd} rewarded={""} savedAns={savedAns} onPressBackButton={onPressBackButton} onPressResetButton={onPressResetButton} demoData={demoData} questionIndex={questionIndex} onPressNextButton={onPressNextButton} mins={mins} setMins={setMins} secs={secs} setSecs={setSecs} resetTimer={resetTimer} t={t} tick={tick} />
          </View>
          </>
              </View>
        </Animated.View>
       
        {bannerAdByEnv != "" && <AdBanner bannerAd={bannerAd} bannerAdByEnv={bannerAdByEnv} />}
  
      </View>
    );
  
}


const generateRandomNumberFromRange = (min,max) => {
  const r = Math.random()*(max-min) + min
  return Math.floor(r)
}

const AdBanner = React.memo((props) => {
  const adSizesArray = [BannerAdSize.ANCHORED_ADAPTIVE_BANNER,BannerAdSize.LARGE_BANNER,BannerAdSize.BANNER,BannerAdSize.MEDIUM_RECTANGLE,BannerAdSize.MEDIUM_RECTANGLE];
  const bannerAdIndex =generateRandomNumberFromRange(0,adSizesArray.length-1);
  
    if (!props.bannerAd)
      return null;
    return (<GAMBannerAd
      unitId={props.bannerAdByEnv}
      sizes={[adSizesArray[bannerAdIndex]]}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
  
    />)
  });