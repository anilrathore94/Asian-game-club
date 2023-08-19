import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import Header from '../../Widget/Header';
import { StyleConstants } from "../../constants/Style.constant";
import { ColorsConstant } from '../../constants/Colors.constant';
import TextBold from '../../component/TextCom/TextBold';
import Textfs12 from '../../component/TextCom/Textfs12';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiCall } from '../../services/AppSetting';
import Toast from "react-native-toast-message";

const Withdrawal = (props) => {
    const [selact, setselact] = useState(0)
    const _goBack = () => {
        return props.navigation.navigate('Tabs', { screen: 'Account' })
    };
    const [animating, setAnimating] = useState(false);
    const [getUserData, setGetUserData] = useState('')
    const [activeTabIndex, setActiveTabIndex] = useState("");
    const [activeCard, setActiveCard] = useState(false)
    const [amount, setAmount] = useState("250")
    const [data, setData] = useState([
        { id: 1, tittle: '400', },
        { id: 2, tittle: '500', },
        { id: 3, tittle: '1500', },
        { id: 4, tittle: '2500', },
        { id: 5, tittle: '5000', },
        { id: 6, tittle: '8000', },
        { id: 7, tittle: '15000', },
        { id: 8, tittle: '25000', },
        { id: 9, tittle: '50000', },


    ])

    useEffect(() => {
        getprofile();
        getBankCard();
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
    const onclick = async () => {
        let UserId = await AsyncStorage.getItem('userid')
        try {
            let url = "withdrawal.php"
            let request = {
                userId: UserId,
                amount: amount
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
    }
    const getBankCard = async (value) => {
        let UserId = await AsyncStorage.getItem('userid')
        try {
            let url = "bankdetails.php"
            let request = {
                userId: UserId
            }
            setAnimating(true)
            let result = await apiCall(url, request);
            if (result.status == 200) {
                setActiveCard(true)
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
    return (
        <>
            <Header leftButtonType={"back"} title="Withdrawal" leftButtonAction={_goBack} animating={animating} setAnimating={setAnimating} />

            <ScrollView style={[s.container, { paddingHorizontal: 0 }]}>
                <View style={styles.cantenear}>
                    <Text style={{ color: c.White }} >
                        Bank card
                    </Text>
                    {
                        activeCard == true ?
                                <TouchableOpacity onPress={()=> props.navigation.navigate('BankDetails') } style={styles.flexveiw}>
                                    <Text style={{ color: c.White }}>
                                    Active Card</Text>
                                    <Image style={{ tintColor: c.White }} source={require('../../asstes/images/rightarow.png')} />

                                </TouchableOpacity>
                             :
                            <View style={styles.flexveiw}>
                                <Text style={{ color: c.White }}>
                                    No bank card selected</Text>

                            </View>
                    }
                
                </View>
                <View style={styles.blance}>
                    <TextBold title={` My Balance : ₹ ${getUserData.wallet}`} color={c.White}>
                    </TextBold>
                </View>
                <View style={{ paddingHorizontal: 13 }}>
                    <View>
                        <FlatList
                            numColumns={3}
                            data={data}
                            renderItem={({ item, index }) => (
                                <View key={index} style={styles.manviw}>
                                    <TouchableOpacity onPress={() => { setActiveTabIndex(index), setAmount(item.tittle) }}
                                        style={[styles.botton, { backgroundColor: activeTabIndex == index ? c.btnColor : c.White }]} >
                                        <Text style={[styles.simpeltext, { color: activeTabIndex == index ? c.White : c.Black }]}>{item.tittle}</Text>
                                    </TouchableOpacity>

                                </View>
                            )}
                        />
                    </View>
                    <View style={{ marginTop: 12 }}>
                        <TextBold title={`Withdrawal fee : ₹ ${amount}`} color={c.White} />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 16 }}>
                        <Image style={[s.icon, { tintColor: c.White }]}
                            source={require('../../asstes/images/sbi.png')} />
                        <Textfs12 color={c.White} title="  Max-value of single withdrawal : ₹  50000/-">

                        </Textfs12>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 16 }}>
                        <Image style={[s.icon, { tintColor: c.White }]}
                            source={require('../../asstes/images/sbi.png')} />
                        <Textfs12 color={c.White} title="  Max-value of single withdrawal : ₹ 400/-">
                        </Textfs12>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 16 }}>
                        <Image style={[s.icon, { tintColor: c.White }]}
                            source={require('../../asstes/images/sbi.png')} />
                        <Textfs12 color={c.White} title=" Withdrawal in the amount of charges between ₹ 400 to ₹ 1500 fee ₹ 45 ">
                        </Textfs12>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 16 }}>
                        <Image style={[s.icon, { tintColor: c.White }]}
                            source={require('../../asstes/images/sbi.png')} />
                        <Textfs12 color={c.White} title=" Withdrawal in the amount of charges between ₹ 2500 to ₹50000 fee is 3% ">
                        </Textfs12>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 16 }}>
                        <Image style={[s.icon, { tintColor: c.White }]}
                            source={require('../../asstes/images/sbi.png')} />
                        <Textfs12 color={c.White} title="  Monday to Sunday 10:00 - 17:00 ">
                        </Textfs12>
                    </View>
                </View>
                <TouchableOpacity onPress={() => onclick()} style={styles.battonlarg}>
                    <Text style={styles.textb}>
                        Withdrawal
                    </Text>
                </TouchableOpacity>
            </ScrollView>

        </>
    );
};
const s = StyleConstants, c = ColorsConstant, styles = StyleSheet.create({
    cantenear: {
        width: screenWidth,
        backgroundColor: c.hadercolor,
        height: screenHeight / 6,
        padding: 20
    },
    text: {
        fontSize: 24
    },
    flexveiw: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12
    },
    blance: {
        backgroundColor: c.DarkLight,
        width: screenWidth,
        height: screenHeight / 20,
        paddingHorizontal: 20
    },
    botton: {
        width: 102,
        height: 50,
        // borderColor: 'green',
        borderWidth: 1,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12


    },
    simpeltext: {
        fontSize: 18,
        color: c.White
    },
    manviw: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,

    },
    battonlarg: {
        backgroundColor: c.btnColor,
        height: 46,
        width: screenWidth, marginVertical: 20,
        justifyContent: 'center'

    },
    textb: {
        fontSize: 25,
        color: c.White,
        textAlign: 'center'
    }

})

export default Withdrawal;
