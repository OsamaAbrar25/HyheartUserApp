import { Button } from '@rneui/themed'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import RazorpayCheckout from 'react-native-razorpay';
import Header from '../components/Header';
import { useCreatePaymentOrderMutation, useGetPlansQuery } from '../apis/user';
import { FlatList } from 'react-native';

const BuyCredits = ({ navigation }) => {

  const getPlans = useGetPlansQuery();
  const [createPaymentOrder, createPaymentOrderRes] = useCreatePaymentOrderMutation()

  const handleCreateOrder = (item) => {
    createPaymentOrder({
      id: item.id
    })
  }

  const handlePay = (data) => {
    var options = {
      description: 'Buy credits',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: data.currency,
      key: 'rzp_test_KEmBrgdn1ZFENY',
      amount: data.amount,
      name: 'Hyheart',
      order_id: data.orderId,//Replace this with an order_id created using Orders API.
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
        navigation.navigate("CreditHistoryTab");
      })
      .catch((error) => {
        // handle failure
        console.log(`Error🤣: ${error.code} | ${error.description}`);
      });
  }

  if (createPaymentOrderRes.isSuccess) {
    handlePay(createPaymentOrderRes.data)
    console.log(JSON.stringify(createPaymentOrderRes.data));

  }

  if (createPaymentOrderRes.isError) {
    console.error("Error creating payment order:", createPaymentOrderRes.error);
  }

  return (
    <View>
      <Header title='Buy Credits' />

      <View style={{ paddingHorizontal: 8, paddingVertical: 16 }}>

        {getPlans.isSuccess && (
          <FlatList
            data={getPlans.data}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ marginBottom: 16 }} onPressIn={() => handleCreateOrder(item)} >
                <View style={{ padding: 24, backgroundColor: '#5E449B', borderRadius: 10 }}>
                  <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                    <Text style={{ fontSize: 22, fontWeight: '800', color: 'white' }}> ₹{item.discountPrice}</Text>
                    <Text style={{ textDecorationLine: 'line-through', color: 'white' }}> ₹{item.price} </Text>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white' }}>{item.credits} credits</Text>
                    <Text style={{ fontSize: 10, color: 'silver' }}>*Taxes extra as applicable</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        )}

      </View>

    </View>
  )
}

export default BuyCredits