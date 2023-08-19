import { StyleSheet,Text, View,} from "react-native";
import React, { useRef, useState } from "react";
import { ColorsConstant } from "../../constants/Colors.constant";
import { Dropdown } from "react-native-element-dropdown";
function DropDownCom(props) {
    const { name, placeholder, value, setName, setId, list, onPress, id } =
        props;
    let identy =useRef(name);
    const [selectValue, setSelectValue] = useState("");
    return (
        <View>
            <View>
                <Text
                    style={{
                        color: "black",
                        fontWeight: "bold",
                    }}
                >
                    {name}
                </Text>
            </View>
            <View style={styles.dropdownContainer}>
                <Dropdown
                //ref={identy}
                    style={[
                        styles.dropdown,
                        {
                            borderColor: ColorsConstant.themeColor,
                        },
                    ]}
                    itemTextStyle={styles.textstyledropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={list}
                    maxHeight={250}
                    labelField="label"
                    valueField="value"
                    placeholder={placeholder}
                    value={value == "" || value == null ? selectValue : value}
                    onChange={(item) => {
                        setSelectValue(item.value);
                        setName(item.label);
                        setId(item.value);
                        onPress(item.value);
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        backgroundColor: ColorsConstant.Black,
        marginBottom: 50,
        marginVertical: 5,
    },
    dropdownContainer: {
        paddingVertical: 5,
    },
    dropdown: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        borderColor: ColorsConstant.themeColor,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: "absolute",
        backgroundColor: ColorsConstant.White,
        left: 22,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        color: ColorsConstant.Black,
    },
    placeholderStyle: {
        fontSize: 16,
        color: ColorsConstant.gary,
        paddingHorizontal: 5,
    },
    textstyledropdown: {
        fontSize: 16,
        color: ColorsConstant.Black,
        // borderWidth: 1,
        // borderColor: ColorsConstant.themeColor,
        marginVertical: -20,
    },
    selectedTextStyle: {
        // fontSize: 16,
        color: ColorsConstant.Black,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
});
export default DropDownCom;

