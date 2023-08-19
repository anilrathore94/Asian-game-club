import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Textfs12 from "../../component/TextCom/Textfs12";
import { ColorsConstant } from "../../constants/Colors.constant";
import { StyleConstants } from "../../constants/Style.constant";
import Header from "../../Widget/Header";

function Enquiry() {
    return (
        <>
            <Header leftButttonType={"noIcon"} title="Enquiry" />
            <View style={s.container} >
                <View style={{marginTop:20,alignItems:'center'}}  >
                <Textfs12 color={c.White}  title="Join Telegram Group for support." />
                <TouchableOpacity style={{marginVertical:20,backgroundColor:'#01a0d4',padding:10,borderRadius:8}} >
                    <Text style={{color:c.White}}>Join Now</Text>
                </TouchableOpacity>
                <Textfs12 color={c.White} title="Join Telegram group for suggestion/complaint." />
                <TouchableOpacity style={{marginVertical:20,backgroundColor:'#01a0d4',padding:10,borderRadius:8}} >
                <Text style={{color:c.White}}>Join Now</Text>
                </TouchableOpacity>
                </View>
            </View>

        </>
    )
}
const s = StyleConstants, c = ColorsConstant, styles = StyleSheet.create({

})
export default Enquiry;