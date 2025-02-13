import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownComponentProps } from "@/types/interfaces";
import AntDesign from "@expo/vector-icons/AntDesign";

const DropdownComponent = ({
  data,
  selectValue,
  setSelectValue,
}: DropdownComponentProps) => {
  const [isFocus, setIsFocus] = useState(false);

  const transformedData = data.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const renderLabel = () => {
    return (
      <Text style={[styles.label, { color: "#0057D9" }]}>Tipo de Urgencia</Text>
    );
  };

  const renderItem = (item: { label: string; value: number }) => (
    <View style={styles.item} key={item.value}>
      <Text style={styles.textItem}>{item.label}</Text>
      {item.value === selectValue && (
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "#0057D9" }]}
        placeholderStyle={[styles.placeholderStyle, { color: "#0057D9" }]}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={transformedData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={
          !selectValue
            ? "Seleccionar"
            : transformedData.find((item) => item.value === selectValue)?.label
        }
        value={selectValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => setSelectValue(item.value)}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 20,
    top: 5,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  dropdown: {
    marginTop: 16,
    height: 50,
    backgroundColor: "white",
    borderColor: "#0057D9",
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: { flex: 1, fontSize: 16 },
  placeholderStyle: { fontSize: 16 },
  selectedTextStyle: { fontSize: 16 },
  iconStyle: { width: 20, height: 20 },
  inputSearchStyle: { height: 40, fontSize: 16 },
});

export default DropdownComponent;
