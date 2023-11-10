import { Button } from '@rneui/themed'
import React from 'react'
import { Text, View } from 'react-native'

const Header = ({ title }) => {
    return (
        <View style={{ padding: 16, backgroundColor: "red", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{fontWeight: '700'}}>{title}</Text>
            <Button
                size={'sm'}
                buttonStyle={{ paddingHorizontal: 20, backgroundColor: 'purple' }}
                containerStyle={{ borderRadius: 50 }}
                titleStyle={{ fontSize: 10 }}
                title={'Buy Credits'}
            />
        </View>
    )
}

export default Header