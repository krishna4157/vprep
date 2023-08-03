/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import { BannerAd, BannerAdSize } from '@react-native-firebase/admob';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
 import {
   StyleSheet,
   View,
   Text,
   StatusBar,
   Dimensions,
   TouchableOpacity,
   Animated,
   Easing,
   ScrollView,
   Button,
   RefreshControl,
   Image,
   Linking,
 } from 'react-native';
import { Card, Modal, Portal, useTheme } from 'react-native-paper';
// import data1 from '../../data';
import InAppReview from 'react-native-in-app-review';
import AppStoreReview from 'react-native-app-store-review';
import Rate, { AndroidMarket } from 'react-native-rate'
import Context from '../../Context';
import { ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import Images from '../assets/Images';

 const {height: SCREEN_HEIGHT} = Dimensions.get('window');
 
 const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
 const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
 const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
 const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
 const adIds = ["ca-app-pub-3940256099942544/6300978111","ca-app-pub-3940256099942544/6300978111","ca-app-pub-3940256099942544/6300978111","ca-app-pub-3940256099942544/6300978111"]
 const prodAds = ["ca-app-pub-6130896341011703/5285605098","ca-app-pub-6130896341011703/5285605098","ca-app-pub-6130896341011703/5285605098","ca-app-pub-6130896341011703/5285605098"]
 const renderContent = () => {
   return (
     <View style={styles.body}>
       {Array.from(Array(30).keys()).map((i) => (
         <Card
           key={i}
           style={{padding: 15, alignItems: 'center', justifyContent: 'center',margin:10,elevation:20}}>
           <Text>Item {i + 1}</Text>
         </Card>
       ))}
     </View>
   );
 };
 

 
 
 export const TestListPage = () => {

    let opacity = new Animated.Value(0);
  let navigation = useNavigation();
  const context = useContext(Context);
  const sd = JSON.parse(context?.data);
  console.log("STR : ",context?.adsData);
  // console.log("Data123 : ", JSON.parse("{"+context?.data+"}"));
    const data  = {
     data :  JSON.parse(context?.data)
      
    
    }
    const adsData  = {
      data :  JSON.parse(context?.adsData)
       
     
     }
    console.log("DEMO DATA 123: ",data.data);
  const { colors } = useTheme();

  const [bannerAd, setBannerAd] = React.useState(false);
  const [bannerAdByEnv, setBannerAdByEnv] = React.useState("");
  const [bannerArrayAdByEnv, setBannerArrayAdByEnv] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(()=> {
    // AppStoreReview.requestReview('com.vprep'); // Change to your app store id
    if (__DEV__) {
      console.log('Development code build');
      
      let bannerAdByEnv = "ca-app-pub-3940256099942544/6300978111";
      setBannerAdByEnv(bannerAdByEnv);
      // alert(JSON.stringify(adsData.data?.adsArray.arrayValue.values));
      setBannerArrayAdByEnv(adsData.data?.adsArray.arrayValue.values);
  } else {
    let bannerAdByEnv = "ca-app-pub-6130896341011703/5285605098";
    // setBannerAdByEnv(bannerAdByEnv);
    // setBannerArrayAdByEnv(prodAds);
    setBannerAdByEnv(adsData.data?.adsArray.arrayValue.values[0].stringValue);
    setBannerArrayAdByEnv(adsData.data?.adsArray.arrayValue.values);

      console.log('Production code build');
  }
    setTimeout(() => {
      setBannerAd(true);
      setTimeout(() => {
        setBannerAd(false);
        setBannerAd(true);

      }, 5000)
    }, 5000);
    retrieveData();
    // context.getData();
  },[])

  const retrieveData =  async  () => {
    context?.getData();
  }

  const triggerReview =() => {
    const options = {
      GooglePackageName:"com.vprep",
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp:false,
      openAppStoreIfInAppFails:true,
    }
    Rate.rate(options, (success, errorMessage)=>{
      if (success) {
        // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
        console.log("successfull");
      }
      if (errorMessage) {
        // errorMessage comes from the native code. Useful for debugging, but probably not for users to view
        console.error(`Example page Rate.rate() error: ${errorMessage}`)
      }
    })
  }

    const animate = () => {
        opacity.setValue(0);
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1200,
          easing : Easing.elastic(4),
        }).start();
      };

    const size = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 20]
      });

    const animatedStyles = [
        styles.box,
        {
          opacity: opacity,
          width: 100,
          height: size
        }
      ];


      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        context?.getData();
        setTimeout(() => {
          setRefreshing(false);  
        }, 3000);
        
      }, []);

      const [visible, setVisible] = React.useState(false);

      const showModal = () => setVisible(true);
      const hideModal = () => setVisible(false);
      const containerStyle = {backgroundColor: 'transparent', padding: 20,zIndex:30, justifyContent:"center"};
      
    console.log("DATA : ",data);
   return (
     <>
      
       <StatusBar barStyle="dark-content" />
       
        {refreshing && <View style={{flex:1, backgroundColor:colors.background,zIndex:10, position:'absolute',height:'100%',width:'100%',justifyContent:'center'}}>
          {/* <ActivityIndicator size={"large"} /> */}
          <LottieView style={{ width: 80, height: 80, justifyContent:'center',alignSelf:'center' }} resizeMode='cover' source={Images.loading} autoPlay loop={true} />
          <Text style={{fontSize:25,color:colors.textColor,fontWeight:'bold',textAlign:'center'}}>Loading...</Text>
          </View>}
          {visible && <View style={{position:'absolute',height:'100%', width:'100%', backgroundColor:'rgba(0,0,0,0.8)',zIndex:10}} />}
          <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} style={{margin:10}}>
          <View>
          <Image  source={Images.demoImage} style={{width:'100%', height: '100%',position:'absolute', tintColor: '#1371e2'}} resizeMode={'stretch'}/>
          <View style={{margin:35,marginVertical:130}} >
          <Text style={{color:'white'}}>{" Send your Quiz Questions to \n "}<Text onPress={()=> {
             Linking.openURL('mailto:krishna.santho08@gmail.com')
          }} style={{color:'#FF985E',fontFamily : 'EduVICWANTBeginner-Bold',fontSize:20}}>"krishna.santho08@gmail.com"</Text>{"\n and get it approved to earn Money. New Questions will be updated every week. \n Selected users will recieve flat"}<Text style={{fontSize:25, fontWeight:'bold'}}>{'\n'}50</Text>{" Rs"}</Text>
          <View style={{borderTopWidth:1,borderColor:'white',marginTop:5}}>
          <Text style={{color:'white'}}>Note : Name and UPI id must be included in the mail.</Text>
          </View>
            <TouchableOpacity onPress={hideModal} style={{backgroundColor:'black', width: '30%',borderRadius:55,marginTop:10}}>
              <Text style={{color: 'white', textAlign:'center',marginHorizontal:15,margin:5}}>OK</Text>
            </TouchableOpacity>
          </View>
          </View>
        </Modal>
      </Portal>
       <Animated.ScrollView refreshControl={ <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />} style={{backgroundColor : colors.background}}  >
       <Animated.View style={[animatedStyles, { zIndex: -10, backgroundColor:'transparent'}]} />
      <View style={{backgroundColor:'blue'}}>
       <TouchableOpacity onPress={()=>{
        showModal();
        // alert(" Send your Questions to \n krishna.santho08@gmail.com\n and get it approved to earn money. \n Note : Name and UPI id must be included in the mail.")
       }} style={{textAlign:'center',alignSelf:'center',margin:10}}>
        
       <Text style={{color:'white', textDecorationLine:'underline',fontWeight:'bold'}}>Click here to get a chance to be part and earn Money </Text>
       </TouchableOpacity>
       </View>
       {Array.from(Array(Object.keys(data.data).length)).map((value,i) => 
       (
        <>
         <Card
          onPress={()=> { navigation.navigate("Home", { testIndex : i+1 }) }}
           key={i}
           style={{padding: 15, justifyContent: 'center',margin:10,elevation:20, borderRadius:15,backgroundColor: colors.tertiary}}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           <View style={{flexDirection:'column'}}>
           <Text style={{fontSize:25,color:colors.textColor,fontWeight:'bold'}}>Quiz {i+1}</Text>
           <Text style={{color: colors.textColor}}>total questions {Object.values(data.data)[i].arrayValue.values.length}</Text>
           <Text style={{color: colors.textColor,fontSize : 12}}>Source : {JSON.stringify(Object.values(data.data)[i].arrayValue.values[0].mapValue.fields.source?.stringValue) ? Object.values(data.data)[i].arrayValue.values[0].mapValue.fields.source?.stringValue : "VPREP"}</Text>
           
           </View>
           <View style={{alignContent:'flex-end'}}>
            <View style={{backgroundColor:'red', borderRadius:5,paddingLeft:5, paddingRight:5}}>
           <Text style={{fontWeight:'bold', color:'white'}}>Topic : {Object.values(data.data)[i].stringValue ?? "UPSC"}</Text>
           </View>
          </View>
           </View>
           <View>
               {/* <TouchableOpacity style={{padding:10,backgroundColor:'red',borderRadius:5}}>
                <Text style={{color:'white'}}>RESET</Text> 
           </TouchableOpacity> */}
           </View>
           {/* {i%2 == 0 && <AdBanner2 bannerAd={bannerAd} />} */}
         </Card>
                    {i < bannerArrayAdByEnv?.length -1 && bannerArrayAdByEnv.length != 0 && <AdBanner2 bannerAd={bannerAd} bannerArrayAdByEnv={bannerArrayAdByEnv} id={bannerArrayAdByEnv[i]} index={i} />}
</>
       ))}
              <Animated.View style={[animatedStyles, { zIndex: -10, backgroundColor:'transparent'}]} />
           
       </ Animated.ScrollView>
       
       {bannerAd && bannerAdByEnv!=""  ? <AdBanner bannerAd={bannerAd} bannerAdByEnv={bannerAdByEnv} /> : <></>}
     </>
   );
 };

 const AdBanner = (props) => {
  console.log("BANNER : ",props.bannerAdByEnv);
  if (!props.bannerAd)
    return null;
  return (<BannerAd
    unitId={props?.bannerAdByEnv}
    size={BannerAdSize.ADAPTIVE_BANNER}
    requestOptions={{
      requestNonPersonalizedAdsOnly: true,
    }}

  />)
}

