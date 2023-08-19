import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import Textfs12 from "../../component/TextCom/Textfs12";
import { ColorsConstant } from "../../constants/Colors.constant";
import { StyleConstants } from "../../constants/Style.constant";
import Header from "../../Widget/Header";
import TextBold from "../../component/TextCom/TextBold";
import { fontFamily } from "../../constants/font";
import { apiCall } from "../../services/AppSetting";
import Toast from "react-native-toast-message";
import RenderHtml from 'react-native-render-html';

function PrivacyPolicy(props) {
    const { width } = useWindowDimensions();

    const _goBack = () => {
        return props.navigation.navigate('Tabs', { screen: 'Account' })
    };
    const [animating, setAnimating] = useState(false);
    const [description, setDescription] = useState('')
    useEffect(() => {
        getPrivacyPolicy()
    }, [])
    const getPrivacyPolicy = async () => {
        try {
            let url = "pages.php"
            let request = {
                pageName: "Privacy Policy"
            }
            setAnimating(true)
            let result = await apiCall(url, request);
            if (result.status == 200) {
                setDescription(result.data[0].description)
                console.log('---------UserId---', description)
                setAnimating(false)
            } else {
                Toast.show({ type: "error", text1: result.message });
                setAnimating(false)
            }
        } catch (error) {
            console.log('error', error)
        }
    }
    const source = {
        html:description
    };
    return (
        <>
            <Header leftButtonType={"back"} title="PrivacyPolicy" leftButtonAction={_goBack} animating={animating} setAnimating={setAnimating} />
            <View style={s.container} >
                <View style={styles.cardView}  >
                <TextBold color={c.Black} title="Privacy Policy" />
                    <RenderHtml
                        contentWidth={width}
                        source={source}
                        style={{ color: 'red' }}
                    />
                    {/* <TextBold color={c.Black} title="Privacy Policy" />
                    <Text style={{ fontSize: 12, fontFamily: fontFamily.Regular }}>This is the Privacy</Text>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.textsty}>1. This is the first Policy</Text>
                        <Text style={styles.textsty}>2. This is the second Policy</Text>
                        <Text style={styles.textsty}>3. This is the third Policy</Text>
                    </View> */}
                </View>
            </View>

        </>
    )
}
const s = StyleConstants, c = ColorsConstant, styles = StyleSheet.create({
    cardView: {
        marginTop: 20,
        backgroundColor: c.White,
        elevation: 5,
        borderRadius: 10,
        padding: 10
    },
    textsty: {
        fontSize: 12,
        fontFamily: fontFamily.medium,
        color: c.Black,

    }
})
export default PrivacyPolicy;