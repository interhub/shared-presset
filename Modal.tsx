import {nodeFromRef, SharedElement, SharedElementTransition} from 'react-native-shared-element';
import {Animated, Image, StyleSheet, View} from "react-native";
import React, {useEffect} from "react";

let startAncestor: any;
let startNode: any;
let endAncestor: any;
let endNode: any;
const position = new Animated.Value(0);
let i = 0

const setState = () => {
    // Animated.timing(position, {
    //     toValue: i ? (--i) : (++i),
    //     duration: 1000,
    //     useNativeDriver: true
    // }).start();
    Animated.spring(position, {
        toValue: i ? (--i) : (++i),
        useNativeDriver: false,
        damping: 1000,
        // speed: 0.2
    }).start()
}

const ElementOne = () => {
    return <View style={{flex: 1,}}
                 ref={ref => startAncestor = nodeFromRef(ref)}>
        <SharedElement style={{width: 200, height: 150}}
                       onNode={node => startNode = node}>
            <Image style={[styles.image, {borderRadius: 200, overflow: "hidden"}]} source={require('./assets/x.png')}/>
        </SharedElement>
    </View>
}

const ElementTwo = () => {
    return <View style={{flex: 2,}} ref={ref => endAncestor = nodeFromRef(ref)}>
        <SharedElement style={{width: 400, height: 300}} onNode={node => endNode = node}>
            <Image style={styles.image} source={require('./assets/x.png')}/>
        </SharedElement>
    </View>
}


const ElementTree = ({open}: { open: boolean }) => {

    useEffect(() => {
        setState()
    }, [open])

    return <View style={[StyleSheet.absoluteFill,]}>
        <SharedElementTransition
            start={{
                node: startNode,
                ancestor: startAncestor
            }}
            end={{
                node: endNode,
                ancestor: endAncestor
            }}
            position={position}
            animation='move'
            resize='auto'
            align='auto'
        />
    </View>
}

const ShareBox = ({open}: { open: boolean }) => {
    return <>
        <ElementOne/>
        <ElementTwo/>
        <ElementTree open={open}/>
    </>
}
export default ShareBox

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%'
    }
})