const generateRandomNumberFromRange = (min,max) => {
    const r = Math.random()*(max-min) + min
    return Math.floor(r)
}


const AdBanner2 = (props) => {
  const adSizesArray = [BannerAdSize.ADAPTIVE_BANNER,BannerAdSize.LARGE_BANNER,BannerAdSize.BANNER,BannerAdSize.FLUID,BannerAdSize.FULL_BANNER,BannerAdSize.LEADERBOARD,BannerAdSize.MEDIUM_RECTANGLE,BannerAdSize.SMART_BANNER,BannerAdSize.WIDE_SKYSCRAPER];
  const bannerAdIndex =generateRandomNumberFromRange(0,adSizesArray.length);
  console.log("ID ", props.id );
  if (!props.bannerAd)
    return null;
  return (
  <View style={{justifyContent:'center', alignContent:'center', alignSelf:'center'}}>
  <Text>{      props.id?.stringValue}</Text>
  <BannerAd
    unitId={
      props.id?.stringValue
    }
    size={adSizesArray[bannerAdIndex]}
    
    requestOptions={{
      requestNonPersonalizedAdsOnly: true,
    }}

  />
  </View>
  )
}
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
   contentContainer: {
     flexGrow: 1,
   },
   navContainer: {
     height: HEADER_HEIGHT,
     marginHorizontal: 10,
   },
   statusBar: {
     height: STATUS_BAR_HEIGHT,
     backgroundColor: 'transparent',
   },
   navBar: {
     height: NAV_BAR_HEIGHT,
     justifyContent: 'space-between',
     alignItems: 'center',
     flexDirection: 'row',
     backgroundColor: 'transparent',
   },
   titleStyle: {
     color: 'white',
     fontWeight: 'bold',
     fontSize: 18,
   },
 });
 
