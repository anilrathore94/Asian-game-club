import React from "react";
import { View,Text ,StyleSheet } from "react-native";
import { ColorsConstant } from "../../constants/Colors.constant";
import { fontFamily } from "../../constants/font";
import { c } from "../../constants/Style.constant";
function Textfs12 (props) {
    const {title,textAlign,color } = props
    return(
        <View>
            <Text style={[styles.textsty,{textAlign:textAlign,color:color?color:c.Black}]}>{title}</Text>
        </View>
    )
}
const styles=StyleSheet.create({
    textsty:{
        fontSize:14,
        color:ColorsConstant.Black,
        fontFamily:fontFamily.Regular

    }

})

export default Textfs12;