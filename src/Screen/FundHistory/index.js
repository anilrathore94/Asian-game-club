import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import Header from '../../Widget/Header';
import { StyleConstants } from "../../constants/Style.constant";
import { ColorsConstant } from '../../constants/Colors.constant';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import Moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiCall } from '../../services/AppSetting';
import { fontFamily } from '../../constants/font';
function FundHistory(props) {
    const _goBack = () => {
        return props.navigation.navigate('Tabs', { screen: 'Account' })
    };
    const [search, setSearch] = useState('')
    const [animating, setAnimating] = useState(false);
    const [toDatePickerVisible, setToDatePickerVisibility] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const ageRestriction = new Date().setDate(new Date().getDate() - 6574);
    const [toDate, setTodate] = useState("2023-04-01")
    const [fromDate, setFromDate] = useState("2023-04-10")
    const showtoDatePicker = () => {
        setToDatePickerVisibility(true);
    };
    const hidetoDatePicker = () => {
        setToDatePickerVisibility(false);
    };
    const tohandleConfirm = (date) => {
        setTodate(date)
        hidetoDatePicker();
    };
    const showfromDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        setFromDate(date)
        onclicktranscation()
        hideDatePicker();
    };
    useEffect(() => {
        onclicktranscation()
    }, [])
    const onclicktranscation = async () => {
        let UserId = await AsyncStorage.getItem('userid')
        try {
            let url = "transcation.php"
            let request = {
                userid: UserId,
                todate: toDate,
                fromdate: fromDate,
                type: 'Fund'

            }
            setAnimating(true)
            let result = await apiCall(url, request);
            if (result.status == 200) {
                setDataList(result.data)
                // console.log('----result----',result.data)
                setAnimating(false)
            } else {
                setAnimating(false)
            }
        } catch (error) {
            console.log('error', error)
        }
    }
    const [dataList, setDataList] = useState([]);
    const _filter = (item, search) => {
        if ((item.createAt).toLowerCase().search(search.toLowerCase()) !== -1 || (item.createAt).toLowerCase().search(search.toLowerCase()) !== -1) {
            return item
        }
    }
    const _renderItem = (items) => {
        return items.map((item, index) => {
            if (_filter(item, search))
                return (
                    <View key={index} style={[s.RowView, { marginTop: 1 }]} >
                        <View style={styles.itemView} >
                            <Text style={styles.textitem}>{item.amount}</Text>
                        </View>
                        <View style={styles.itemView} >
                            <Text style={styles.textitem}>{item.category}</Text>
                        </View>
                        <View style={[styles.itemView, { width: screenWidth / 3 + 22, }]} >
                            <Text style={[styles.textc, { color: c.Black }]}>{Moment(item.createAt).format('DD- MMM- YYYY')}</Text>
                        </View>
                    </View>
                )
        })
    }
    return (
        <>
            <Header leftButtonType={"back"} title="Fund Transfer History" leftButtonAction={_goBack} animating={animating} setAnimating={setAnimating} />
            <View style={[s.container, {}]} >
                <View style={styles.manview}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => showtoDatePicker()} style={styles.dateview}>
                            <Text style={{ color: c.Black, fontSize: 12, marginRight: 10 }}>{toDate == '' ? 'dd/mm/yyyy' : Moment(toDate).format('DD-MM-YYYY')}</Text>
                            <Image style={{ height: 10, width: 10, tintColor: c.green }} source={require('../../asstes/images/Group8720.png')} />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={toDatePickerVisible}
                            mode="date"
                            onConfirm={tohandleConfirm}
                            onCancel={hidetoDatePicker}
                            cancelTextIOS={'red'}
                        // maximumDate={ageRestriction}
                        />
                        <Text style={{ margin: 10, fontSize: 20,color:c.White }}>
                            To
                        </Text>
                        <TouchableOpacity onPress={() => showfromDatePicker()} style={styles.dateview}>
                            <Text style={{ color: c.Black, fontSize: 12, marginRight: 10 }}>{fromDate == '' ? 'dd/mm/yyyy' : Moment(fromDate).format('DD-MM-YYYY')}</Text>
                            <Image style={{ height: 10, width: 10, tintColor: c.green }} source={require('../../asstes/images/Group8720.png')} />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            cancelTextIOS={'red'}
                        // maximumDate={ageRestriction}
                        />
                    </View>

                </View>
                <TextInput
                    style={styles.input}
                    placeholder={"Enter Search "}
                    placeholderTextColor={c.gary}
                    value={search || ''}
                    onChangeText={(e) => { setSearch(e) }}
                />

                <View style={[s.RowView, { marginTop: 10 }]} >
                    <View style={styles.tabsView} >
                        <Text style={styles.textc}>Mobile No</Text>
                    </View>
                    <View style={styles.tabsView} >
                        <Text style={styles.textc}>Amount</Text>
                    </View>
                    <View style={[styles.tabsView, { width: screenWidth / 3 + 22, }]} >
                        <Text style={styles.textc}>Date & Time</Text>
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
        width: screenWidth / 4,
        backgroundColor: c.hadercolor,
        padding: 10
    },
    textc: {
        color: c.White,
    },
    itemView: {
        backgroundColor: "#b3b6b6b0",
        width: screenWidth / 4,
        padding: 6

    },
    textitem: {
        color: c.Black,
        fontSize: 12,
        fontFamily:fontFamily.Regular
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        width: screenWidth - 32,
        height: 40,
        borderRadius: 10,
        paddingHorizontal: 16,
        marginTop: 10,
        color:c.White
    },

})
export default FundHistory;
