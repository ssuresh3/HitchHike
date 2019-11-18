//importing necessary libraries
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

export default class StarRating extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: '0'
        };
    }

    render() {
        // console.log(this.state.rating);
        // if (parseInt(this.state.rating) <= 5) {
        //     console.log("hi")
        // }
        return (
            <React.Fragment>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => { this.setState({ rating: '1' }) }}>
                        <Image
                            style={styles.image}
                            source={this.state.rating >= 1 ?
                                require('../../assets/filled_star.png') :
                                require('../../assets/unfilled_star.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { this.setState({ rating: '2' }) }}>
                        <Image
                            style={styles.image}
                            source={this.state.rating >= 2 ?
                                require('../../assets/filled_star.png') :
                                require('../../assets/unfilled_star.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { this.setState({ rating: '3' }) }}>
                        <Image
                            style={styles.image}
                            source={this.state.rating >= 3 ?
                                require('../../assets/filled_star.png') :
                                require('../../assets/unfilled_star.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { this.setState({ rating: '4' }) }}>
                        <Image
                            style={styles.image}
                            source={this.state.rating >= 4 ?
                                require('../../assets/filled_star.png') :
                                require('../../assets/unfilled_star.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { this.setState({ rating: '5' }) }}>
                        <Image
                            style={styles.image}
                            source={this.state.rating >= 5 ?
                                require('../../assets/filled_star.png') :
                                require('../../assets/unfilled_star.png')}
                        />
                    </TouchableOpacity>
                </View>


                <TouchableOpacity style={styles.button}>

                </TouchableOpacity>

            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    image: {
        width: 75,
        height: 75,
    },
    button: {
        width: 300,
        backgroundColor: '#ff8700',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12,
    },
    buttonViewContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

