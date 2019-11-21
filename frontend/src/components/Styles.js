import { StyleSheet } from 'react-native'
const myRides = StyleSheet.create({   
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
      },
      title: {
        fontSize: 30,
        textAlign: 'center',
        padding: 20,
        marginTop: 20,
        color: '#ff8700',
      },
      rideCard: {
        padding: 20,
        margin: 10,
        marginTop: 0,
        alignSelf: 'stretch',
        shadowRadius: 5
      },
      cardRow: {
        flexDirection: "row",
        justifyContent: "center",
      },



    //   container: {
    //     backgroundColor: 'white',
    //     color: 'black',
    //     padding: 10,
    //     fontSize: 30,
    //     borderColor: 'black',
    //     borderWidth: 2,
    //   },
      displayText: {
        // Setting up Hint Align center.
        textAlign: 'center',
        height: 25,
        backgroundColor: '#FFFFFF',
        fontSize: 20,
      },
      displayText1: {
        // Setting up Hint Align center.
        textAlign: 'center',
        height: 35,
        fontWeight: 'bold',
        backgroundColor: '#FFFFFF',
        //textDecorationLine: 'underline',
        fontSize: 27,
      },

      button: {
        // width: 100, backgroundColor: '#ff8700', borderRadius: 25, marginVertical: 10,
        // paddingVertical: 12, justifyContent: 'center', alignItems: 'center'
        // textAlign: 'center',
        height: 35,
        borderWidth: 2,
        borderColor: '#ff8700',
        borderRadius: 20,
        backgroundColor: '#ff8700',
      },
      buttonText: {
        fontSize: 25,
        fontWeight: '500',
        color: '#FFFFFF',
        textAlign: 'center',
      },

  })

  export {myRides}
   