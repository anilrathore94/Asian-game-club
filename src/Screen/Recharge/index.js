import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { StyleConstants } from "../../constants/Style.constant";
import { ColorsConstant } from "../../constants/Colors.constant";
import Header from "../../Widget/Header";
import LargefillBtn from "../../component/Button/LargefillBtn";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiCall } from '../../services/AppSetting';
import Toast from "react-native-toast-message";
import RazorpayCheckout from 'react-native-razorpay';
import { fontFamily } from "../../constants/font";

function Recharge(props) {
    const [selact, setselact] = useState(0)
    const _goBack = () => {
        return props.navigation.navigate('Tabs', { screen: 'Account' })
    };
    const [activeTabIndex, setActiveTabIndex] = useState("");
    const [amount, setamount] = useState("")
    const [animating, setAnimating] = useState(false);
    const [getUserData, setGetUserData] = useState('');
    const [data, setData] = useState([
        { id: 1, tittle: '300', },
        { id: 2, tittle: '400', },
        { id: 3, tittle: '500', },
        { id: 4, tittle: '600', },
        { id: 5, tittle: '700', },
        { id: 6, tittle: '800', },

    ]);
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
    const onclickRecharge = () => {
        let err = false, errMsg = ''
        if (amount == '') {
            err = true
            errMsg = "Please Enter Amount"
        }  else if (amount < 300) {
            err = true
            errMsg = "Amount should be greater than Rs.300"
        }

        if (!err) {
            var options = {
                description: 'political',
                image: 'https://image.flaticon.com/icons/png/512/643/643091.png',
                currency: 'INR',
                key: 'rzp_test_zx08nnqnodSHSX', // Your api key
                // key: rzpKey.apiKey,
                amount: amount * 100,
                name: "Recharge",
                prefill: {
                    // email: getUserData.email,
                    contact: getUserData.phoneNumber,
                    name: getUserData.name
                },
                theme: { color: '#000' }
            };
            RazorpayCheckout.open(options).then(result => {
                Purchase(result.razorpay_payment_id);
                // alert('sdf')
            }).catch((e => console.log(e)))
        } else {
            Toast.show({ type: 'error', text1: errMsg });
            setAnimating(false)
        }
    }

    const Purchase = async (value) => {
        let UserId = await AsyncStorage.getItem('userid')
        let url = 'wallet_update.php'
        let request = {
            // txtId: value,
            id: UserId,
            wallet_amount: amount,
            razorpayId: value
        };
        setAnimating(true)
        let result = await apiCall(url, request);
        console.log('request', request)
        if (result.status == 200) {
            Toast.show({ type: "success", text1: result.message });
            getprofile()
            props.navigation.navigate('Tabs', { screen: 'Home' })
            setAnimating(false);
        } else {
            Toast.show({ type: "error", text1: result.message });
            setAnimating(false)
        }
    }
    return (
        <>
            <Header leftButtonType={"back"} title="Recharge" leftButtonAction={_goBack} animating={animating} setAnimating={setAnimating} />
            <View style={[s.container, { paddingHorizontal: 10 }]} >
                <ScrollView showsVerticalScrollIndicator={false} >
                    <Text style={[s.TextBold, { marginTop: 20 }]}>
                        Available Balance : {getUserData.wallet}
                    </Text>
                    <TextInput style={[styles.inputstyle, { marginTop: 20 }]}
                        placeholder="Enter amount"
                        onChangeText={(e) => setamount(e)}
                        keyboardType='number-pad'
                        placeholderTextColor={c.gary}
                        value={amount}
                    />
                    <View>
                        <FlatList
                            numColumns={3}
                            data={data}
                            renderItem={({ item, index }) => (
                                <View key={index} style={styles.manviw}>
                                    <TouchableOpacity onPress={() => { setActiveTabIndex(index), setamount(item.tittle) }}
                                        style={[styles.botton, { backgroundColor: activeTabIndex == index ? c.btnColor : c.White }]} >
                                        <Text style={[styles.simpeltext, { color: activeTabIndex == index ? c.White : c.Black }]}>{item.tittle}</Text>
                                    </TouchableOpacity>

                                </View>

                            )}
                        />

                    </View>
                    <View style={styles.manviw}>
                        <Text style={styles.textsty}>UPI</Text>
                    </View>
                    <Text style={{ marginTop: 16, color: 'red', fontSize: 20 }}> Note : </Text>
                    <Text style={[styles.textsty, { marginTop: 12 }]}> * Minimum Recharge : 300 Rs </Text>
                    <Text style={styles.textsty}>* Maximum Recharge : No limit</Text>
                    <View style={{ marginTop: 16 }}>
                        <LargefillBtn label="Rechage" onPress={() => onclickRecharge()} />
                    </View>
                </ScrollView>
            </View>
        </>
    )
}
const s = StyleConstants, c = ColorsConstant, styles = StyleSheet.create({
    text: {
        fontSize: 24
    },
    manviw: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginRight: 8,
    },
    seView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10

    },
    botton: {
        width: 107,
        height: 50,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    simpeltext: {
        fontSize: 18,
        color: c.White
    },
    inputstyle: {
        borderBottomWidth: 0.5,
        color: c.White,
        borderColor: c.White,

    },
    textsty: {
        color: c.White,
        fontSize: 14,
        fontFamily: fontFamily.medium
    }
})
export default Recharge;