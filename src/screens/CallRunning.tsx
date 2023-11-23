import { Avatar } from '@rneui/themed'
import React from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';

const CallRunning = () => {
    return (
        <View style={{ backgroundColor: 'silver', height: "100%" }}>
            <View style={{ flexGrow: 1, alignItems: 'center', paddingVertical: 64 }}>
                <Text style={{fontSize: 24, fontWeight: '600', color: "black"}}>Osama Abrar</Text>
                <Text style={{marginBottom: 16}}>02:05:45</Text>
                <Avatar
                    rounded
                    // showEditButton
                    size={'large'}
                    avatarStyle={{ borderWidth: 3, borderColor: 'white' }}
                    source={{
                        uri: 'https://randomuser.me/api/portraits/men/96.jpg',
                    }}
                />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "black", padding: 24 }}>
                <View style={{ backgroundColor: 'silver', paddingHorizontal: 18, paddingVertical: 18, borderRadius: 50 }}><Icon3 name="spatial-audio-off" size={20} color="black" /></View>
                <View style={{ backgroundColor: 'silver', paddingHorizontal: 16, paddingVertical: 16, borderRadius: 50 }}><Icon2 name="mic-off" size={25} color="black" /></View>
                <View style={{ backgroundColor: 'red', paddingHorizontal: 20, paddingVertical: 18, borderRadius: 50 }}><Icon name="phone" size={20} color="white" /></View>
            </View>

        </View>
    )
}

export default CallRunning