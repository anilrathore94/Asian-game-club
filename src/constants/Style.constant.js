import { StyleSheet, } from 'react-native'
import { ColorsConstant } from './Colors.constant'
import { fontFamily } from './font'
import { screenHeight, screenWidth } from './Sizes.constant'
export const c = ColorsConstant, StyleConstants = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorsConstant.Thame,
        paddingHorizontal: 16
    },
    Textinput: {
        width: screenWidth - 32,
        height: 45,
        marginBottom:10,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderColor: ColorsConstant.gary,
        borderWidth:1
    },
    btnoutline: {
        borderWidth: 1,
        width:screenWidth-32,
        // flex: 1,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 15,
        borderColor: ColorsConstant.White,
        // marginTop: 16
        marginBottom:16
    },
    RowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        height: 20,
        width: 20,
    },
    textsigup: {
        color: ColorsConstant.White,
        paddingHorizontal: 15,
        fontSize: 16,
        fontFamily: fontFamily.medium,
    },
    bottunth: {
        backgroundColor: ColorsConstant.btnColor,
        borderRadius: 8,
        height: 40,
        justifyContent: 'center',
        width: screenWidth -32,
        marginBottom:16
        // flex:1
    },
    errText: {
        color: ColorsConstant.Error,
        fontSize: 12,
        fontFamily: fontFamily.Regular,
        marginTop:-10,
        height:30,
        marginLeft:10,
        width:screenWidth-32
    },
    imagesI: {
        width: 25,
        height: 25
    },

    TextBold: {
        color: ColorsConstant.White,
        fontSize: 18,
        fontFamily: fontFamily.semiBold,
    },
    modalManView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-end"
    },
    modalLhare: {
        backgroundColor: c.Dark,
        opacity: 0.7,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    modalView: {
        backgroundColor: c.White,
        borderRadius: 1,
        // padding: 10,
        width: screenWidth-32,
        borderRadius:10
    },
    textStylemodal: {
        color: c.Black,
        padding: 10,
        fontFamily:fontFamily.medium
    },
    textitem:{
        color: c.bluedark,
        fontSize:12,
        fontFamily:fontFamily.medium
    },
    TouchableView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // backgroundColor: c.White,
        // borderWidth:0.5,
        marginTop:10
    },
    texttop: {
        color: ColorsConstant.Black,
        fontSize:12,
        fontFamily:fontFamily.medium
    },
    Opacitytabs:{
        width:40,
        height:40,
        alignItems:'center',
        justifyContent:'center'
    }

})