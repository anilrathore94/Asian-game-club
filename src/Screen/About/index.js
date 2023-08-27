import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions } from "react-native";
import Textfs12 from "../../component/TextCom/Textfs12";
import { ColorsConstant } from "../../constants/Colors.constant";
import { StyleConstants } from "../../constants/Style.constant";
import Header from "../../Widget/Header";
import TextBold from "../../component/TextCom/TextBold";
import { fontFamily } from "../../constants/font";
import { apiCall } from "../../services/AppSetting";
import RenderHtml from 'react-native-render-html';

function About(props) {
    const { width } = useWindowDimensions();
    const _goBack = () => {
        return props.navigation.navigate('Tabs', { screen: 'Account' })
    };
    const [animating, setAnimating] = useState(false);
    const [description, setDescription] = useState([])
    useEffect(() => {
        getPrivacyPolicy()
    }, [])
    const getPrivacyPolicy = async () => {
        try {
            let url = "pages.php"
            let request = {
                pageName: "About Us"
            }
            setAnimating(true)
            let result = await apiCall(url, request);
            if (result.status == 200) {
                setDescription(result.data[0].description)
                console.log('------description----',result.data[0])
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
        html: description
    };
    return (
        <>
            <Header leftButtonType={"back"} title="About" leftButtonAction={_goBack}
                animating={animating} setAnimating={setAnimating} />
            <View style={s.container} >
                {/* <View style={styles.cardView}  >
                    <Text style={styles.textsty}>{description}</Text>
                    <TextBold color={c.Black} title={description.title} />
                </View> */}
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.cardView}  >
                        {/* <TextBold color={c.Black} title="Privacy Policy" /> */}
                        <RenderHtml
                            contentWidth={width}
                            source={source}
                            tagsStyles={tagsStyles}
                        />
                    </View>
                </ScrollView>
            </View>

        </>
    )
}
const tagsStyles = {
    body: {
        fontFamily: fontFamily.semiBold,
        color: c.Black
    },
    a: {
        color: c.Black,
        fontFamily: fontFamily.medium,
    }
};
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
        fontFamily: fontFamily.Regular
    }
})
export default About;