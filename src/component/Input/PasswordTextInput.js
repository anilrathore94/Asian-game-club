import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import { ColorsConstant } from "../../constants/Colors.constant";
import { fontFamily } from "../../constants/font";
import Images from "../../constants/Images";
import { StyleConstants } from "../../constants/Style.constant";


function PasswordTextInput(props) {
    const { placeholder, onChangeText, value, keyboardType, returnKeyType,
        onSubmitEditing, onBlur, onPressIn, showError = true, error,label } = props
    const [toggle, setToggle] = useState(false)
    const [secure, setSecure] = useState(true)
    const onclick = () => {
        setSecure(!secure)
        setToggle(!toggle)
    }
    return (
        <>
        <Text style={{color:ColorsConstant.Black,marginBottom:5}}>{label}</Text>
            <View style={[StyleConstants.Textinput, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 0, }]}>
                <TextInput style={{ flex: 1, }}
                    placeholder={placeholder}
                    color={ColorsConstant.bluedark}
                    keyboardType={keyboardType}
                    placeholderTextColor={ColorsConstant.gary}
                    onChangeText={(e) => onChangeText(e)}
                    onSubmitEditing={() => onSubmitEditing}
                    returnKeyType={returnKeyType}
                    secureTextEntry={secure}
                    value={value}
                    maxLength={16}
                    onBlur={onBlur}
                    onPressIn={onPressIn}
                />
                <TouchableOpacity onPress={() => onclick()}>
                    <Image source={toggle ? Images.eyeon : Images.eyeoff} resizeMode='contain' style={{ height: 20, width: 20, tintColor: ColorsConstant.bluedark }} />
                </TouchableOpacity>
            </View>
             {
                error != "" && 
                <Text style={StyleConstants.errText}>{error}</Text>
            }
        </>
    );
}
export default PasswordTextInput;