import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ColorsConstant } from '../../constants/Colors.constant';
import { screenWidth } from '../../constants/Sizes.constant';
import { StyleConstants } from '../../constants/Style.constant';
import Header from '../../Widget/Header';
import { fontFamily } from '../../constants/font';

const Promotion = (props) => {
    const [selact, setselact] = useState("Level1")
    const _goBack = () => {
        return props.navigation.navigate('Tabs', { screen: 'Account' })
    };
    return (
        <>
            <Header leftButtonType={"back"} title="Promotion" leftButtonAction={_goBack} />

            <View style={s.container}>
                <Text style={styles.text}>
                    Bonus ₹ 0.00
                </Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={{ color: c.White }}>Apply Commission</Text>
                </TouchableOpacity>
                <View style={styles.secendview}>
                    <TouchableOpacity style={[styles.buttonslid, { backgroundColor: selact == "Level1" ? c.hadercolor : c.White, }]} onPress={() => setselact("Level1")}>
                        <Text style={{ color: selact == "Level1" ? c.White : c.Black }}>Level 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonslid, { backgroundColor: selact == "Level2" ? c.hadercolor : c.White, }]} onPress={() => setselact("Level2")}>
                        <Text style={{ color: selact == "Level2" ? c.White : c.Black }}>Level 2</Text>
                    </TouchableOpacity>
                </View>
                <View >
                    {

                        selact == "Level1" &&
                        <View style={styles.secendview}>
                        <View style={{width:screenWidth /1.6,alignItems:'center'}}>
                            <Text style={styles.textstyl} >Total People</Text>
                            <Text style={styles.textstyl} >0</Text>
                        </View>
                        <View style={{width:screenWidth /1.6,alignItems:'center'}}>
                        <Text style={styles.textstyl} >Contribution</Text>
                            <Text style={styles.textstyl} > ₹0</Text>
                        </View>
                        </View>
                    }
                     {
                        selact == "Level2" &&
                        <View style={styles.secendview}>
                        <View style={{width:screenWidth /1.6,alignItems:'center'}}>
                            <Text style={styles.textstyl} >Total People</Text>
                            <Text style={styles.textstyl} >1</Text>
                        </View>
                        <View style={{width:screenWidth /1.6,alignItems:'center'}}>
                        <Text style={styles.textstyl} >Contribution</Text>
                            <Text style={styles.textstyl} > ₹32</Text>
                        </View>
                        </View>
                    }
                   
                </View>

            </View>
        </>
    );
};
const s = StyleConstants, c = ColorsConstant, styles = StyleSheet.create({
    secendview:
    {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20
    },
    text: {
        textAlign: "center",
        marginTop: 16, fontSize: 24,
        color:c.White
    },
    button: {
        backgroundColor: c.hadercolor,
        width: screenWidth-32 ,
        height: 40,
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonslid: {
        width: screenWidth / 2.2,
        marginRight: 2,
        height: 40, justifyContent: 'center',
        alignItems: 'center'
    },
    textstyl:{
        color:c.White,
        fontSize:12,
        fontFamily:fontFamily.medium
    }
})
export default Promotion;
