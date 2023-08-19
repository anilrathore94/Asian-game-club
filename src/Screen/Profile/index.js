import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import LargefillBtn from "../../component/Button/LargefillBtn";
import Lineoutline from "../../component/Button/Lineoutline";
import Textfs12 from "../../component/TextCom/Textfs12";
import { ColorsConstant } from "../../constants/Colors.constant";
import { fontFamily } from "../../constants/font";
import { StyleConstants } from "../../constants/Style.constant";
import Header from "../../Widget/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiCall } from "../../services/AppSetting";
import Toast from "react-native-toast-message";

function Profile(props) {
    const _goBack = () => {
        return props.navigation.navigate('Tabs', { screen: 'Account' })
    };
    const [animating, setAnimating] = useState(false);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [clientid, setClientid] = useState('');
    const [getUserData, setGetUserData] = useState('')
    useEffect(() => {
        getprofile()
        // AsyncStorage.getItem('userid').then((value) => {
        //     getprofile(value)
        // })
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
                setName(result.data[0].name)
                setPhoneNumber(result.data[0].phoneNumber)
                setGetUserData(result.data[0])
                console.log('---------getUserData---', getUserData.clientId)

                setAnimating(false)
            } else {
                Toast.show({ type: "error", text1: result.message });
                setAnimating(false)
            }
        } catch (error) {
            console.log('error', error)
        }
    }
    const onclick = async () => {
        let UserId = await AsyncStorage.getItem('userid')
        try {
            let url = "updateprofile.php"
            let request = {
                id: UserId,
                name: name
            }
            setAnimating(true)
            let result = await apiCall(url, request);

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
    }

    return (
        <>
            <Header leftButtonType={"back"} title="Profile" leftButtonAction={_goBack} animating={animating} setAnimating={setAnimating} />
            <View style={[s.container, { paddingHorizontal: 0 }]} >
                <View style={styles.manView} >
                    <Text style={styles.textcard} >Wallet Amount</Text>
                    <Text style={styles.textcard} >Rs {getUserData.wallet}</Text>
                    <Text style={styles.textcard} >Client Id</Text>
                    <Text style={[styles.textcard, { fontSize: 14, fontFamily: fontFamily.medium }]} >{getUserData.clientId}</Text>
                </View>
                <View style={{ paddingHorizontal: 16 }} >
                    <TextInput style={styles.inputstyle}
                        placeholder="Enter Name"
                        value={name}
                        onChangeText={(e) => setName(e)}
                        
                    />
                    {
                        phoneNumber == "" ?
                            <TextInput style={styles.inputstyle}
                                placeholder="Enter Number"
                                defaultValue={phoneNumber}
                                onChangeText={(e) => setPhoneNumber(e)}
                            /> :
                            <View style={styles.inputstyle}>
                                <Text style={[{ color: c.White, fontSize: 14, fontFamily: fontFamily.Regular }]}>{phoneNumber}</Text>
                            </View>

                    }

                    <LargefillBtn label="Update" onPress={onclick} />
                    {/* <Lineoutline label="Change Password" onPress={onclick} /> */}
                </View>
            </View>
        </>
    )
}
const s = StyleConstants, c = ColorsConstant, styles = StyleSheet.create({
    manView: {
        // height: 200,
        backgroundColor: c.hadercolor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30
    },
    textcard: {
        color: c.White,
        fontSize: 18,
        fontFamily: fontFamily.bold,

    },
    inputstyle: {
        borderBottomWidth: 1,
        borderColor:c.gary,
        marginBottom: 16,
        color:c.White
    }
})
export default Profile