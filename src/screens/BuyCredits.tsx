import { Button } from '@rneui/themed'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import RazorpayCheckout from 'react-native-razorpay';
import Header from '../components/Header';

const BuyCredits = () => {

  const handlePay = () => {
    var options = {
      description: 'Buy credits',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_KEmBrgdn1ZFENY',
      amount: '5000',
      name: 'Acme Corp',
      order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
      prefill: {
        email: 'osama@example.com',
        contact: '9191919191',
        name: 'Osama Abrar'
      },
      theme: { color: '#53a20e' }
    }
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        console.log(`Success❤️: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        // handle failure
        console.log(`Error🤣: ${error.code} | ${error.description}`);
      });
  }

  return (
    <View>
      <Header title='Buy Credits' />

      <View style={{ paddingHorizontal: 8, paddingVertical: 16 }}>

        <TouchableOpacity onPressIn={() => handlePay()} >
          <View style={{ padding: 24, backgroundColor: '#5E449B', borderRadius: 10 }}>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <Text style={{ fontSize: 22, fontWeight: '800', color: 'white' }}> ₹49.00</Text>
              <Text style={{ textDecorationLine: 'line-through', color: 'white' }}> ₹55.00 </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: 'white' }}> 40</Text>
              <Text style={{ fontSize: 10, color: 'silver' }}>*Taxes extra as applicable</Text>
            </View>
          </View>
        </TouchableOpacity>

      </View>

    </View>
  )
}

export default BuyCredits