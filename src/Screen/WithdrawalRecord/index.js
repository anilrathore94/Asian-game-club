import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import Header from '../../Widget/Header';
import { StyleConstants } from "../../constants/Style.constant";
import { ColorsConstant } from '../../constants/Colors.constant';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiCall } from '../../services/AppSetting';
import { fontFamily } from '../../constants/font';
import Moment from 'moment'

const WithdrawalRecord = (props) => {
    const _goBack = () => {
        return props.navigation.navigate('Tabs', { screen: 'Account' })
    };
    const [animating, setAnimating] = useState(false);
    useEffect(() => {
        onclicktranscation()
    }, [])
    const onclicktranscation = async () => {
        let UserId = await AsyncStorage.getItem('userid')
        try {
            let url = "transcation.php"
            let request = {
                userid: UserId,
                todate: "2023-04-01",
                fromdate: "2023-04-10",
                type: 'Withdrawal'

            }
            setAnimating(true)
            let result = await apiCall(url, request);
            if (result.status == 200) {
                setDataList(result.data)
                setAnimating(false)
            } else {
                setAnimating(false)
            }
        } catch (error) {
            console.log('error', error)
        }
    }
    const [dataList, setDataList] = useState([ ]);
    const _renderItem = (items) => {
        return items.map((item, index) => {
            return (
                <View key={index} style={[s.RowView, { marginTop: 1 }]} >
                    <View style={[styles.itemView, { width: screenWidth / 4, }]} >
                        <Text style={[styles.textitem, {  }]}>{Moment(item.createAt).format('DD-MMM-YYYY')}</Text>
                    </View>
                    <View style={[styles.itemView,{width:screenWidth/6}]} >
                        <Text style={styles.textitem}>{item.type_CR_DR}</Text>
                    </View>
                    <View style={styles.itemView} >
                        <Text style={styles.textitem}>{item.amount}</Text>
                    </View>
                    <View style={[styles.itemView, {}]} >
                        <Text style={styles.textitem}>{item.category}</Text>
                    </View>
                </View>
            )
        })
    }
    return (
        <>
            <Header leftButtonType={"back"} title="Withdrawal Record" leftButtonAction={_goBack}
                animating={animating} setAnimating={setAnimating} />
            <View style={[s.container, {}]} >
                {/* <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
                    <Text>Show</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: c.gary, width: 70, height: 30, marginLeft: 10 }}>
                        <Text style={{ alignContent: 'center', colo: c.White }}> 10 </Text>
                    </View>
                    <Text style={{ marginLeft: 10 }}>
                        entries
                    </Text>
                </View> */}

                <View style={[s.RowView, { marginTop: 10 }]} >
                    <View style={[styles.tabsView, { width: screenWidth / 4 }]} >
                        <Text style={styles.textc}>Date</Text>
                    </View>
                    <View style={[styles.tabsView, { width: screenWidth / 6 }]} >
                        <Text style={[styles.textc,{fontSize:8,padding:2}]}>Particulars</Text>
                    </View>
                    <View style={styles.tabsView} >
                        <Text style={styles.textc}>Amount</Text>
                    </View>
                    <View style={[styles.tabsView, {}]} >
                        <Text style={styles.textc}>Charges</Text>
                    </View>
                </View>
                <ScrollView>
                    {_renderItem(dataList || [])}
                </ScrollView>
                {/* <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 18 }}>
            Showing 0 to 0 of 0 entries
          </Text>
        </View> */}


            </View>
        </>
    );

};
const s = StyleConstants, c = ColorsConstant, styles = StyleSheet.create({
    text: {
        fontSize: 24
    },
    manview: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16
    },
    dateview: {
        // borderColor: c.green,
        borderWidth: 1,
        padding: 4,
        backgroundColor: c.White,
        flexDirection: 'row',
        alignItems: 'center'
        // width: 90
    },
    serchview: {
        flexDirection: 'row',
        backgroundColor: 'green',
        paddingHorizontal: 6,
        alignItems: 'center',
        borderRadius: 10,
        padding: 5

    },
    tabsView: {
        width: screenWidth / 4 - 3,
        backgroundColor: c.hadercolor,
        padding: 10
    },
    textc: {
        color: c.White,
        fontSize: 12
    },
    itemView: {
        backgroundColor: "#b3b6b6b0",
        width: screenWidth / 4 - 3,
        padding: 6

    },
    textitem: {
        color: c.Black,
        fontSize: 12,
        fontFamily:fontFamily.Regular
    },

})
export default WithdrawalRecord;

