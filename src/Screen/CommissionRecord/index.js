import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import Header from '../../Widget/Header';
import { StyleConstants } from "../../constants/Style.constant";
import { ColorsConstant } from '../../constants/Colors.constant';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
const CommissionRecord = (props) => {
    const _goBack = () => {
        return props.navigation.navigate('Tabs', { screen: 'Account' })
    };
    const [dataList, setDataList] = useState([
        { id: 1 }, { id: 1 }
    ]);
    const _renderItem = (items) => {
        return items.map((item, index) => {
            return (
                <View style={[s.RowView, { marginTop: 1 }]} >
                    <View style={styles.itemView} >
                        <Text style={styles.textitem}>10/04/2023 12:12 Pm</Text>
                    </View>
                    <View style={[styles.itemView, {}]} >
                        <Text style={styles.textitem}>400</Text>
                    </View>
                </View>
            )
        })
    }
    return (
        <>
            <Header leftButtonType={"back"} title="Commission Record" leftButtonAction={_goBack} />
            <View style={[s.container, {}]} >

                <View style={[s.RowView, { marginTop: 10 }]} >
                    <View style={[styles.tabsView]} >
                        <Text style={styles.textc}>Date</Text>
                    </View>
                 
                    <View style={styles.tabsView} >
                        <Text style={styles.textc}>AmountS</Text>
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
        width: screenWidth / 2-16,
        backgroundColor: c.hadercolor,
        padding: 10
    },
    textc: {
        color: c.White,
        fontSize:12
    },
    itemView: {
        backgroundColor: "#b3b6b6b0",
        width: screenWidth / 2 -3,
        padding: 6

    },
    textitem: {
        color: c.Black,
        fontSize:12
    },

})
export default CommissionRecord;

