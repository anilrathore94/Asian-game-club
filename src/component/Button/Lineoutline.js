import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { ColorsConstant } from "../../constants/Colors.constant";
import { fontFamily } from "../../constants/font";
import { screenWidth } from "../../constants/Sizes.constant";
import { StyleConstants } from "../../constants/Style.constant";


function Lineoutline(props) {
    const { label, onPress,textAlign } = props
    return (
        <View>
            <TouchableOpacity style={styles.bottunth} onPress={()=> onPress()}>
                <Text style={[StyleConstants.textsigup,{fontFamily:fontFamily.medium,textAlign:"center",color:ColorsConstant.success}]}>{label}</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles=StyleSheet.create({
    bottunth: {
        // backgroundColor: ColorsConstant.btnColor,
        borderWidth:0.8,
        borderColor:ColorsConstant.success,
        borderRadius: 8,
        height: 40,
        justifyContent: 'center',
        width: screenWidth -32,
        marginBottom:16
        // flex:1
    },
})
export default Lineoutline;