import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { fontFamily } from "../../constants/font";
import { StyleConstants } from "../../constants/Style.constant";
import { screenWidth } from "../../constants/Sizes.constant";
import { ColorsConstant } from "../../constants/Colors.constant";


function LargefillBtn(props) {
    const { label, onPress,width,backgroundColor } = props
    return (
        <View>
            <TouchableOpacity style={[StyleConstants.bottunth,{
                width:width?width:screenWidth-32,
                backgroundColor:backgroundColor?backgroundColor:ColorsConstant.btnColor
            }]} onPress={()=> onPress()}>
                <Text style={[StyleConstants.textsigup,{fontFamily:fontFamily.semiBold,textAlign:"center"}]}>{label}</Text>
            </TouchableOpacity>
        </View>
    )
}
export default LargefillBtn;