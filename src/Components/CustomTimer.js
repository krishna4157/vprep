import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ProgressBar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RewardedAd, RewardedAdEventType } from '@react-native-firebase/admob';


export const Time = (props) => {
  const {colors} = useTheme();
  var timerId;
  const navigation = useNavigation();
  const { mins, setMins, secs, setSecs, questionIndex, demoData } = props
  const [color, setColor] = useState('green')
  const [loaded, setLoaded] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);

  // const rewarded = RewardedAd.createForAdRequest('ca-app-pub-6130896341011703/3701852302', {
  //   requestNonPersonalizedAdsOnly: true,
  //   keywords: ['fashion', 'clothing'],
  // });

  useEffect(() => {
    // const eventListener = interstitial.onAdEvent(type => {
    //   if (type === AdEventType.LOADED) {
    //     setLoaded(true);
    //   }
    // });
    // rewarded.onAdEvent((type, error, reward) => {
    //   if (type === RewardedAdEventType.LOADED) {
    //     // alert("check")
    //     setLoaded(true);
    //   }

    //   if (type === RewardedAdEventType.EARNED_REWARD) {
    //     console.log('User earned reward of ', reward);
    //   }
    // });

    // Start loading the interstitial straight away
    // interstitial.load();

    // rewarded.load();

    // Unsubscribe from events on unmount

  }, [loaded]);

  useEffect(() => {
    timerId = setInterval(() => {
      if (secs <= 0) {
        if (mins <= 0) {
          clearInterval(timerId);
          // alert('time out')
          navigation.navigate("FinalScoreScreen", { savedAns: props.savedAns });
          // props.resetTimer();
        } else {
          setMins(m => m - 1)
          setSecs(59)
        }
      }
      else {
        setSecs(s => s - 1);
        // console.log("value : ",(mins*60+secs)/780);
        if ((mins * 60 + secs) / (demoData.length*60) <= 0.5) {
          setColor("#FFB830");
          if ((mins * 60 + secs) / (demoData.length*60) <= 0.2) {
            setColor("red");
          }
        }
      }
    }, 1000)
    return () => clearInterval(timerId);
  }, [secs, mins, questionIndex])


  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>

      <ProgressBar progress={(mins * 60 + secs) / (demoData.length* 60)} color={color} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, alignItems: 'center' }}>
        <Text style={{ fontSize: 40, color: colors.textColor }}>
          {mins}:{secs < 10 && 0}{secs}
        </Text>
        <>
          {questionIndex > 0 && <TouchableOpacity style={{ borderRadius: 10, backgroundColor: '#252A34', padding: 15, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
            // if(questionIndex < demoData.length-1){
            props.onPressBackButton()
            // }
          }} >
            <Text style={{ fontWeight: 'bold', color: 'white' }}>{"    "}BACK{"   "}</Text>
          </TouchableOpacity>}
          {questionIndex < demoData.length - 1 ? <TouchableOpacity style={{ borderRadius: 10, backgroundColor: '#08D9D6', padding: 15, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
            if (questionIndex < demoData.length - 1) {
              props.onPressNextButton()
            }
          }} >
            <Text style={{ fontWeight: 'bold', color: 'white' }}>{"    "}NEXT{"   "}</Text>
          </TouchableOpacity> :
            <TouchableOpacity style={{ borderRadius: 10, backgroundColor: 'green', padding: 15, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
              if (!submitPressed) {
                setSubmitPressed(true);
                clearInterval(timerId);
                props?.onShowAd();
              }

              // alert("seccion completed");
            }} >
              <Text style={{ fontWeight: 'bold', color: 'white' }}>SUBMIT</Text>
            </TouchableOpacity>}
        </>
      </View>
    </View>
  )
}
