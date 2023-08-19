import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import Header from '../../Widget/Header';
import { StyleConstants } from "../../constants/Style.constant";
import { ColorsConstant } from '../../constants/Colors.constant';
import LargefillBtn from '../../component/Button/LargefillBtn';
import { fontFamily } from '../../constants/font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiCall } from '../../services/AppSetting';
import Toast from "react-native-toast-message";

const FundTransfer = (props) => {
    const [selact, setselact] = useState(0)
    const _goBack = () => {
        return props.navigation.navigate('Tabs', { screen: 'Account' })
    };
    const [animating, setAnimating] = useState(false);
    const [getUserData, setGetUserData] = useState('');
    const [amount, setAmount] = useState('');
    const [mobile, setMobile] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        getprofile()
    }, []);
    const getprofile = async (value) => {
        let UserId = await AsyncStorage.getItem('userid')
        try {
            let url = "profile.php"
            let request = {
                id: UserId
            }
            setAnimating(true)
            let result = await apiCall(url, request);

            if (result.status == 200) {
                setGetUserData(result.data[0])

                setAnimating(false)
            } else {
                Toast.show({ type: "error", text1: result.message });
                setAnimating(false)
            }
        } catch (error) {
            console.log('error', error)
        }
    }
    const onclickLogin = async () => {
        let err = false, errMsg = ''
        if (amount == '') {
            err = true
            errMsg = "Please Enter Amount"
        } else if (mobile == '') {
            err = true
            errMsg = "Please Enter Mobile Number"
        }

        if (!err) {
            let UserId = await AsyncStorage.getItem('userid')
            try {
                let url = "fund_transfer.php"
                let request = {
                    senderUserId: UserId,
                    amount: amount,
                    receiverPhone: mobile,
                }
                setAnimating(true)
                let result = await apiCall(url, request);
                console.log('---------result---', result)
                if (result.status == 200) {
                    Toast.show({ type: "success", text1: result.message });
                    setAnimating(false)
                } else {
                    Toast.show({ type: "error", text1: result.message });
                    setAnimating(false)
                }
            } catch (error) {
                console.log('error', error)
            }
        } else {
            Toast.show({ type: 'error', text1: errMsg });
            setAnimating(false)
        }
    }


    return (
        <>
            <Header leftButtonType={"back"} title="Fund Transfer" leftButtonAction={_goBack} animating={animating} setAnimating={setAnimating} />
            <View style={styles.cantenear}>
                <Text style={styles.textsty} >Wallet Amount</Text>
                <View style={styles.flexveiw}>
                    {/* <Image source={require('../../asstes/images/rupess.png')} style={{ height: 30, width: 30 }} /> */}
                    <Text style={[styles.textsty, { marginLeft: 10 }]}> ₹ Rs.{getUserData.wallet}</Text>
                </View>
            </View>
            <View style={s.container}>
                <ScrollView showsVerticalScrollIndicator={false} >

                    <View style={{ marginTop: 20 }} />
                    <Text style={styles.textamount}>Enter Amount for Fund Transfer</Text>
                    <TextInput style={styles.inputstyle}
                        placeholder="Enter Amount"
                        keyboardType='number-pad'
                        value={amount}
                        onChangeText={(e) => setAmount(e)}
                        placeholderTextColor={c.gary}
                    />
                    <Text style={styles.textamount}>Mobile Number</Text>
                    <TextInput style={styles.inputstyle}
                        placeholder="Enter Mobile Number"
                        keyboardType='number-pad'
                        maxLength={10}
                        value={mobile}
                        onChangeText={(e) => setMobile(e)}
                        placeholderTextColor={c.gary}
                    />
                    <Text style={styles.textamount}>Description</Text>
                    <TextInput style={styles.inputstyle}
                        placeholder="Description"
                        keyboardType='default'
                        value={description}
                        onChangeText={(e) => setDescription(e)}
                        placeholderTextColor={c.gary}
                    />
                    <View style={{ alignItems: 'center', marginTop: 10 }} >
                        <LargefillBtn label={"Submit"} onPress={onclickLogin} />
                    </View>
                </ScrollView>

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
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5
    },
    flexveiw: {
        flexDirection: 'row',
    },
    inputstyle: {
        borderBottomWidth: 0.5,
        marginBottom: 16,
        height: 40, color: c.White,
        borderColor: c.White
    },
    textsty: {
        color: c.White,
        fontSize: 18,
        fontFamily: fontFamily.bold
    },
    textamount: {
        color: c.White,
        fontSize: 12,
        fontFamily: fontFamily.medium,
    }

})

export default FundTransfer;
