import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Textfs12 from "../../component/TextCom/Textfs12";
import { ColorsConstant } from "../../constants/Colors.constant";
import { StyleConstants } from "../../constants/Style.constant";
import Header from "../../Widget/Header";
import SmallBtn from "../../component/Button/SmallBtn";
import { screenWidth } from "../../constants/Sizes.constant";
import TextinputComman from "../../component/Input/LargeTextInput";
import LargefillBtn from "../../component/Button/LargefillBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiCall } from "../../services/AppSetting";
import Toast from "react-native-toast-message";

function BankDetails(props) {
    const [animating, setAnimating] = useState(false);
    const [activeTabs, setActiveTabs] = useState("Add_Bank");
    const [holderName, setHolderName] = useState('');
    const [errHolderName, setErrHolderName] = useState('');
    const [name, setName] = useState('');
    const [errName, setErrName] = useState('');
    const [iFSC, setIFSC] = useState('');
    const [errIFSC, setErrIFSC] = useState('');
    const [accountNO, setAccountNO] = useState('');
    const [errAccountNO, setErrAccountNO] = useState('');
    const [confAccountNO, setConfAccountNO] = useState('');
    const [errConfAccountNO, setErrConfAccountNO] = useState('');
    const [mobile, setMobile] = useState('');
    const [errMobile, setErrMobile] = useState('');
    const [email, setEmail] = useState('');
    const [actualName, setActualName] = useState('');
    const [upiId, setUpiId] = useState('')
    const [mobileUpi, setMobileUpi] = useState('')
    const [emailUpi, setEmailUpi] = useState('')

    const _goBack = () => {
        return props.navigation.navigate('Tabs', { screen: 'Account' })
    };
    useEffect(() => {
        getprofile()
    }, [props]);
    const getprofile = async (value) => {
        let UserId = await AsyncStorage.getItem('userid')
        try {
            let url = "bankdetails.php"
            let request = {
                userId: UserId
            }
            setAnimating(true)
            let result = await apiCall(url, request);
            console.log('------result.data----',result)
            if (result.status == 200) {
                setHolderName(result.data.bankHolderName);
                setName(result.data.bankName)
                setIFSC(result.data.IFSC)
                setAccountNO(result.data.bankAccountNo)
                setConfAccountNO(result.data.bankAccountNo)
                setMobile(result.data.mobileNo)
                setEmail(result.data.emailID)
                setMobileUpi(result.data.mobileNo)
                setEmailUpi(result.data.emailID)
                setUpiId(result.data.UPIId)
                setActualName(result.data.actualName)
                // setGetUserData(result.data[0])
                setAnimating(false)
            } else {
                Toast.show({ type: "error", text1: result.message });
                setAnimating(false)
            }
        } catch (error) {
            console.log('error', error)
            setAnimating(false)

        }
    }
    const onclickAddBank = async () => {
        let err = false, errMsg = ''
        if (holderName == '') {
            err = true
            errMsg = "Please Enter Holder Name"
        } else if (name == '') {
            errMsg = 'please enter bank name'
            err = true;
        } else if (iFSC == '') {
            errMsg = 'please enter IFSC Code'
            err = true;
        } else if (accountNO == '') {
            errMsg = 'please enter account number'
            err = true;
        } else if (confAccountNO != accountNO) {
            errMsg = 'account number not matched!'
            err = true;
        }else if (mobile == '') {
            errMsg = 'please enter mobile number'
            err = true;
        } else if (email == '') {
            errMsg = 'please enter email id'
            err = true;
        }

        if (!err) {
            let UserId = await AsyncStorage.getItem('userid')
            try {
                let url = "userbank.php"
                let request = {
                    userId: UserId,
                    bankHolderName: holderName,
                    bankName: name,
                    IFSC: iFSC,
                    bankAccountNo: accountNO,
                    mobileNo: mobile,
                    emailID: email
                }
                setAnimating(true)
                let result = await apiCall(url, request);
                console.log('----result---', request)
                if (result.status == 200) {
                    Toast.show({ type: "success", text1: result.message });
                    setAnimating(false)
                } else {
                    Toast.show({ type: "error", text1: result.message });
                    setAnimating(false)
                }
            } catch (error) {
                console.log('error', error)
                setAnimating(false)

            }
        } else {
            Toast.show({ type: 'error', text1: errMsg });
            setAnimating(false)
        }
    }
    const onclickAddUpi = async () => {
        let err = false, errMsg = ''
        if (actualName == '') {
            err = true
            errMsg = "Please Enter actual Name"
        } else if (upiId == '') {
            errMsg = 'please enter upiId'
            err = true;
        } else if (mobileUpi == '') {
            errMsg = 'please enter Mobile Number'
            err = true;
        } else if (emailUpi == '') {
            errMsg = 'please enter email id'
            err = true;
        }
        if (!err) {
            let UserId = await AsyncStorage.getItem('userid')
            try {
                let url = "upi.php"
                let request = {
                    userId: UserId,
                    actualName: actualName,
                    UPIId: upiId,
                    mobileNo: mobileUpi,
                    emailID: emailUpi
                }
                setAnimating(true)
                let result = await apiCall(url, request);
                console.log('----result---', request)
                if (result.status == 200) {
                    Toast.show({ type: "success", text1: result.message });
                    setAnimating(false)
                } else {
                    Toast.show({ type: "error", text1: result.message });
                    setAnimating(false)
                }
            } catch (error) {
                console.log('error', error)
                setAnimating(false)

            }
        } else {
            Toast.show({ type: 'error', text1: errMsg });
            setAnimating(false)
        }
    }
    return (
        <>
            <Header leftButtonType={"back"} title="Bank Details" leftButtonAction={_goBack} animating={animating} setAnimating={setAnimating} />
            <View style={s.container} >
                <View style={[s.RowView, { marginTop: 10, width: screenWidth - 32, }]} >
                    <SmallBtn
                        onPress={() => setActiveTabs('Add_Bank')}
                        backgroundColor={activeTabs == "Add_Bank" ? c.btnColor : c.DarkLight}
                        label={'Add Bank'}
                    />
                    <SmallBtn
                        onPress={() => setActiveTabs('Add_Upi')}
                        backgroundColor={activeTabs == "Add_Upi" ? c.btnColor : c.DarkLight}
                        label={'Add UPI'}
                    />
                </View>
                <ScrollView showsVerticalScrollIndicator={false} >

                    {
                        activeTabs == "Add_Bank" &&
                        <>
                            <TextinputComman
                                label='Bank Holder Name *'
                                placeholder={"Enter Bank Holder Name * "}
                                value={holderName || ''}
                                onChangeText={(e) => { setHolderName(e), setErrHolderName('') }}
                                error={errHolderName}
                            />
                            <TextinputComman
                                label='Bank Name *'
                                placeholder={"Full Name"}
                                value={name || ''}
                                onChangeText={(e) => { setName(e), setErrName('') }}
                                error={errName}
                            />
                            <TextinputComman
                                label='IFSC *'
                                placeholder={"IFSC"}
                                value={iFSC || ''}
                                onChangeText={(e) => { setIFSC(e), setErrIFSC('') }}
                                error={errIFSC}
                            />
                            <TextinputComman
                                label='Bank Account No *'
                                placeholder={"Bank Account No"}
                                keyboardType={"number-pad"}
                                value={accountNO || ''}
                                onChangeText={(e) => { setAccountNO(e), setErrAccountNO('') }}
                                error={errAccountNO}
                            />
                            <TextinputComman
                                label='Confirm Account No *'
                                placeholder={"Confirm Account No"}
                                keyboardType={"number-pad"}
                                value={confAccountNO || ''}
                                onChangeText={(e) => { setConfAccountNO(e), setErrConfAccountNO('') }}
                                error={errConfAccountNO}
                            />
                            <TextinputComman
                                label='Mobile No *'
                                placeholder={"Mobile Number"}
                                keyboardType={"number-pad"}
                                maxLength={10}
                                value={mobile || ''}
                                onChangeText={(e) => { setMobile(e), setErrMobile('') }}
                                error={errMobile}
                            />
                            <TextinputComman
                                label='Email ID'
                                placeholder={"Email ID"}
                                keyboardType={"email-address"}
                                value={email || ''}
                                onChangeText={(e) => { setEmail(e) }}
                                error={""}
                            />
                            <LargefillBtn label={"Submit"} onPress={() => onclickAddBank()} />

                        </>
                    }
                    {
                        activeTabs == "Add_Upi" &&
                        <>
                            <TextinputComman
                                label='Actual Name *'
                                placeholder={"Full Name"}
                                value={actualName || ''}
                                onChangeText={(e) => { setActualName(e) }}
                                error={""}
                            />
                            <TextinputComman
                                label='UPI Id *'
                                placeholder={"UPI Id"}
                                value={upiId || ''}
                                onChangeText={(e) => { setUpiId(e) }}
                                error={""}
                            />
                            <TextinputComman
                                label='Mobile No *'
                                placeholder={"Mobile Number"}
                                keyboardType={"number-pad"}
                                maxLength={10}
                                value={mobileUpi || ''}
                                onChangeText={(e) => { setMobileUpi(e) }}
                                error={""}
                            />
                            <TextinputComman
                                label='Email ID'
                                placeholder={"Email ID"}
                                keyboardType={"email-address"}
                                value={emailUpi || ''}
                                onChangeText={(e) => { setEmailUpi(e) }}
                                error={""}
                            />
                            <LargefillBtn label={"Submit"} onPress={() => onclickAddUpi()} />
                        </>
                    }
                </ScrollView>

            </View>

        </>
    )
}
const s = StyleConstants, c = ColorsConstant, styles = StyleSheet.create({

})
export default BankDetails;