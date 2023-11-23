import { Avatar, Button, Divider } from '@rneui/themed'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

const Profile = ({navigation}) => {
    return (
        <View style={{height: '100%'}}>

            <View style={{ backgroundColor: '#FADD9A', padding: 16 }}>
                <Text style={{ fontWeight: '700' }}>My Profile</Text>
            </View>

            <ScrollView>

                <View style={{ padding: 48 }}>
                    <View style={{ alignItems: 'center', marginBottom: 32 }}>
                        <Avatar
                            size={64}
                            rounded
                            source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }}
                        />
                    </View>
                    <Text>Full Name</Text>
                    <Text style={{ color: 'black' }}>Osama Abrar</Text>
                    <Divider style={{ marginVertical: 16 }} />
                    <Text>Email</Text>
                    <Text style={{ color: 'black' }}>weirdsapiens@gmail.com</Text>
                    <Divider style={{ marginVertical: 16 }} />
                    <Text>Gender</Text>
                    <Text style={{ color: 'black' }}>Male</Text>
                    <Divider style={{ marginVertical: 16 }} />
                    <Text>Date of Birth</Text>
                    <Text style={{ color: 'black' }}>12/12/12</Text>
                    <Divider style={{ marginVertical: 16 }} />
                    <Text>Languages</Text>
                    <Text style={{ color: 'black' }}>English, Hindi</Text>
                    <Divider style={{ marginVertical: 16 }} />
                    <Text>City</Text>
                    <Text style={{ color: 'black' }}></Text>
                    <Divider style={{ marginVertical: 16 }} />
                    <Text>State</Text>
                    <Text style={{ color: 'black' }}></Text>
                    <Divider style={{ marginVertical: 16 }} />
                    <Text>Country</Text>
                    <Text style={{ color: 'black' }}>India</Text>
                    <Divider style={{ marginVertical: 16 }} />
                    <Text>Bio</Text>
                    <Text style={{ color: 'black' }}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
                </View>

                <View style={{ alignItems: 'center', marginBottom: 32 }}>
                    <Button
                        size={'md'}
                        buttonStyle={{ backgroundColor: '#5E449B' }}
                        containerStyle={{ borderRadius: 50, width: 250 }}
                        titleStyle={{ fontSize: 14 }}
                        title={'Edit Profile'}
                        onPress={() => navigation.navigate('EditProfile')}
                    />
                </View>

            </ScrollView>

        </View>
    )
}

export default Profile