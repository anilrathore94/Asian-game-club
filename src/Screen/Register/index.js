import React, { useState } from "react";
import { View,Text,StyleSheet,TouchableOpacity,ScrollView } from "react-native";
import { StyleConstants } from "../../constants/Style.constant";
import { ColorsConstant } from "../../constants/Colors.constant";
import TextinputComman from "../../component/Input/LargeTextInput";
import LargefillBtn from "../../component/Button/LargefillBtn";
import TextBold from "../../component/TextCom/TextBold";
import Textfs12 from "../../component/TextCom/Textfs12";
import { screenHeight } from "../../constants/Sizes.constant";

function Register (props) {
    const [phone, setPhone] = useState("");
    const [value, setValue] = useState('');
    const [animating, setAnimating] = useState(false)
    const [errPhone, setErrPhone] = useState('');
    return(
        <View style={s.container} >
        <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} >
            <View style={{ height: screenHeight / 3, alignItems:'center',justifyContent:'center' }}>
                <TextBold title="Register" />
                <Textfs12 title="Welcome Lion Club Color Prediction Game" />
            </View>
            <TextinputComman
                label='Mobile Number'
                placeholder={"Enter Mobile Number "}
                value={phone || ''}
                maxLength={10}
                keyboardType={'number-pad'}
                onChangeText={(e) => { setPhone(e), setErrPhone('') }}
                error={errPhone}
            />

            <LargefillBtn label={"Login"} onPress={()=>alert('dsfg')} />
            <View style={{alignItems:"center"}} >
            <View style={{flexDirection:'row',alignItems:'center'}} >
                <Text>Already a member? </Text> 
                <TouchableOpacity  onPress={()=> props.navigation.navigate('Login') } >
                <Text style={{color:c.success}} >Login</Text>
                </TouchableOpacity>
            </View>
            </View>
        </ScrollView>
        </View>
    )
}
const s = StyleConstants, c = ColorsConstant, styles = StyleSheet.create({
})
export default Register