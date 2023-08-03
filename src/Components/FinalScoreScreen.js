import React, { useState, useEffect, useRef, useCallback, useContext } from 'react'
import { Animated, Image, ImageBackground, Text, TouchableOpacity, View, Easing, Alert, Button, BackHandler, Dimensions } from 'react-native'
import { Card, ProgressBar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { VictoryPie } from 'victory-native';
// import data from '../../data';
import _ from 'lodash';
import Images from '../assets/Images';
import InAppReview from 'react-native-in-app-review';
import Rate, { AndroidMarket } from 'react-native-rate';
import { ScrollView } from 'react-native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import Context from '../../Context';

// import AwesomeButton from 'react-native-really-awesome-button';


const FinalScoreScreen = (props) => {

  const context = useContext(Context);
  const sd = JSON.parse(context?.data);
  console.log("STR : ",sd);
  // console.log("Data123 : ", JSON.parse("{"+context?.data+"}"));
    const data  = {
     data :  JSON.parse(context?.data)
      
    
    }


  const { colors} = useTheme();
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
  const testIndex = props?.route?.params?.testIndex;
  console.log("DEMO DATA : ", testIndex)
  const demoData = getData(testIndex).arrayValue.values;
  // console.log("props : ", props);
  const savedAns = props?.route?.params?.savedAns;
  const navigation = useNavigation();

  const [showScore, setShowScore] = React.useState(true);
  const graphicColor = ['green', 'red', 'orange']; // Colors
  //   const wantedGraphicData = [{ y: 50 }, { y: 25 }, { y: 25 }]; // Data that we want to display
  const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }]; // Data used to make the animate prop work
  const [graphicData, setGraphicData] = useState(defaultGraphicData);
  const [hasUnsavedChanges, sethasUnsavedChanges] = React.useState(false);
  const [correct, setCorrect] = React.useState(0);
  const [inCorrect, setInCorrect] = React.useState(0);
  const [ua, setUa] = React.useState(demoData.length);

  const reftag = React.useRef(hasUnsavedChanges);
  const ref = useRef();


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

  const updateScore = async () => {
    var correctAns = 0;
    var inCorrectAns = 0;
    var unAnswered = demoData.length;
    
    // var totalQuestions = data?.data?.length;
    if (savedAns?.length > 0) {
      var array = []
      demoData?.map((val, index) => {
        var getAnswerIndex = getIndex(val.mapValue.fields.A.stringValue);
        array.push(getAnswerIndex);
      });
      // var s = _.sortBy(savedAns,'questionIndex');
      // console.log("search:",s);
      savedAns.map((val, index) => {
        if (val.selectedAnswer === array[val.questionIndex]) {
          correctAns = correctAns + 1;
        }
      });
      // savedAns.map((val, i) => {
      //     // if(val.selectedAnswer ==)
      // })
      unAnswered = parseInt(demoData.length - savedAns?.length);
      // correctAns = parseInt((correctAns/totalQuestions*100).toFixed(1));
      inCorrectAns = demoData.length - (correctAns + unAnswered);
      console.log("correct : ",correctAns, inCorrectAns,unAnswered);

      setCorrect(correctAns);
      setUa(unAnswered);
      setInCorrect(inCorrectAns);
      // console.log("correct : ", correct, inCorrect, ua);

      // const wantedGraphicData = [{ y: correctAns }, { y: inCorrectAns }, { y: unAnswered }]; // Data that we want to display
      // console.log("correct : ",correct, inCorrect, ua);

      // alert("check "+ unAnswered);
      // setGraphicData(wantedGraphicData); // Setting the data that we want to display
    }
  }

  const getRating = async() => {
    
    setTimeout(()=> {
      InAppReview.RequestInAppReview().then((hasFlowFinishedSuccessfully) => {
        // when return true in android it means user finished or close review flow
        console.log('InAppReview in android', hasFlowFinishedSuccessfully);
    
        // when return true in ios it means review flow lanuched to user.
        console.log(
          'InAppReview in ios has launched successfully',
          hasFlowFinishedSuccessfully,
        );
    
        // 1- you have option to do something ex: (navigate Home page) (in android).
        // 2- you have option to do something,
        // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).
    
        // 3- another option:
        if (hasFlowFinishedSuccessfully) {
          // do something for ios
          // do something for android
        }
    
        // for android:
        // The flow has finished. The API does not indicate whether the user
        // reviewed or not, or even whether the review dialog was shown. Thus, no
        // matter the result, we continue our app flow.
    
        // for ios
        // the flow lanuched successfully, The API does not indicate whether the user
        // reviewed or not, or he/she closed flow yet as android, Thus, no
        // matter the result, we continue our app flow.
      })
      .catch((error) => {
        //we continue our app flow.
        // we have some error could happen while lanuching InAppReview,
        // Check table for errors and code number that can return in catch.
        console.log(error);
      });
    }, 2000);
  }

  useEffect(() => {
    const cherckReview = InAppReview.isAvailable();

    console.log("check : ",cherckReview);
    getRating();
    
    sethasUnsavedChanges(true);
    setTimeout(() => {
      setShowScore(false);
        var correctAns = 0;
        var inCorrectAns = 0;
        var unAnswered = demoData.length;
        var totalQuestions = demoData.length;
        var unansweredPercentage = 100
        if (savedAns?.length > 0) {
          var array = []
          demoData.map((val, index) => {
            var getAnswerIndex = getIndex(val.mapValue.fields.A.stringValue);
            array.push(getAnswerIndex);
          });
          // var s = _.sortBy(savedAns,'questionIndex');
          // console.log("search:",s);
          savedAns.map((val, index) => {
            if (val.selectedAnswer === array[val.questionIndex]) {
              correctAns = correctAns + 1;
            }
          });
          // savedAns.map((val, i) => {
          //     // if(val.selectedAnswer ==)
          // })
          unAnswered = parseInt(demoData.length - savedAns?.length);
          // correctAns = parseInt((correctAns/totalQuestions*100).toFixed(1));
          inCorrectAns = demoData.length - (correctAns + unAnswered);
          // console.log("correct : ",correctAns, inCorrectAns,unAnswered);

          // setCorrect(correctAns);
          // setUa(unAnswered);
          // setInCorrect(inCorrectAns);
          // console.log("correct : ", correct, inCorrect, ua);

          // const wantedGraphicData = [{ y: correctAns }, { y: inCorrectAns }, { y: unAnswered }]; // Data that we want to display
          // console.log("correct : ",correct, inCorrect, ua);

          // alert("check "+ unAnswered);
          // setGraphicData(wantedGraphicData); // Setting the data that we want to display
        }
        var totalQuestions = demoData.length;
        if (correctAns != 0) {
          correctAns = correctAns / totalQuestions * 100;
        }

        if (inCorrectAns != 0) {
          inCorrectAns = inCorrectAns / totalQuestions * 100;
        }
        var uAns = 0.0;
        if (ua != 0) {
          unAnswered = unAnswered / totalQuestions * 100;
        }// totalQuestions = totalQuestions.toFixed(1);
        // correctAns = correctAns.toFixed(1);
        // incorrectAns = incorrectAns.toFixed(1);
        // uAns = uAns.toFixed(1);
        // console.log("check ans : ",correctAns,incorrectAns,uAns);
        var finalCorrectPercentage = parseFloat((correctAns).toFixed(2));
        var incorrectPercentage = parseFloat((inCorrectAns).toFixed(2));
        unansweredPercentage = parseFloat((unAnswered).toFixed(2));
        console.log("correct : ",correctAns, inCorrectAns,unAnswered);
        console.log("check ans : ", finalCorrectPercentage, incorrectPercentage, unansweredPercentage);

        const wantedGraphicData = [{ y: finalCorrectPercentage }, { y: incorrectPercentage }, { y: unansweredPercentage }]; // Data that we want to display
        console.log("WANTED : ",wantedGraphicData);
        setGraphicData(wantedGraphicData);
    }, 2000);
  }, [])

  let opacity = new Animated.Value(0);

  const animate = () => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      easing: Easing.elastic(4),
      useNativeDriver : true
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80]
  });

  const onCapture = () => {
    // console.log("do something with ", uri);
    ref.current.capture().then(uri => {
      RNFS.readFile(uri, 'base64')
      .then(res =>{
        console.log(res);
        // alert(JSON.stringify(res));

        const options= {
          url : `data:image/png;base64,`+res,
          message : "checkout my quiz score, this application works amazing to  assess and improve my current affairs for competitive exams like UPSC CSE, State PSE's, SSC  ect.Install it for free on google play store instantly with this link https://play.google.com/store/apps/details?id=com.vprep"
        };
        // console.log("do something with ", uri);
        Share.open(options).then((res) => {
          console.log(res);
        })
      
      })  
  .catch((err) => {
    err && console.log(err);
  });
    })
  };

  
  useEffect(() => {
    updateScore();
    const backAction = () => {
      Alert.alert("Hold on!", "you cant go back to the test", [
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

  const getQuoteByCorrectAnswers = (c,i,u) => {
    if(u == demoData.length){
      return "please try to attend atleast one item";
    } else
    if(c > i) {
      return "You are awesome";
    } else {
      return "keep trying";
    }
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


  return (
    <View style={{ flex: 1, justifyContent: 'center', height:'100%' }}>
      {showScore ? <LottieView source={Images.wellDone} autoPlay loop={false} style={{width:'100%', height:200}}/> :
            <ViewShot ref={ref} captureMode="mount">

        <View style={{ height: '100%', width: '100%',backgroundColor: showScore ? "white" : colors.background }}
        //  source={require("./assets/gifs/success-1.gif")} 
        >
          <LottieView style={{ width: '100%', height: '100%', position: 'absolute' }} resizeMode='cover' source={Images.success} autoPlay loop={false} />
          <TouchableOpacity onPress={onCapture} style={{height:40,alignSelf:"flex-end",marginRight:10, flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <Text style={{color : colors.textColor, fontSize:18,fontFamily : "EduVICWANTBeginner-Bold",marginTop:10}}>Share your result</Text>
          <LottieView style={{ width: 50, height: 50}} resizeMode='contain' source={Images.share} autoPlay loop={true} />

          </TouchableOpacity>
          <View style={{ marginTop: 0 }}>
            
            <LottieView style={{ width: 70, height: 70, justifyContent: 'center', alignSelf: 'center' }} source={Images.tu} autoPlay loop={false} />
            <Text style={{ justifyContent: 'center',  fontSize: 40, alignSelf: 'center', color: colors.textColor,fontFamily:'EduVICWANTBeginner-Bold' }}>Congratulations !</Text>
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'space-between',height:'80%',flexWrap:'wrap' }}>
            <View style={{}}>
              
              <View style={{ alignSelf: 'center' }}>
                <VictoryPie

                  animate={{ easing: 'bounce',duration: 5000 }}
                  data={graphicData}
                  width={Dimensions.get("screen").width}
                  height={300}

                  // cornerRadius={7}
                  colorScale={graphicColor}
                  
                  // innerRadius={0}
                  // la
                  

                  labels={[graphicData[0].y == 0 ? "" : correct+"("+(correct/demoData.length*100).toFixed(1)+"%)", graphicData[1].y == 0 ? "" : inCorrect+"("+(inCorrect/demoData.length*100).toFixed(1)+"%)", graphicData[2].y == 0 ? "" : ua+"("+(ua/demoData.length*100).toFixed(1)+"%)"]}
                // radius={60}
                labelRadius={({ innerRadius }) => innerRadius + 102 }
                labelPosition={"centroid"}
                labelPlacement={
                // ? 
                "parallel"
                // : "vertical"
              }
                // radius={({ datum }) => 50 + datum.y * 20}
                // innerRadius={40}
                radius={100}
                style={{
                  data: {
                    fillOpacity: 0.9, stroke: "transparent", strokeWidth: 3
                  },
                  labels :  {
                    fill : colors.textColor,
                    fontWeight : 'bold'
                  }
                }}
                />
              </View>
              <View style={{ padding: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ justifyContent: 'center', fontSize: 20, width: '50%', color: 'green' }}>(C) Correct</Text>
                  <Text style={{ justifyContent: 'center', fontWeight: 'bold', fontSize: 20, color: colors.textColor }}>: </Text>
                  <Text style={{ justifyContent: 'center', fontWeight: 'bold', fontSize: 20, color: colors.textColor,width:'40%' }}>{correct}</Text>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ justifyContent: 'center',  fontSize: 18, width: '50%', color: 'red' }}>(I) In Correct</Text>
                  <Text style={{ justifyContent: 'center', fontWeight: 'bold', fontSize: 20, color: colors.textColor }}>: </Text>
                  <Text style={{ justifyContent: 'center', fontWeight: 'bold', fontSize: 18, color: colors.textColor ,width:'40%'}}>{inCorrect}</Text>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ justifyContent: 'center', fontSize: 18, width: '50%', color: 'orange' }}>(UA) Un Answered</Text>
                  <Text style={{ justifyContent: 'center', fontWeight: 'bold', fontSize: 20, color: colors.textColor }}>: </Text>
                  <Text style={{ justifyContent: 'center', fontWeight: 'bold', fontSize: 18, color: colors.textColor,width:'40%' }}>{ua}</Text>

                </View>
              </View>
            </View>
            <TouchableOpacity onPress={()=> {
              navigation.navigate("AnswerScreen",{ savedAns : props?.route?.params?.savedAns,testIndex : testIndex });
            }}>
              <Text style={{color:'blue',alignSelf:'center',fontWeight:'bold',    textDecorationLine: 'underline',textDecorationStyle:'solid', textTransform:"capitalize"}}>Click here for Quiz Answers</Text>
            </TouchableOpacity>
            <Card style={{margin: 5,elevation:10, backgroundColor:colors.background,shadowColor: colors.textColor}}>
            <Text style={{ color : colors.textColor,justifyContent:"center",textAlign:'center'}}>Enjoying our app! please provide your review if not yet provided.</Text>
            <TouchableOpacity style={{ backgroundColor: 'green', shadowOffset: { width: 5, height: 5, }, shadowColor: 'black', padding: 10, margin: 10, borderRadius: 10,width: '50%',alignSelf:'center' }} title='REVIEW' onPress={() => {
                // sethasUnsavedChanges(false);
                triggerReview();

              }}>
                <Text style={{ textAlign: 'center', color: 'white' ,fontWeight:'bold'}}>REVIEW OUR APP</Text>
              </TouchableOpacity>
              </Card>
            <View>
            
              <TouchableOpacity style={{ backgroundColor: 'red', elevation: 7, shadowOffset: { width: 5, height: 5, }, shadowColor: 'black', padding: 10, margin: 10, borderRadius: 30 }} title='SUBMIT' onPress={() => {
                // sethasUnsavedChanges(false);
                navigation.navigate('MainScreen');


              }}>
                <Text style={{ textAlign: 'center', color: 'white' ,fontWeight:'bold'}}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </ViewShot>
        }
    </View>
  )
  // const graphicColor = ['#388087', '#6fb3b8', '#badfe7']; // Colors
  // const wantedGraphicData = [{ y: 20 }, { y: 50 }, { y: 30 }]; // Data that we want to display
  // const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }]; // Data used to make the animate prop work

  //   const [graphicData, setGraphicData] = useState(defaultGraphicData);

  //   useEffect(() => {
  //     setGraphicData(wantedGraphicData); // Setting the data that we want to display
  //   }, []);

  //   return (
  //     <View>

  //       <VictoryPie
  //         animate={{ easing: 'exp' }}
  //         data={graphicData}
  //         width={250}
  //         height={250}
  //         colorScale={graphicColor}
  //         innerRadius={50}
  //       />
  //     </View>
  //   );

}

const FinalScoreScreen1 = () => {
  const ref = useRef();
  
 
  return (
    <ScrollView>
      <ViewShot ref={ref} captureMode="mount">
        <Text>...The Scroll View Content Goes Here...</Text>
        <Button title='hello' onPress={()=>{
          onCapture();
        }} ></Button>
      </ViewShot>
    </ScrollView>
  );
}

export default FinalScoreScreen;
