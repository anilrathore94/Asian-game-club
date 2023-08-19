import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import Header from '../../Widget/Header';
import { StyleConstants } from "../../constants/Style.constant";
import { ColorsConstant } from '../../constants/Colors.constant';
import LargefillBtn from '../../component/Button/LargefillBtn';
import { fontFamily } from '../../constants/font';

const ApplyCommission = (props) => {
    const [selact, setselact] = useState(0)
    const _goBack = () => {
        return props.navigation.navigate('Tabs', { screen: 'Account' })
    };
    const onclickLogin = () => {

    }

    return (
        <>
            <Header leftButtonType={"back"} title="Apply Commission" leftButtonAction={_goBack} />
            <View style={styles.cantenear}>
                <Text style={styles.textsty} >My Commission Amount</Text>
                <View style={styles.flexveiw}>
                    {/* <Image source={require('../../asstes/images/rupess.png')} style={{height:30,width:30}} /> */}
                    <Text style={[styles.textsty,{marginLeft:10 }]}> ₹ Rs.0.00</Text>
                </View>
            </View>
            <View style={s.container}>
                <TextInput style={styles.inputstyle}
                    placeholder="Enter Amount"
                    keyboardType='number-pad'
                    placeholderTextColor={c.gary}
                />
                <Text style={{ color: c.White }}> Minimum apply commission is now ₹ 10</Text>
                <View style={{ alignItems: 'center', marginTop: 10 }} >
                    <LargefillBtn label={"Proceed"} onPress={onclickLogin} />
                </View>

            </View>

        </>
    );
};
const s = StyleConstants, c = ColorsConstant, styles = StyleSheet.create({
    cantenear: {
        width: screenWidth,
        backgroundColor: c.hadercolor,
        height: screenHeight / 6,
        padding: 20,
        alignItems:'center',
        justifyContent:'center'
    },
    flexveiw: {
        flexDirection: 'row',
    },
    inputstyle: {
        borderBottomWidth: 0.5,
        marginBottom: 16,
        color:c.White,
        borderColor:c.White
    },
    textsty:{
        color: c.White,
        fontSize:18,
        fontFamily:fontFamily.bold 
    }

})

export default ApplyCommission;
