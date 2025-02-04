import DropdownComponent from "@/components/Dropdown";
import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { Card, Divider } from "react-native-paper";

import JoinBoneIcon from "@/assets/images/Joints_Bone.png";
import Avatar from "@/assets/images/face_24px.png";
import AnestesiaIcon from "@/assets/images/Icon_Anestesia.png";
import CardioIcon from "@/assets/images/Icon_Cardio.png";

const PatientCard = () => {
  const [urgencyTypes, setUrgencyTypes] = useState<
    { id: number; name: string }[]
  >([]);
  const [selectedUrgency, setSelectedUrgency] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUrgencyTypes = async () => {
      try {
        const response = await fetch(
          "https://wisemed-interview.s3.us-east-2.amazonaws.com/react-native/emergency-kinds.json"
        );

        if (!response.ok) throw new Error("Error al obtener los datos");

        const data = await response.json();
        console.log("Datos recibidos:", data);

        if (Array.isArray(data.emergencyKinds)) {
          setUrgencyTypes(data.emergencyKinds);
        } else {
          console.error("La respuesta no contiene un array:", data);
          setUrgencyTypes([]);
        }
      } catch (error) {
        console.error("Error al obtener los tipos de urgencia:", error);
        Alert.alert("Error", "No se pudo cargar la lista de urgencias");
        setUrgencyTypes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUrgencyTypes();
  }, []);

  const memoizedUrgencyTypes = useMemo(() => urgencyTypes, [urgencyTypes]);

  return (
    <Card style={styles.card}>
      <Card.Title
        title="Traumatología"
        subtitle="Dr. José Pedro Sans"
        titleStyle={styles.cardTitle}
        subtitleStyle={styles.cardSubtitle}
        style={styles.cardHeader}
        right={() => <Image source={JoinBoneIcon} style={styles.iconImage} />}
      />
      <Divider />
      <Card.Content style={{ marginTop: 12 }}>
        <View style={styles.row}>
          <Image source={Avatar} style={styles.avatar} />
          <View>
            <Text style={styles.patientName}>Jorge Avendaño Pérez</Text>
            <Text style={styles.patientAge}>35 años</Text>
          </View>
        </View>
        <Text style={styles.label}>
          <Text style={styles.bold}>Ficha médica:</Text> 77884
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Diagnóstico:</Text> Calcificación Talón
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Intervención:</Text> Extirpación en talón
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Evaluación preanestésica:</Text> Sí
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Tiempo de solicitud:</Text> 3 días
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Suspensiones:</Text> 2
        </Text>

        <View style={styles.iconsRow}>
          <Image source={CardioIcon} style={styles.icon} />
          <Image source={AnestesiaIcon} style={styles.icon} />
        </View>
      </Card.Content>

      <Card.Content style={styles.urgencyCard}>
        <Text style={styles.bold}>Tipo de Urgencia</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#0057D9" />
        ) : (
          <DropdownComponent
            data={memoizedUrgencyTypes}
            selectValue={selectedUrgency}
            setSelectValue={setSelectedUrgency}
          />
        )}
      </Card.Content>
    </Card>
  );
};

const App = () => (
  <>
    <ScrollView contentContainerStyle={styles.container}>
      <PatientCard />
    </ScrollView>
  </>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0057D9",
    overflow: "hidden",
    elevation: 4,
    marginBottom: 15,
  },
  cardHeader: {
    backgroundColor: "#0057D9",
  },
  cardTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  cardSubtitle: {
    color: "#fff",
    fontSize: 16,
  },
  iconImage: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 24,
    height: 24,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 12,
  },
  patientAge: {
    fontSize: 14,
    marginLeft: 12,
  },
  label: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 4,
    color: "#000",
  },
  bold: {
    color: "#154FBF",
    fontWeight: "regular",
    fontSize: 14,
  },
  iconsRow: {
    flexDirection: "row",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  urgencyCard: {
    marginTop: 10,
  },
});

export default App;
