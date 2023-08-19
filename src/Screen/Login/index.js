import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Keyboard, ActivityIndicator, Platform, PermissionsAndroid } from "react-native";
import { ColorsConstant } from "../../constants/Colors.constant";
import { StyleConstants } from "../../constants/Style.constant";
import TextinputComman from "../../component/Input/LargeTextInput";
import LargefillBtn from '../../component/Button/LargefillBtn';
import { screenHeight, screenWidth } from "../../constants/Sizes.constant";
import TextBold from "../../component/TextCom/TextBold";
import Textfs12 from "../../component/TextCom/Textfs12";
import Modals from "../../component/Modal";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import RNOtpVerify from 'react-native-otp-verify';
import SmallBtn from "../../component/Button/SmallBtn";
import { apiCall, apiImageUpload } from "../../services/AppSetting";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";


const CELL_COUNT = 6;
function Login(props) {
    const [phone, setPhone] = useState("");
    const [value, setValue] = useState('');
    const [animating, setAnimating] = useState(false)
    const [errPhone, setErrPhone] = useState('');
    const [modalVisible, setModalVisible] = useState(false)
    const [otp, setOpt] = useState('')
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [call, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    useEffect(() => {
        RNOtpVerify.getHash()
            .then(console.log)
            .catch(console.log);

        RNOtpVerify.getOtp()
            .then(p => RNOtpVerify.addListener(otpHandler))
            .catch(p => console.log("====",));
        RNOtpVerify.removeListener();
        Keyboard.dismiss();
        requestLocationPermission();
        // const timer = setInterval(() => {
        //     var date = moment().utcOffset("0").format(" hh:mm:ss");
        //   setTime(date);
        // }, 1000);

        // return () => {
        //   clearInterval(timer);
        // };
    }, []);
    const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Access Required',
                        message: 'This App needs to Access your location',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                } else {
                    // setLocationStatus('Permission Denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }

    };
    const onclickLogin = async () => {
        var err = false;
        if (phone == '') {
            setErrPhone('please enter mobile number');
            err = true;
        }
        // } else {
        //     setModalVisible(true)
        // }
        if (!err) {
            try {
                let url = "otpsend.php"
                let request = {
                    phoneNumber: phone,
                }
                setAnimating(true)
                let result = await apiCall(url, request);
                console.log('---------login---', result.data)
                if (result.status == 200) {
                    setModalVisible(true)
                    setValue(result.data)
                    Toast.show({ type: "success", text1: result.message });
                    setAnimating(false)
                } else {
                    Toast.show({ type: "error", text1: result.message });
                    setAnimating(false)
                }
            } catch (error) {
                console.log('error', error)
            }
        }
        return err;

    }
    const onclicksendOtp = async () => {
        try {
            let url = "otpverify.php"
            let request = {
                phoneNumber: phone,
            }
            setAnimating(true)
            let result = await apiCall(url, request);
            console.log('---------otpverify---', result.data.userId)
            if (result.status == 200) {
                setModalVisible(true)
                setValue(result.data.toString())
                AsyncStorage.setItem('userid', result.data.userId);
                Toast.show({ type: "success", text1: result.message });
                setAnimating(false)
                setModalVisible(!modalVisible)
                props.navigation.navigate('Tabs')
            } else {
                Toast.show({ type: "error", text1: result.message });
                setAnimating(false)
            }
        } catch (error) {
            console.log('error', error)
        }
    }
    return (
        <View style={s.container} >
            <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} >
                <View style={{ height: screenHeight / 3, alignItems: 'center', justifyContent: 'center' }}>
                    <TextBold title="Login" />
                    <Textfs12 color={c.White}  title="Welcome Lion Club Color Prediction Game" />
                    {/* <Image source={Images['logo']} resizeMode='contain' style={{ width: 200, height: 200 }} /> */}
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

                <LargefillBtn label={"Login/signup"} onPress={onclickLogin} />
                {/* <View style={{ alignItems: "center" }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Text>New Member ? </Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Register')} >
                            <Text style={{ color: c.success }} >Register Now</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
            </ScrollView>
            <Modals
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                ViewDesing={
                    <View style={{ alignItems: 'center' }} >
                        <TextBold title="OTP Verification" />
                        <Textfs12 textAlign="center" title="Please enter the 6 digit verification code we just sent you on your device" />
                        <CodeField
                            ref={ref}
                            {...props}
                            value={value}
                            onChangeText={setValue}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.codeFiledRoot}
                            keyboardType="number-pad"
                            // textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <Text
                                    key={index}
                                    style={[styles.cell, isFocused && styles.focusCell]}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            )}
                        />
                        <SmallBtn label="Submit" onPress={() => onclicksendOtp()} />
                    </View>
                }
            />
            {animating &&
                <View style={styles.activityIndicator} >
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: ColorsConstant.White, padding: 10, width: screenWidth - 40, borderRadius: 10 }}>
                        <ActivityIndicator
                            animating={animating}
                            color="red"
                            size="small" />
                        <Text style={{ fontSize: 20, color: ColorsConstant.Black }}>Loading....</Text>
                    </View>
                </View>
            }
        </View>
    )
}
const s = StyleConstants, c = ColorsConstant, styles = StyleSheet.create({
    activityIndicator: {
        backgroundColor: ColorsConstant.DarkLight,
        alignItems: 'center',
        justifyContent: "center",
        position: 'absolute',
        zIndex: 9999,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 0.3,
        borderRadius: 3,
        marginLeft: 5,
        borderColor: ColorsConstant.Hashcolortheme,
        textAlign: 'center',
        marginVertical: 10
    },
    focusCell: {
        borderColor: 'blue'
    },
})
export default Login