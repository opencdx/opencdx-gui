import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Text } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Endpoints } from "../../utils/axios/apiEndpoints";

const User = ({ navigation }) => {
  const [buttonTitles, setButtonTitles] = useState([]);
  useEffect(() => {
    const fetchQuestionnaireList = async () => {
      try {
        const response = await Endpoints.questionnaireList({
          pagination: {
            pageSize: 30,
            sortAscending: true,
          },
          updateAnswers: true,
        });
        const { questionnaires } = response.data;
        questionnaires.sort(
          (a, b) =>
            new Date(b.modified).getTime() - new Date(a.modified).getTime()
        );
        setButtonTitles(questionnaires);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestionnaireList();
  }, []);
  return Platform.OS === "web" ? (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell1, styles.headerText]}>Title</Text>
          <Text style={[styles.headerCell2, styles.headerText]}>
            Last Updated
          </Text>
          <Text style={[styles.headerCell3, styles.headerText]}>Status</Text>
          <Text style={[styles.headerCell4, styles.headerText]}>View</Text>
        </View>
        {buttonTitles.map((questionnaire, index) => (
          <View
            key={index}
            style={[
              styles.row,
              index % 2 === 0 ? styles.rowEven : styles.rowOdd,
            ]}
          >
            <Text style={[styles.cell, { width: "40%" }]}>
              {questionnaire.title}
            </Text>
            {/* Increased width for first cell */}
            <Text style={styles.cell}>
              {new Date(questionnaire.modified).toLocaleDateString()}
            </Text>
            <Text style={styles.cell}>{questionnaire.status}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ListQuestion", { questionnaire })
              }
            >
              <View style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      {buttonTitles.map((questionnaire, index) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ListQuestion", {
              questionnaire: questionnaire,
            })
          }
        >
          <View style={styles.sectionWrapper}>
            <Text variant="titleMedium" key={index}>
              {questionnaire.title}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowColor: "#000",
    backgroundColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    ...Platform.select({
      web: {
        width: "80%",
        margin: "auto",
        justifyContent: "center",
      },
      default: {},
    }),
  },
  table: {
    width: "100%", // Full width
    flex: 1, // Allow table to grow if necessary
    backgroundColor: "#fff",
    shadowColor: "#000", // Black shadow
    shadowOffset: {
      width: 0, // No horizontal shadow
      height: 2, // Vertical shadow
    },

    shadowOpacity: 0.25, // Less shadow
    shadowRadius: 3.84, // Shadow size
    elevation: 5, // Lower shadow on Android
    margin: 10, // Margin around the table
    padding: 10, // Padding for the table
    borderRadius: 5, // Rounded corners for the table
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1", // Light gray header background
    borderBottomWidth: 1, // Bottom border for header
    borderBottomColor: "#ddd",
    alignItems: "center", // Center header cells vertically
  },
  headerCell1: {
    flex: 1, // Distribute header cells equally
    justifyContent: "center", // Center content horizontally
    alignItems: "center", // Center content vertically (redundant but harmless)
    margin: 10, // Padding for header cells
    width: "40%", // Full width for header cells
  },
  headerCell2: {
    flex: 1, // Distribute header cells equally
    justifyContent: "center", // Center content horizontally
    alignItems: "center", // Center content vertically (redundant but harmless)
    margin: 10, // Padding for header cells
    width: "20%", // Full width for header cells
  },
  headerCell3: {
    flex: 1, // Distribute header cells equally
    justifyContent: "center", // Center content horizontally
    alignItems: "center", // Center content vertically (redundant but harmless)
    margin: 10, // Padding for header cells
    width: "20%", // Full width for header cells
  },
  headerCell4: {
    flex: 1, // Distribute header cells equally
    justifyContent: "center", // Center content horizontally
    alignItems: "center", // Center content vertically (redundant but harmless)
    margin: 10, // Padding for header cells
    width: "20%", // Full width for header cells
  },
  headerText: {
    fontWeight: "bold", // Bold text for headers
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1, // Border for each row
    borderBottomColor: "#eee", // Light gray border color
    padding: 10, // Padding for each row
  },
  rowEven: {
    backgroundColor: "#f8f8f8", // Light gray background for even rows
  },
  rowOdd: {
    backgroundColor: "#fff", // White background for odd rows
  },
  cell: {
    flex: 1, // Distribute cells equally
    justifyContent: "flex-start", // Align cell content to the left
    padding: 5, // Adjust padding as needed
  },
  viewButton: {
    backgroundColor: "#007bff", // Blue background for View button
    color: "#fff", // White text color
    padding: 8, // Padding for button
    borderRadius: 5, // Rounded corners for button
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    margin: 5, // Margin around button
  },
  viewButtonText: {
    fontWeight: "bold", // Bold text for View button
    color: "#fff", // White text color
  },

  sectionWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "paleturquoise",
    padding: 10,
    margin: 5,
  },
  leftSection: {
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    ...Platform.select({
      web: {
        width: 400,
      },
      default: {
        width: "100%",
      },
    }),
  },
});

export default User;
