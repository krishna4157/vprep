import React, { Component } from 'react';

import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';

export default function CustomRadioButtonForAnswers({colors,selectedOptionIndex,index,option,onSelect,showWrongIcon,value,radioButtonColor,optionSelectColor,wrongAnsIcon,getRightIconIndex,showCorrectIcon,correctAnsIcon}) {
  console.log(selectedOptionIndex == index);

    return (
      <TouchableOpacity disabled style={{padding:2}} activeOpacity={0.5} >
        <View style={{borderRadius:25,borderColor:'grey',flexDirection:'row',padding:5,
        backgroundColor: value == index ? "green" : selectedOptionIndex == index  ? optionSelectColor : colors.tertiary,shadowColor: 'blue',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.26,

    // add shadows for Android only
    // No options for shadow color, shadow offset, shadow opacity like iOS
    elevation: 8,margin:3, width: "96%" }}>
        <View style={{justifyContent:'center',marginLeft:10}}>
        
        {value ==index && showCorrectIcon  ? 
        correctAnsIcon : selectedOptionIndex !== value && selectedOptionIndex == index ? wrongAnsIcon
       : <MaterialIcons name="radio-button-unchecked" size={15} color={radioButtonColor}  />    
    }    
    {

    }
        </View>
        <Text style={{padding:10,flexWrap:'wrap',flexShrink:1,color:colors.textColor}}>{option}</Text>
        </View>
      </TouchableOpacity>
    );
  }