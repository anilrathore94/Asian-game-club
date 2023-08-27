import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import Textfs12 from "../../component/TextCom/Textfs12";
import { ColorsConstant } from "../../constants/Colors.constant";
import { StyleConstants } from "../../constants/Style.constant";
import Header from "../../Widget/Header";
import { get_url } from "../../services/AppSetting";

function Enquiry() {
    const [mobileNumber, setMobileNumber] = useState('');
    useEffect(() => {
        getAppUpdateData();
    }, []);
    const getAppUpdateData = async () => {
        let url = "app-setting.php";
        try {
            let result = await get_url(url);
            setMobileNumber(result.data.supportNumber)
        } catch (error) {
            console.log("error333", error);
        }
    };
    const openWhatsApp = async (value) => {
        let url =
            'whatsapp://send?text=' +
            "Join" +
            '&phone=91' + mobileNumber;

        Linking.openURL(url)
            .then(data => {
                console.log("WhatsApp Opened successfully " + data);
            })
            .catch(() => {
                alert(`Make sure ${value} installed on your device`);
            });

    };
    return (
        <>
            <Header leftButttonType={"noIcon"} title="Enquiry" />
            <View style={s.container} >
                <View style={{ marginTop: 20, alignItems: 'center' }}  >
                    <Textfs12 color={c.White} title="Join Telegram Group for support." />
                    <TouchableOpacity onPress={() => openWhatsApp("whatsapp")}
                        style={{ marginVertical: 20, backgroundColor: '#01a0d4', padding: 10, borderRadius: 8 }} >
                        <Text style={{ color: c.White }}>Join Now</Text>
                    </TouchableOpacity>
                    <Textfs12 color={c.White} title="Join Telegram group for suggestion/complaint." />
                    <TouchableOpacity style={{ marginVertical: 20, backgroundColor: '#01a0d4', padding: 10, borderRadius: 8 }} >
                        <Text style={{ color: c.White }}>Join Now</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </>
    )
}
const s = StyleConstants, c = ColorsConstant, styles = StyleSheet.create({

})
export default Enquiry;