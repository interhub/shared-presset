import React, {useState} from 'react'
import {Button, View} from 'react-native';
import ShareBox from "./Modal";

export default () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <View style={{flex: 1}}>
                <ShareBox open={open}/>
                <Button onPress={() => setOpen(!open)} title={'START'}/>
            </View>
        </>
    );
}