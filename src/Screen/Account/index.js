import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, Share } from "react-native";
import { ColorsConstant } from "../../constants/Colors.constant";
import { fontFamily } from "../../constants/font";
import { screenWidth } from "../../constants/Sizes.constant";
import { StyleConstants } from "../../constants/Style.constant";
import Header from "../../Widget/Header";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Account(props) {
    const [activeTabs, setActiveTabs] = useState('Diamond');
    const [images, setImages] = useState(false);
    const [accountDetalis, setAccountDetalis] = useState(false);
    const [withdrawls, setWithdrawls] = useState(false);
    const [imageswithdr, setImageswithdr] = useState("");
    const [selectindex, setSelectindex] = useState('');

    const dataList = [
        { id: 1, images: "user", title: 'Profile', routes: 'Profile' },
        { id: 2, images: "menufold", title: 'Recharge', routes: 'Recharges' },
        { id: 3, images: "swap", title: 'Withdrawal', routes: "Withdrawal" },
        { id: 4, images: "wallet", title: 'Transaction', routes: 'Transaction' },
        // { id: 5, images: "adduser", title: 'Promotion', routes: 'Promotion' },
        { id: 6, images: "idcard", title: 'Fund Transfer', routes: 'Fund_Transfer' },
        { id: 7, images: "creditcard", title: 'Bank Card', routes: 'BankDetails' },
        { id: 8, images: "notification", title: 'Invite', routes: 'Share' },
        { id: 9, images: "addfile", title: 'About us',routes:'About' },
        // { id: 10, images: "bars", title: 'Terms & Condition' },
        { id: 11, images: "copyright", title: 'Privacy Policy',routes:'PrivacyPolicy' },
        // { id: 12, images: "contacts", title: 'Contact' },
        { id: 13, images: "poweroff", title: 'Sign Out', routes: 'dataCLear' },
    ];
    const listAction = (routes, index) => {
        setSelectindex(index);
        if (routes == "dataCLear") {
            LogOutbtn()
        } else if (routes == "Recharges") {
            setAccountDetalis(!accountDetalis);
            setImages(!images);
        } else if (routes == "Promotion") {
            setWithdrawls(!withdrawls);
            setImageswithdr(!imageswithdr)
        } else if (routes == "Withdrawal") {
            setWithdrawls(!withdrawls);
            setImageswithdr(!imageswithdr)
        } else if (routes == "Fund_Transfer") {
            setWithdrawls(!withdrawls);
            setImageswithdr(!imageswithdr)
        } else if (routes == 'Share') {
            onShare()
        } else {
            props.navigation.navigate(routes)
        }
    }
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: "ygeftpNK",
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            alert(error.message);
        }
    };
    const LogOutbtn = () => {
        AsyncStorage.clear()
        props.navigation.navigate('Login', { backScreen: 'Splash' })
    }
    return (
        <>
            <Header leftButttonType={"noIcon"} title="Account" />
            <View style={s.container} >
                <FlatList
                    data={dataList}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View key={index} style={styles.itemView}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => listAction(item.routes, index)}  >
                                <AntDesign
                                    name={item.images}
                                    color={ColorsConstant.White}
                                    style={{ marginRight: 10 }}
                                    size={20} />
                                <Text style={styles.textitem} >{item.title}</Text>

                            </TouchableOpacity>
                            {
                                // activeTabs == "Recharges" && index == 1 &&
                                accountDetalis != '' && selectindex == index && item.id == 2 &&
                                <View style={{ marginLeft: 25, marginTop: 16 }} >
                                    <TouchableOpacity onPress={() => props.navigation.navigate('Recharge')} >
                                        <Text style={styles.textitem} >{"Recharge"}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('RechargeRecord')} style={{ marginTop: 16 }} >
                                        <Text style={styles.textitem} >{"Recharge Record"}</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            {
                                withdrawls != '' && selectindex == index && item.id == 3 &&
                                <View style={{ marginLeft: 25, marginTop: 16 }} >
                                    <TouchableOpacity onPress={() => props.navigation.navigate('Withdrawal')}>
                                        <Text style={styles.textitem} >{"Withdrawal"}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginTop: 16 }} onPress={() => props.navigation.navigate('WithdrawalRecord')}>
                                        <Text style={styles.textitem} >{"Withdrawal Record"}</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            {
                                withdrawls != '' && selectindex == index && item.id == 5 &&
                                <View style={{ marginLeft: 25, marginTop: 16 }} >
                                    <TouchableOpacity onPress={ () => props.navigation.navigate('Promotion')}>
                                        <Text style={styles.textitem} >{"Promotion"}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={ () => props.navigation.navigate('PromotionList')} style={{ marginTop: 16 }} >
                                        <Text style={styles.textitem} >{"Promotion List"}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={ () => props.navigation.navigate('ApplyCommission')} style={{ marginTop: 16 }} >
                                        <Text style={styles.textitem} >{"Apply Commission"}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={ () => props.navigation.navigate('CommissionRecord')} style={{ marginTop: 16 }} >
                                        <Text style={styles.textitem} >{"Commission Record"}</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            {
                                withdrawls != '' && selectindex == index && item.id == 6 &&
                                <View style={{ marginLeft: 25, marginTop: 16 }} >
                                    <TouchableOpacity onPress={ () => props.navigation.navigate('FundTransfer')}>
                                        <Text style={styles.textitem} >{"Fund Transfer"}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={ () => props.navigation.navigate('FundHistory')} style={{ marginTop: 16 }} >
                                        <Text style={styles.textitem} >{"Fund Transfer History"}</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    )}
                />
            </View>
        </>
    )
}
const s = StyleConstants, c = ColorsConstant, styles = StyleSheet.create({
    itemView: {
        padding: 8,
        marginTop: 10,
        width: screenWidth - 36,
        margin: 5,
        borderRadius: 5,
        backgroundColor: c.hadercolor
    },
    textitem: {
        color: c.White,
        fontSize: 14,
        fontFamily: fontFamily.medium
    }
})
export default Account;