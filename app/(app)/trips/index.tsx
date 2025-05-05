import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { deleteTrip, tripByUser } from '@/database/trips_db';
import { getStorageItemAsync } from '@/hooks/useStorageState';
import { useEffect, useState } from 'react';
import { getUser } from '../../../database/users_db';
import { getTripSteps } from '@/database/steps_db';
import { useFonts } from 'expo-font';
import { useSession } from '@/app/ctx';


export default function Trips()  {
    const [title, setTitle] = useState(<ThemedText >No Upcoming Trip...</ThemedText>);
    const [trips, setTrips] = useState(null);
    const [trips_text, setTripsText] = useState('');

    useEffect(() => {
        async function tripsText() {
            const email = await getStorageItemAsync('user-email');
            let user;
            if (email)
                user = await getUser(email);

            if (user.id){
                setTrips(await tripByUser(user.id));
            }

            if (trips && trips.length > 0){
                setTitle(<ThemedText type='subtitle' >Upcoming Trips</ThemedText>);
                setTripsText(await trips.map((trip) => {
                    const { id, start_date, end_date } = trip;
                    let start = (new Date(start_date)).toLocaleString().split(' ')[0];
                    let end = (new Date(end_date)).toLocaleString().split(' ')[0];
                    return (
                        <ThemedView key={trip.id} style={styles.tripCard}>
                            {trip.image && <Image source={{ uri: trip.image }} style={{ width: 100, height: 100 }} />}
                            <ThemedView >
                                <ThemedView style={styles.cardHeader}>
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
                                </ThemedView>
                                <ThemedText>{trip.steps} activities</ThemedText>
                                <ThemedText>{start} - {end}</ThemedText>
                                <ThemedText>Trip planning in progress</ThemedText>
                                <ThemedText
                                    type='link'
                                    onPress={async () => {
                                        router.replace('/trips/trip_card?id='+trip.id);
                                    }}>
                                    View details
                                </ThemedText>
                            </ThemedView>
                        </ThemedView>)
                }));
            }
        }

        tripsText();
    }, [trips]);


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
    tripCard: {
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        padding: 3
    },
    cardHeader: {
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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