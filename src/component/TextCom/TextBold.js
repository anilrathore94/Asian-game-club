import React from "react";
import { View,Text ,StyleSheet } from "react-native";
import { ColorsConstant } from "../../constants/Colors.constant";
import { fontFamily } from "../../constants/font";
function TextBold (props) {
    const {title,color } = props
    return(
        <View>
            <Text style={[styles.textsty,{color:color?color:c.White}]}>{title}</Text>
        </View>
    )
}
const c=ColorsConstant, styles=StyleSheet.create({
    textsty:{
        fontSize:22,
        color:ColorsConstant.success,
        fontFamily:fontFamily.medium
        

    }

})

export default TextBold;