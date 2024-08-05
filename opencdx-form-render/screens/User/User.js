import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Text } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Endpoints } from "../../utils/axios/apiEndpoints";
import { Button, ButtonText } from "@gluestack-ui/themed";

const User = ({ navigation }) => {
  const [buttonTitles, setButtonTitles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const pageSize = 10;
  useEffect(() => {
    const fetchQuestionnaireList = async () => {
      try {
        const response = await Endpoints.questionnaireList({
          pagination: {
            pageNumber: currentPage - 1,
            pageSize,
            sort: "modified", // Assuming "modified" is the sorting field
            sortAscending: true,
          },
          updateAnswers: true,
        });
        const { questionnaires, pagination } = response.data;
        setButtonTitles(questionnaires);
        setTotalPages(pagination.totalPages);
        setTotalRecords(pagination.totalRecords);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestionnaireList();
  }, [currentPage]); // Re
  const handleNextPress = async () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    }
  };
  const handlePreviousPress = async () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      setCurrentPage(previousPage);
    }
  };

  const handleFirstPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(totalPages);
  };
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
        <View style={styles.pagination}>
          <Button
            title="First"
            onPress={handleFirstPage}
            style={styles.button}
            disabled={currentPage === 1} // Disable "First" button on first page
          >
            <ButtonText style={styles.buttonText}>First</ButtonText>
          </Button>

          <Button
            title="Previous"
            onPress={handlePreviousPress}
            style={styles.button}
            disabled={currentPage === 1} // Disable "Previous" button on first page
          >
            <ButtonText style={styles.buttonText}>Previous</ButtonText>
          </Button>

          <Text style={styles.paginationText}>
            Page {currentPage} of {totalPages}
          </Text>

          <Button
            title="Next"
            onPress={handleNextPress}
            style={styles.button}
            disabled={currentPage === totalPages} // Disable "Next" button on last page
          >
            <ButtonText style={styles.buttonText}>Next</ButtonText>
          </Button>

          <Button
            title="Last"
            onPress={handleLastPage}
            style={styles.button}
            disabled={currentPage === totalPages} // Disable "Last" button on last page
          >
            <ButtonText style={styles.buttonText}>Last</ButtonText>
          </Button>
        </View>
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  paginationText: {
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "#f1f1f1",
    padding: 5,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    padding: 5,
  },
  table: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  headerCell1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: "40%",
  },
  headerCell2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: "20%",
  },
  headerCell3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: "20%",
  },
  headerCell4: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: "20%",
  },
  headerText: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    padding: 10,
  },
  rowEven: {
    backgroundColor: "#f8f8f8",
  },
  rowOdd: {
    backgroundColor: "#fff",
  },
  cell: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 5,
  },
  viewButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 8,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  viewButtonText: {
    fontWeight: "bold",
    color: "#fff",
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
});

export default User;
