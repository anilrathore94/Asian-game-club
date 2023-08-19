import React, { useEffect } from 'react'
import { StyleSheet, Text, ActivityIndicator, TouchableOpacity, View, BackHandler, Alert, Image, StatusBar } from 'react-native'
import { Appbar } from 'react-native-paper';
import { ColorsConstant } from '../constants/Colors.constant';
import { fontFamily } from '../constants/font';
// import images from '../constants/images';
import { screenWidth } from '../constants/Sizes.constant';


export default function Header(props) {
    const { refresh, setRefresh, animating, setAnimating, headerCenter } = props

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", _goBack);
        return (() => {
            BackHandler.removeEventListener("hardwareBackPress", _goBack)
        })
    }, [refresh])

    const _goBack = () => {
        if (typeof props.leftButtonAction === "undefined") {
            Alert.alert("Hold on!", "Are you sure you want to exit the app?",
                [{
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
                ])
            return true
        } else {
            props.leftButtonAction()
            return true
        }
    }
    const _handleRefresh = async () => {
        const { user } = props;
        // let result = await getUserPlan(user.token);
        // let userResult = await getUser(user.token);
        if (result.status) {

        }
        if (userResult.status) {
            let userData = userResult.data;
            let refreshedData = { ...user, ...userData }
            //console.log('refreshedData',refreshedData)
        }
    }
    const refreshData = () => {
        setRefresh(new Date().getTime())
    }
    return (<>
   
        <Appbar.Header style={{ backgroundColor: ColorsConstant.hadercolor, position: 'relative', zIndex: 1, height:50}}>
            {
                props.leftButttonType !== 'noIcon' ?
                    <Appbar.Action animated={false} style={{ width: typeof props.leftButtonType == 'undefined' ? 250 : 40, height: typeof props.leftButtonType == 'undefined' ? 50 : 40, borderRadius: 4, backgroundColor: props.buttonBackColor, alignItems: 'center' }} icon={() =>
                        props.leftButtonType === 'back' ?
                            <TouchableOpacity style={ls.leftButton} onPress={_goBack}>
                                <Image source={require('../asstes/images/back.png')} style={ls.leftButtonIcon} />
                            </TouchableOpacity> :
                            props.leftButtonTemplate}
                    /> : <Text></Text>
            }
            <Appbar.Content style={props.headerCenter ? { width: screenWidth ,} : ""} titleStyle={{fontSize:14,marginLeft:-15,fontFamily:fontFamily.medium}} title={props.title} />
            {
                props.rightButttonType === 'refresh' && props.rightButtonAction !== 'undefined' ?
                    <View >
                        {props.rightButtonAction}
                    </View> : <Text></Text>
            }
        </Appbar.Header>
        {animating && 
        <View style={ls.activityIndicator} >
        <View style={{ flexDirection:'row',alignItems:'center', backgroundColor: ColorsConstant.White, padding: 10, width: screenWidth - 40, borderRadius: 10 }}>
            <ActivityIndicator
                animating={animating}
                color="red"
                size="small" />
            <Text style={{ fontSize: 20, color: ColorsConstant.Black }}>Loading....</Text>
        </View>
    </View>
        }
    </>)
}
const ls = StyleSheet.create({
    activityIndicator: {
        backgroundColor: ColorsConstant.DarkLight,
        alignItems: 'center',
        justifyContent: "center",
        position: 'absolute',
        zIndex: 9999,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    leftButton: {
        width:40,
        height:40,
        alignItems:'center',
        justifyContent:'center',
       
    },
    leftButtonIcon: {
        tintColor: ColorsConstant.White,
        width:20,
        height:20

    },
})