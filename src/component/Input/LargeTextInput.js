import React, { useRef } from "react";
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { ColorsConstant } from "../../constants/Colors.constant";
import { fontFamily } from "../../constants/font";
import { StyleConstants } from "../../constants/Style.constant";
import { screenWidth } from "../../constants/Sizes.constant";


function TextinputComman(props) {
    // const inputE2 = useRef(null);
    const { width,placeholder, onChangeText,editable, maxLength, value,label, keyboardType, returnKeyType, onSubmitEditing, ref, setRef, showError = true, error } = props
    return (
        <>
                <Text style={{color:ColorsConstant.White,marginBottom:5}}>{label}</Text>
            <View style={[StyleConstants.Textinput, {width:width?width:screenWidth-32}]}>
                <TextInput style={{ flex: 1, }}
                    placeholder={placeholder}
                    color={ColorsConstant.White}
                    keyboardType={keyboardType}
                    placeholderTextColor={ColorsConstant.gary}
                    onChangeText={(e) => onChangeText(e)}
                    returnKeyType={returnKeyType}
                    value={value}
                    autoCapitalize="none"
                    maxLength={maxLength}
                    editable={editable}
                />
            </View>
        
            {
                error != "" && 
                <Text style={StyleConstants.errText}>{error}</Text>
            }
        </>
    );
}
const styles = StyleSheet.create({

})
export default TextinputComman;