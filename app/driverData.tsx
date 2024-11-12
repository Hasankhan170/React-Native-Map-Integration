
import React, { useEffect, useState } from 'react'
import { getDocs,collection } from 'firebase/firestore'
import { db } from '@/config/config'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const indriveData = () => {

    const [allData, setAllData] = useState([])

    const getAllData = async ()=>{
        try {
            const snapshot = await getDocs(collection(db,"users"))
            const driverData:any = []

            snapshot.forEach((doc)=>{
                const driver = { id: doc.id, ...doc.data() };
                driverData.push(driver);
            })
            setAllData(driverData)
        } catch (error) {
            console.log(error)  
        }
    }

    useEffect(()=>{
        getAllData()
    },[])

    const handleBookRide = (driverName: string) => {
        Alert.alert("Your ride is confirmed!", `You have booked a ride with ${driverName}.`);
    };
    const [isBooked, setIsBooked] = useState();
  return (
    <View style={styles.container}>
   {allData.map((driver, index) => (
     
    <View key={index} style={styles.card}>
        <Text style={styles.cardTitle}>Driver {index + 1}</Text>
        <Text style={styles.cardText}>Name: {driver.name}</Text>
        <Text style={styles.cardText}>Phone: {driver.number}</Text>
        <Text style={styles.cardText}>Address: {driver.address}</Text>
        {driver.carCompany && (
                            <View>
                                <Text>Car Details:</Text>
                                <Text>Company: {driver.carCompany}</Text>
                                <Text>Model: {driver.carModel}</Text>
                                <Text>Year: {driver.carYear}</Text>
                            </View>
                        )}
                        {driver.BikeCompany && (
                            <View>
                                <Text  >Bike Details:</Text>
                                <Text>Company: {driver.BikeCompany}</Text>
                                <Text>Model: {driver.BikeModel}</Text>
                                <Text>Year: {driver.BikeYear}</Text>
                            </View>
                        )}

        

              <TouchableOpacity
                style={styles.button}
                onPress={() => {handleBookRide}} >
                <Text style={styles.buttonText}>Book Ride</Text>
              </TouchableOpacity>
            
             
          
    </View>
))}
</View>
);
  
}

export default indriveData


const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        marginBottom: 15,
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardText: {
        fontSize: 14,
        marginBottom: 5,
    },
    button: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});
