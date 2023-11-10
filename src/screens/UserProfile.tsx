import React from 'react'
import { Text, View } from 'react-native'

const UserProfile = () => {
    return (
        <View>
            <View style={{ height: 200, backgroundColor: "red" }}>

            </View>

            <View style={{padding: 16}}>
                <Text style={{color: "black", fontWeight: 700}}>Osama Abrar</Text>
                <Text style={{fontSize: 12}}>Male | 18-25 Years</Text>
                <Text style={{marginTop: 8}}>Bio</Text>
                <Text style={{fontSize: 12}}>This is my bio</Text>
            </View>
        </View>
    )
}

export default UserProfile