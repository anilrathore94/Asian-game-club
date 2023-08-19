import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import { ColorsConstant } from '../../constants/Colors.constant';
import { screenWidth } from '../../constants/Sizes.constant';
import { StyleConstants } from '../../constants/Style.constant';
import Header from '../../Widget/Header';
import TextinputComman from '../../component/Input/LargeTextInput'

const PromotionList = (props) => {
    const _goBack = () => {
        return props.navigation.navigate('Tabs', { screen: 'Account' })
    };
    const [search, setSearch] = useState('')
    const [dataList, setDataList] = useState([
        { id: 1, name: 'ramm' }, { id: 2, name: 'same' }
    ]);
    const _filter = (item, search) => {
        if ((item.name).toLowerCase().search(search.toLowerCase()) !== -1 || (item.name).toLowerCase().search(search.toLowerCase()) !== -1) {
            return item
        }
    }
    const _renderItem = (items) => {
        return items.map((item, index) => {
            if (_filter(item, search))
                return (
                    <View key={index} style={[s.RowView, styles.itemView]}>
                        <Text style={styles.text}>{index + 1}</Text>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>47629856</Text>
                        <Text style={styles.text}>532497</Text>
                    </View>
                )
        })
    }
    return (
        <>
            <Header leftButtonType={"back"} title="Promotion List" leftButtonAction={_goBack} />
            <View style={s.container}>
                <View style={styles.secendview}>
                  
                    <TextinputComman
                         placeholder={"Enter Search "}
                         value={search || ''}
                         onChangeText={(e) => { setSearch(e) }}
                        error={""}
                    />
                </View>
                <View style={styles.battonview}>
                    <Text style={styles.text}>Sr.no</Text>
                    <Text style={styles.text}>Name</Text>
                    <Text style={styles.text}>Phone</Text>
                    <Text style={styles.text}>created id</Text>
                </View>
                <ScrollView>
                    {_renderItem(dataList || [])}
                </ScrollView>
                
            </View>
        </>
    );
};
const s = StyleConstants, c = ColorsConstant, styles = StyleSheet.create({
    battonview: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: c.hadercolor,
        width: screenWidth / -32,
        height: 40,
        marginTop: 10,
        paddingHorizontal: 16,
        justifyContent: 'space-between'
    },
    text: {
        color: c.White
    },
  
    itemView: {
        backgroundColor: "#b3b6b6b0",
        paddingHorizontal: 16,
        padding: 6

    },
   
})
export default PromotionList;
