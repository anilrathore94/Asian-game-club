import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image, RefreshControl } from "react-native";
import { ColorsConstant } from "../../constants/Colors.constant";
import { fontFamily } from "../../constants/font";
import { screenHeight, screenWidth } from "../../constants/Sizes.constant";
import { StyleConstants } from "../../constants/Style.constant";
import Header from "../../Widget/Header";
import TextTicker from 'react-native-text-ticker'
import Textfs12 from "../../component/TextCom/Textfs12";
import Modals from "../../component/Modal";
import LargefillBtn from "../../component/Button/LargefillBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiCall, get_url } from "../../services/AppSetting";
import Toast from "react-native-toast-message";
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';


function HomeScreen(props) {
    //////////////////////////////////////// time //////////////////////
    const { initialMinute = 0, initialSeconds = 0 } = props;
    const [minutes, setMinutes] = useState(initialMinute);
    const [goldTime, setGolgTime] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [secondsGold, setSecondsGold] = useState(initialSeconds);

    const [animating, setAnimating] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [count, setCount] = useState(1);
    const [checkTerms, setCheckTerms] = useState(false)
    const [money, setMoney] = useState(10);
    const [number, setNumber] = useState(3);
    const [totleFee, setTotleFee] = useState(10);
    const [selectValue, setSelectValue] = useState('')
    const [activeTabs, setActiveTabs] = useState('diamand');
    const [recordlist, setRecordlist] = useState([])
    const [goldNumber, setGoldNumber] = useState(0);
    const [diamanNumber, setDiamanNumber] = useState(0);

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                    setMinutes(minutes)
                    // getgame_fetch()
                    getbid_details(activeTabs)
                    console.log('------diamand')
                }
                else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
            if (secondsGold > 0) {
                setSecondsGold(secondsGold - 1);
            }
            if (secondsGold === 0) {
                if (goldTime === 0) {
                    clearInterval(myInterval)
                    setGolgTime(goldTime)
                    getbid_details(activeTabs)
                    console.log('------gold')

                }
                else {
                    setGolgTime(goldTime - 1)
                    setSecondsGold(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });


    
    const onclickCount = (value) => {
        setCount(value)
        setTotleFee(value * money)
    }
    const onclickMoney = (value) => {
        setMoney(value)
        setTotleFee(number * value)
    }
    const onclickNumber = (value) => {
        setNumber(value)
        setCount(value)
        setTotleFee(money * value)
    }
    const chackbox = () => {
        setCheckTerms(!checkTerms)

    }
    const dataList = [
        { id: 1, title: "0" }, { id: 2, title: "1" }, { id: 3, title: "2" }, { id: 4, title: "3" }, { id: 5, title: "4" },
        { id: 6, title: "5" }, { id: 7, title: "6" }, { id: 8, title: "7" }, { id: 9, title: "8" }, { id: 10, title: "9" },

    ];

    const [getUserData, setGetUserData] = useState('')
    useEffect(() => {
        getprofile()
        getold_result("diamand")
        getbid_details()
        getgame_fetch()
    }, [props]);
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
    const getold_result = async (value) => {
        try {
            let url = "old-result.php"
            let request = {
                category: value
            }
            // setAnimating(true)
            let result = await apiCall(url, request);
            if (result.status == 200) {
                setRecordlist(result.data)
                setAnimating(false)
            } else {
                Toast.show({ type: "error", text1: result.message });
                setAnimating(false)
            }
        } catch (error) {
            console.log('error', error)
        }
    }
    const getbid_details = async (value) => {
        try {
            let url = "bid-details.php"
            let request = {
                category: value
            }
            // setAnimating(true)
            let result = await apiCall(url, request);
            console.log('-----result------',result)
            if (result.status == 200) {
                setGoldNumber(result.data)
                setGolgTime(result.data.time)
                setAnimating(false)
            } else {
                Toast.show({ type: "error", text1: result.message });
                setAnimating(false)
            }
        } catch (error) {
            console.log('error', error)
        }
        // try {
        //     let url = "bid-details.php"
        //     // setAnimating(true)
        //     let result = await get_url(url);
        //     if (result.status == 200) {
        //         setGoldNumber(result.data)
        //         setGolgTime(result.data.time)
        //         setAnimating(false)
        //     } else {
        //         Toast.show({ type: "error", text1: result.message });
        //         setAnimating(false)
        //     }
        // } catch (error) {
        //     console.log('error', error)
        // }
    }
    const getgame_fetch = async (value) => {
        try {
            let url = "game-fetch.php"
            // setAnimating(true)
            let result = await get_url(url);
            if (result.status == 200) {
                setSeconds(0)
                setMinutes(result.data[0].time)
                setDiamanNumber(result.data[0])
                setAnimating(false)
            } else {
                Toast.show({ type: "error", text1: result.message });
                setAnimating(false)
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    const onclickConfirm = async (value) => {
        let err = false, errMsg = ''
        if (checkTerms == false) {
            err = true
            errMsg = "Please check terms & conditions"
        }
        if (!err) {
            let UserId = await AsyncStorage.getItem('userid')
            let url = 'bid_place.php'
            let request = {
                userId: UserId,
                number: selectValue,
                amount: totleFee
            };
            setAnimating(true)
            let result = await apiCall(url, request);
            console.log('request', request)
            if (result.status == 200) {
                Toast.show({ type: "success", text1: result.message });
                setModalVisible(!modalVisible);
                getprofile()
                setTotleFee(10);
                setCount(1)
                setAnimating(false);
            } else {
                Toast.show({ type: "error", text1: result.message });
                setAnimating(false);
                setTotleFee(10);
                setCount(1)
            }
        } else {
            Toast.show({ type: 'error', text1: errMsg });
            setAnimating(false)
        }
    }

    const _renderItem = (data) => {
        return data.map((item, index) => {
            return (
                <View key={index} style={[s.RowView, { padding: 10 }]}  >
                    <View style={{ width: screenWidth / 4, marginRight: 10 }} >
                        <Text style={styles.itemtext} >{item.period}</Text>
                    </View>
                    <View style={{ width: screenWidth / 4, }} >
                        <Text style={styles.itemtext} >{item.price}</Text>
                    </View>
                    <View style={{ width: screenWidth / 6, }} >
                        <Text style={styles.itemtext} >{item.number}</Text>
                    </View>
                    <View style={{ width: screenWidth / 3, }} >
                        <Text style={[styles.itemtext, { color: item.result == "Red" ? c.Error : c.success }]} >{item.result}</Text>
                    </View>
                </View>
            )
        })
    }
    return (
        <>
            <Header leftButttonType={"noIcon"} title="Home" animating={animating} setAnimating={setAnimating} />
            <View style={s.container} >
                <ScrollView showsVerticalScrollIndicator={false} 
                // refreshControl={
                //     <RefreshControl
                //         refreshing={animating}
                //         onRefresh={onRefresh}
                //     />
                // } 
                >
                    <View style={styles.menuView} >
                        <View style={[s.RowView, { padding: 10 }]}  >
                            <View>
                                <Text style={styles.textStyle} >My Balance</Text>
                                <Text style={styles.textStyle} >₹ {getUserData.wallet}</Text>
                                <Text style={styles.textStyle} >Period</Text>

                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <View style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 25, borderColor: c.White, marginRight: 20 }}>
                                    <Text style={[styles.textStyle, { fontSize: 28 }]} >{
                                        activeTabs == "diamand" ? diamanNumber.returnAmount  : goldNumber.number
                                    }</Text>
                                </View>
                                <View>
                                    <Text style={styles.textStyle} >Price</Text>
                                    <Text style={styles.textStyle} >{
                                        activeTabs == "diamand" ? diamanNumber.price : goldNumber.price
                                    }</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[s.RowView, { elevation: 0.5, backgroundColor: '#42ce76bd', width: screenWidth - 32, padding: 5 }]} >
                            <Text style={styles.textStyle} >{goldNumber.period}</Text>
                            {
                                activeTabs == "diamand" ?
                                    <Text style={styles.textStyle}> {minutes} :{seconds < 10 ? `0${seconds}` : seconds}</Text>
                                    : <Text style={styles.textStyle}> {goldTime} :{seconds < 10 ? `0${seconds}` : seconds}</Text>

                            }
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }} >
                        <TextTicker
                            style={styles.TextKey}
                            duration={10000}
                            loop
                            bounce
                            repeatSpacer={50}
                            marqueeDelay={1000}>{"Welcome to Asia club per referral 150 recharge 500 Welcome to Asia club per referral 150 recharge 500"}</TextTicker>
                    </View>
                    <View style={s.TouchableView}>
                        <TouchableOpacity
                            onPress={() => { setActiveTabs('diamand') }}
                            style={[styles.oapcity, { backgroundColor: activeTabs == 'diamand' ? c.success : c.White }]}>
                            <Text style={[s.texttop, { color: activeTabs == "diamand" ? c.White : c.Black }]}>Diamand</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setActiveTabs('gold') }}
                            style={[styles.oapcity, { backgroundColor: activeTabs == 'gold' ? c.success : c.White }]}>
                            <Text style={[s.texttop, { color: activeTabs == "gold" ? c.White : c.Black }]}>Gold</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: c.hadercolor, elevation: 1, padding: 5, marginVertical: 10 }} >
                        <View style={[s.TouchableView]}>
                            <TouchableOpacity
                                // onPress={() => { setModalVisible(true), setSelectValue('Green') }}
                                style={[styles.oapcity, { width: screenWidth / 3 - 20, backgroundColor: c.success, borderRadius: 20 }]}>
                                <Text style={styles.textbtn}>Green</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                // onPress={() => { setModalVisible(true), setSelectValue('Red') }}
                                style={[styles.oapcity, { width: screenWidth / 3 - 20, backgroundColor: "#d80041", borderRadius: 20 }]}>
                                <Text style={styles.textbtn}>Red</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                // onPress={() => { setModalVisible(true), setSelectValue('Lucky') }}
                                style={[styles.oapcity, { width: screenWidth / 3 - 20, backgroundColor: "#770fa4", borderRadius: 20 }]}>
                                <Text style={styles.textbtn}>Lucky</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={dataList}
                            numColumns={5}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <>
                                    {
                                        index == 5 || index == 0 ?
                                            <TouchableOpacity key={index}
                                                onPress={() => { setModalVisible(true), setSelectValue(item.title) }} style={{}}>
                                                <LinearGradient colors={['#770fa4', "#770fa4", index == 0 ? c.Error : '#0f0']} start={{ x: 0, y: 0 }} end={{ x: 0.7, y: 0 }} style={[styles.itemView]}>
                                                    <Text style={[styles.textStyle, { fontSize: 20 }]} >{item.title}</Text>
                                                </LinearGradient>
                                            </TouchableOpacity> :
                                            <TouchableOpacity key={index}
                                                onPress={() => { setModalVisible(true), setSelectValue(item.title) }}
                                                style={[styles.itemView, { backgroundColor: index % 2 != 0 ? c.success : "#d80041", }]}>
                                                <Text style={[styles.textStyle, { fontSize: 20 }]} >{item.title}</Text>
                                            </TouchableOpacity>

                                    }
                                </>
                            )}
                        />
                    </View>
                    <Textfs12 title="Record" />
                    <View style={[s.RowView, { backgroundColor: '#eaeaea', padding: 10 }]}  >
                        <View style={{ width: screenWidth / 4, marginRight: 10 }} >
                            <Textfs12 title="Period" />
                        </View>
                        <View style={{ width: screenWidth / 6 }} >
                            <Textfs12 title="Price" />
                        </View>
                        <View style={{ width: screenWidth / 5 }} >
                            <Textfs12 title="Number" />
                        </View>
                        <View style={{ width: screenWidth / 4 }} >
                            <Textfs12 title="Result" />
                        </View>
                    </View>
                    <ScrollView nestedScrollEnabled={true} style={{ maxHeight: screenHeight / 3 + 40 }} >
                        {_renderItem(recordlist || [])}
                    </ScrollView>
                </ScrollView>
                <Modals
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                    padding={-1}
                    ViewDesing={
                        <View style={{}} >
                            <View style={[s.RowView, { height: 60, backgroundColor: selectValue % 2 != 0 ? c.success : "#d80041", paddingHorizontal: 16, borderTopLeftRadius: 10, borderTopRightRadius: 10 }]} >
                                <Text style={[styles.textStyle, { fontSize: 20 }]} >{"Select" + " " + selectValue}</Text>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={s.Opacitytabs} >
                                    <Image source={require('../../asstes/images/cancel.png')} style={s.imagesI} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ padding: 10 }} >
                                <Textfs12 title="Contract Money:" />
                                <View style={styles.rowView} >
                                    <TouchableOpacity onPress={() => onclickMoney(10)}
                                        style={[styles.botton, { backgroundColor: money == 10 ? c.success : c.gary }]} >
                                        <Text style={[styles.textst, { color: money == 10 ? c.White : c.Black, }]} >10</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => onclickMoney(100)}
                                        style={[styles.botton, { backgroundColor: money == 100 ? c.success : c.gary }]} >
                                        <Text style={[styles.textst, , { color: money == 100 ? c.White : c.Black, }]} >100</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => onclickMoney(1000)}
                                        style={[styles.botton, { backgroundColor: money == 1000 ? c.success : c.gary }]} >
                                        <Text style={[styles.textst, , { color: money == 1000 ? c.White : c.Black, }]} >1000</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => onclickMoney(10000)}
                                        style={[styles.botton, { backgroundColor: money == 10000 ? c.success : c.gary }]} >
                                        <Text style={[styles.textst, { color: money == 10000 ? c.White : c.Black, }]} >10000</Text>
                                    </TouchableOpacity>
                                </View>
                                <Textfs12 title="Number:" />
                                <View style={styles.rowView} >
                                    <TouchableOpacity onPress={() => onclickNumber(3)}
                                        style={[styles.botton, { backgroundColor: count == 3 ? c.success : c.gary }]} >
                                        <Text style={[styles.textst, { color: count == 3 ? c.White : c.Black, }]} >3</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => onclickNumber(5)}
                                        style={[styles.botton, { backgroundColor: count == 5 ? c.success : c.gary }]} >
                                        <Text style={[styles.textst, { color: count == 5 ? c.White : c.Black, }]} >5</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => onclickNumber(10)}
                                        style={[styles.botton, { backgroundColor: count == 10 ? c.success : c.gary }]} >
                                        <Text style={[styles.textst, { color: count == 10 ? c.White : c.Black, }]} >10</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text>Number : Maxinumlowersinglular 999 hands</Text>
                                <View style={styles.rowView} >
                                    <TouchableOpacity disabled={count == 1 ? true : false} onPress={() => { setCount(count - 1), setTotleFee(money * count) }} style={styles.botton} >
                                        <Text style={{ fontFamily: fontFamily.extraBold, fontSize: 14 }} >-</Text>
                                    </TouchableOpacity>
                                    <Textfs12 title={count} />
                                    <TouchableOpacity onPress={() => onclickCount(count + 1)} style={[styles.botton, { marginLeft: 10 }]} >
                                        <Text style={{ fontFamily: fontFamily.extraBold, fontSize: 14 }} >+</Text>
                                    </TouchableOpacity>
                                </View>
                                <Textfs12 title={`Fee : ${totleFee}`} />
                                <View style={styles.rowView} >
                                    <TouchableOpacity onPress={() => chackbox()}>
                                        <Image source={checkTerms == true ? require('../../asstes/images/checkbox.png') : require('../../asstes/images/box.png')} style={[s.icon, { marginRight: 16 }]} />
                                    </TouchableOpacity>
                                    <Textfs12 title={"I agree the"} />
                                    <Text style={[styles.textStyle, { fontSize: 14, color: c.success }]} > Presale management rule</Text>
                                </View>
                                <View style={s.RowView} >
                                    <LargefillBtn
                                        label={"Cancel"}
                                        backgroundColor={c.Error}
                                        onPress={() => setModalVisible(!modalVisible)}
                                        width={screenWidth / 2 - 30}
                                    />
                                    <LargefillBtn
                                        label={"Confirm"}
                                        onPress={() => onclickConfirm()}
                                        width={screenWidth / 2 - 30}
                                    />
                                </View>
                            </View>
                        </View>
                    }
                />
            </View>
        </>
    )
}
const s = StyleConstants, c = ColorsConstant, styles = StyleSheet.create({
    menuView: {
        marginTop: 20,
        width: screenWidth - 32,
        backgroundColor: c.hadercolor,
    },
    textStyle: {
        color: c.White,
        fontSize: 16,
        fontFamily: fontFamily.semiBold
    },
    TextKey: {
        marginLeft: 5,
        color: ColorsConstant.White,
        fontSize: 14,
    },
    oapcity: {
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth / 2 - 20,
        height: 40,
        elevation: 2
    },
    textbtn: {
        fontSize: 14,
        fontFamily: fontFamily.medium,
        color: c.White
    },
    itemView: {
        width: 50,
        marginTop: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginRight: 16
    },
    itemtext: {
        fontSize: 12,
        color: ColorsConstant.White,
        fontFamily: fontFamily.Regular
    },
    botton: {
        borderWidth: 1,
        borderColor: c.gary,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        padding: 8,
        marginRight: 10
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    textst: {
        fontSize: 12,
        fontFamily: fontFamily.medium
    }
})
export default HomeScreen;