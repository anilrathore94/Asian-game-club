import React from "react";
import { View, Text, Modal, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ColorsConstant } from "../constants/Colors.constant";
import { fontFamily } from "../constants/font";

import Images from "../constants/Images";
import { StyleConstants } from "../constants/Style.constant";

function Modals(props) {
    const { setModalVisible, modalVisible, ViewDesing, padding } = props
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={[s.modalManView, { justifyContent: 'center' }]}>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={s.modalLhare}></TouchableOpacity>
                <View style={[s.modalView, { padding: padding ? padding : 10 }]} >
                    {ViewDesing}
                </View>
            </View>
        </Modal>
    )
}
const s = StyleConstants, c = ColorsConstant, styles = StyleSheet.create({
    RowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textSelect: {
        color: ColorsConstant.Black,
        fontFamily: fontFamily.mediumc
    }
})
export default Modals;