import React from "react";
import { TouchableOpacity,StyleSheet, View, Text } from "react-native";
import { fontFamily } from "../../constants/font";
import { screenWidth } from "../../constants/Sizes.constant";
import { StyleConstants } from "../../constants/Style.constant";
import { ColorsConstant } from "../../constants/Colors.constant";


function SmallBtn(props) {
    const { label, onPress, backgroundColor,textAlign } = props
    return (
        <View>
            <TouchableOpacity style={[StyleConstants.bottunth, {backgroundColor:backgroundColor?backgroundColor:c.btnColor, width: screenWidth / 2-20 }]} onPress={onPress}>
                <Text style={[StyleConstants.textsigup, { fontFamily: fontFamily.medium, textAlign: "center" }]}>{label}</Text>
            </TouchableOpacity>
        </View>
    )
}
const c=ColorsConstant, styles=StyleSheet.create({

})
export default SmallBtn;