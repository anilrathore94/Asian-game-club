import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import { ColorsConstant } from "../constants/Colors.constant";
import Images from "../constants/Images";
import { StyleConstants } from "../constants/Style.constant";

function ModalCamera(props) {
    const { setModalVisible, modalVisible,setImage,image,EditImage } = props
    const ImageCamera = async () => {
        ImagePicker.openCamera({
            width: 30,
            height: 40,
            cropping: false,
            compressImageMaxWidth: 640,
            compressImageMaxHeight: 480,
            compressImageQuality: 0.75,
            mediaType: 'photo'
        }).then(image => {
            setImage(image.path);
            EditImage(image.path);
            setModalVisible(false)
            console.log(image);
        });
    };
    const backImageDocGallery = async () => {
        ImagePicker.openPicker({
            width: 30,
            height: 40,
            cropping: false,
            compressImageMaxWidth: 640,
            compressImageMaxHeight: 480,
            compressImageQuality: 0.75,
            mediaType: 'photo'
        }).then(image => {
            setImage(image.path);
            EditImage(image.path);
            setModalVisible(false)
            console.log("----",image);
        });
    };
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={s.modalManView}>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={s.modalLhare}></TouchableOpacity>
                    <View style={[s.modalView, { flexDirection: 'row', padding: 10, justifyContent: 'space-around' }]}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => ImageCamera()}>
                            <Image style={{ tintColor: ColorsConstant.Black, width: 40, resizeMode: 'contain', height: 40 }} source={Images['camera']} />
                            <Text style={{ fontSize: 10, color: ColorsConstant.dark, fontWeight: 'bold' }}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => backImageDocGallery()}>
                            <Image style={{ tintColor: ColorsConstant.Black, width: 40, resizeMode: 'contain', height: 40 }} source={Images['gallery']} />
                            <Text style={{ fontSize: 10, color: ColorsConstant.dark, fontWeight: 'bold' }}>Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
const s = StyleConstants, c = ColorsConstant, styles = StyleSheet.create({

})
export default ModalCamera;