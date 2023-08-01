import Carousel from 'react-native-snap-carousel';
import React from "react";
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import { Pagination } from 'react-native-snap-carousel';
import { Image } from 'react-native';
import Images from '../assets/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../../Context';

export class IntroductionPage extends React.Component {
  static contextType = Context;

   
    constructor(props){
        super(props);
        this.inputs = {
            _activeItem: 0,
        };
        this.state = {
          activeIndex:0,
          appTheme : "light",
          carouselItems: [
          {
              title:"Hi! Welcome to VPREP",
              text: Images.hi,
          },
          {
            title:"Tap the Image to change theme",
            text: Images.test,
          },
          {
              title:"Congratulations!,You are in the right place to practice and ace your UPSC praparation",
              text: Images.test,
          },
          {
              title:"You are provided with well sorted multiple choice questions on Daily CURRENT AFFAIRS",
              text: Images.quiz,
          },
          {
              title:"You are in safe hands as we don't collect any of your personal information and your quiz data will be secured locally for now in your device itself. NO DATA will be saved online.",
              text: Images.nodataLoader,
          },
          {
              title:"There will be a certain time limit for all questions given in the quiz. The quiz automatically submits when the timer recedes to zero. A rewarded ad will be played by clicking Submit button. After that you can get your results of your attempted test.",
              text: Images.colortimer,
          },
        ]
      }
    }

    componentDidUpdate(){

      // alert(JSON.stringify(this.context));
      if(this.context.appTheme != this.state.appTheme){
        this.setState({
          appTheme : this.context.appTheme
        })
      }
    }

    _renderItem = (item1,theme,context) => {
      // const theme = "";
      const { item, index } = item1;
      // const setAppTheme = this.context.setAppTheme;
      console.log("item : ",context);
        return (
          <View style={{
              backgroundColor:'black',
              height: Dimensions.get('screen').height - 122,
               }}>
            <View style={{height:Dimensions.get('screen').height/1.9,width:'100%',padding:theme == "dark" ? 70 : 0}}>
            {index!=1 ? <LottieView source={item.text} ref={index} loop={index == 0 ? false : true} autoPlay resizeMode='cover' />
            :<TouchableOpacity onPress={()=>{
              console.log(this.context);
              context.setAppTheme();
              // alert(JSON.stringify(this))
              // setAppTheme;
            }} style={{flex:1}} >
            <LottieView source={theme == "dark" ? Images.moon : Images.sun} ref={index} loop={true} autoPlay resizeMode='cover' />
            </TouchableOpacity>}
            {}
</  View>
{/* {index == 0 && <Image source={require('./android/app/src/main/assets/ic_launcher.png')} style={{alignSelf:'center'}} />} */}
            <Text style={{color:'white', textAlign:"center", fontSize:index > 3 ? 20 : 25, padding:20}}>{item.title}</Text>
            {index==1 && <Text style={{color:'white', textAlign:"center", fontSize:30, padding:20, letterSpacing: 10}}>{theme.toUpperCase()}</Text>} 
          </View>

        )
    }

    storeData = async () => {
        try {
          await AsyncStorage.setItem('appOpened', "true");
          this.props.navigation.navigate("MainScreen")

        } catch (e) {
            console.log("error : ",e);
          // saving error
        }
      }
// 
    render() {
        // console.log("this inputs : ",this.inputs);
        const { navigation } = this.props;
        console.log("Context 123 : ", this.context);

        return (
        //   <SafeAreaView style={{flex: 1, backgroundColor:'rebeccapurple', paddingTop: 50, }}>
            <View style={{ flex: 1, flexDirection:'column', justifyContent: 'center', backgroundColor:'black'}}>
                <Carousel
                
                  layout={"stack"}
                  ref={ref => {
                    this.inputs = ref}}
                  data={this.state.carouselItems}
                  sliderWidth={ Dimensions.get('screen').width}
                  itemWidth={400}
                  renderItem={(item, index) => {
                    console.log("AAAA : ",index, item);
                    return this._renderItem(item,this.context.appTheme, this.context);
                  }}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',backgroundColor:'black',paddingTop:0}}>
             <Pagination                  
            //  tappableDots={true}
            carouselRef={this.inputs}
              dotsLength={this.state.carouselItems.length}
              activeDotIndex={this.state.activeIndex}
              containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
              dotStyle={{
                  width: 30,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  backgroundColor: this.state.activeIndex == 0 ? '#7F5283' : this.state.activeIndex == 1 ? 'red' : this.state.activeIndex == 2 ? 'orange' : this.state.activeIndex == 3 ? 'green' :  '#1363DF' 
              }}
              inactiveDotStyle={{
                width: 25,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                backgroundColor:'grey',
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            /> 
            <TouchableOpacity  style={{backgroundColor:this.state.activeIndex == 5 ? '#1363DF' : 'transparent', justifyContent:'center',alignItems:'center',flex:1,alignContent:'center',borderBottomLeftRadius:this.state.activeIndex != 5 ? 0 : 40,borderTopLeftRadius:this.state.activeIndex != 5 ? 0 : 40,flexWrap:'wrap',flexShrink:1}} onPress={()=>{
                if(this.state.activeIndex != 5){
                    this.setState({
                        activeIndex : this.state.activeIndex +1
                    });
                    this.inputs.snapToItem(this.state.activeIndex+1);
                    // this.carousel.currentIndex = this.state.activeIndex
                } else {
                    // alert("hello");
                    this.storeData();
                            // navigation.navigate("MainScreen")

                }
            }}>
                <Text  style={{textAlign:'center',alignSelf:'center',fontSize:20,fontWeight:'bold',color:'white',letterSpacing: this.state.activeIndex != 5 ? 10 : 2}}>{this.state.activeIndex != 5 ? "Next" : "Lets Go"}</Text>
            </TouchableOpacity>
            </View>
            </View>
        //   </SafeAreaView>
        );
    }
}