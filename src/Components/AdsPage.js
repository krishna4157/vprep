import React, { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads'; 
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';



export const  AdsPage = () => {
  const [loaded, setLoaded] = useState(false);
  const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });
  
  // const rewarded = RewardedAd.createForAdRequest('ca-app-pub-6130896341011703/3701852302', {
  //     requestNonPersonalizedAdsOnly: true,
  //     keywords: ['fashion', 'clothing'],
  //   });

  useEffect(() => {
    const eventListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setLoaded(true);
      }
    });
    // const eventListener1 = rewarded.onAdEvent((type, error, reward) => {
    //     if (type === RewardedAdEventType.LOADED) {
    //       setLoaded(true);
    //     }
  
    //     if (type === RewardedAdEventType.EARNED_REWARD) {
    //       console.log('User earned reward of ', reward);
    //     }
    //   });

    // Start loading the interstitial straight away
    // interstitial.load();

    // rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
      eventListener1();
    };
  }, [loaded]);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return (
      <View style={{backgroundColor:'green'}}>
    <Button
      title="Show Interstitial"
      onPress={() => {
        // interstitial.load();

          setLoaded(true);
          setTimeout(()=>{
            interstitial.show();

          }, 4000);
        // setLoaded(false)
      }}
    />
    <Button
      title="Show Rewarded Ad"
      onPress={() => {
        
            // rewarded.load();
       
        setTimeout(()=>{
        // rewarded.show();
    }, 4000)
      }}
    />
    </View>
  );
}