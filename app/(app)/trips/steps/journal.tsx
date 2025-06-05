import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ScrollView, Button, Image, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { JSX, useEffect, useState } from 'react';
import { getTrip } from '@/database/trips_db';
import { getStorageItemAsync } from '@/hooks/useStorageState';
import { router, useLocalSearchParams } from 'expo-router';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import { createStep } from '@/database/steps_db';

type Props = {
    onPress: () => void;
};

export default function Journal({ onPress }: Props)  {
    const defaultStyles = useDefaultStyles();
    const today = new Date();
    const params = useLocalSearchParams();
    const { id } = params;
    const [trip, setTrip] = useState();
    const [placeName, setPlaceName] = useState('');
    const [placeLat, setPlaceLat] = useState('');
    const [placeLon, setPlaceLon] = useState('');
    const [departure, setDepart] = useState<DateType | undefined>();
    const [retur, setReturn] = useState<DateType | undefined>();
    const [description, setDescription] = useState('');

    useEffect(() => {
        async function Trip() {
            setTrip(await getTrip(Number(id)));
        }
        Trip();
    }, [id]);

    return (
        <ScrollView>

            <ThemedView style={{ flex: 1, justifyContent: 'center' }}>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type='title'>Add an entry to the journal</ThemedText>
                </ThemedView>
                <ThemedView style={{ flex: 2, justifyContent: 'center', alignItems:'center' }}>
                    <ThemedText>Description</ThemedText>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={newLabel => setDescription(newLabel)}
                        defaultValue={description}
                    >
                    </TextInput>

                    <ThemedText
                        type='link'
                        onPress={async () => {
                            const user =await getStorageItemAsync('user-email');
                            if (user){
                                if (await createStep(trip.id, placeName, Number(placeLat), Number(placeLon), departure?.toString(), retur?.toString(), description)){
                                    router.replace('/trips/trip_card?id='+trip.id);
                                }
                            }
                        }}>
                        Create
                    </ThemedText>
                </ThemedView>
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    input: {
        borderColor: '#000',
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 5,
        width: '80%'
    },
    circleButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 42,
        backgroundColor: '#0ea5e9',
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

