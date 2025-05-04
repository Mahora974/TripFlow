
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { clearAllTrips, deleteTrip, trip } from '@/database/trips_db';
import { getStorageItemAsync } from '@/hooks/useStorageState';
import { useEffect, useState } from 'react';
import { getUser } from '../../../database/users_db';


export default function Trips()  {
    const [title, setTitle] = useState(<ThemedText>No Upcoming Trip...</ThemedText>);
    const [trips, setTrips] = useState(null);
    const [trips_text, setTripsText] = useState('');
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        async function tripsText() {
            // clearAllTrips();
            const email = await getStorageItemAsync('user-email');
            let user;
            if (email)
                user = await getUser(email);

            if (user.id)
                setTrips(await trip(user.id));

            if (trips && trips.length > 0){
                setTitle(<ThemedText>Upcoming Trips</ThemedText>);
                setTripsText(await trips.map((trip) => {
                    const { start_date, end_date } = trip;
                    let start = (new Date(start_date)).toLocaleString().split(' ')[0];
                    let end = (new Date(end_date)).toLocaleString().split(' ')[0];
                    return (
                        <ThemedView style={styles.tripCard}>
                            <ThemedText>{trip.title}</ThemedText>
                            <ThemedText
                                type='link'
                                onPress={async () => {
                                    if (await deleteTrip(trip.id)){
                                        router.replace('/trips')
                                    }
                                }}>
                                X
                            </ThemedText>
                            <ThemedText>3 activities</ThemedText>
                            <ThemedText>{start} - {end}</ThemedText>
                            <ThemedText>Trip planning in progress</ThemedText>
                            {trip.image && <Image source={{ uri: trip.image }} style={{ width: 200, height: 200 }} />}
                        </ThemedView>)
                }));
            } 
        }
        tripsText();
    }, [trips, refresh]);


    return (
        <ScrollView>

            <ThemedView style={{ flex: 1, alignItems: 'center' }}>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type='title'>My Trips</ThemedText>
                    <ThemedView style={styles.buttonContainer}>
                        <Pressable style={styles.circleButton} onPress={()=>{
                            router.replace('/trips/add')
                        }}>
                            <MaterialIcons name="add" size={25} color="#fff" />
                        </Pressable>
                    </ThemedView>
                </ThemedView>
                <ThemedView>
                    {title}
                <ThemedText>Plan your next adventure</ThemedText>
                <ThemedText>Tap the + button to start planning your next trip</ThemedText>
                    
                    {trips_text}
                </ThemedView>
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    circleButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 42,
        backgroundColor: '#0ea5e9',
    },
    TtripCard: {
        display: 'flex',
    },
    titleContainer: {
        margin: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        gap: 8,
    },
    buttonContainer: {
        width: 40,
        height: 40,
    }
});
