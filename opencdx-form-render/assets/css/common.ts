import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  customHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B026FF', // Purple color
    textAlign: 'center',
    marginBottom: 8,
  },
  customSubheading: {
    fontSize: 16,
    color: '#B026FF',
    textAlign: 'center',
    marginBottom: 12,
  },
  instructions: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  customButton: {
    backgroundColor: '#B026FF',
    borderRadius: 25,
    padding: 15,
    marginVertical: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  laterText: {
    fontSize: 14,
    color: '#B026FF',
    textAlign: 'center',
    marginTop: 8,
  }
});