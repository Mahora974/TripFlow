import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ScrollView, Button, Image, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { JSX, useEffect, useState } from 'react';
import { getTrip } from '@/database/trips_db';
import { getStorageItemAsync } from '@/hooks/useStorageState';
import { router, useLocalSearchParams } from 'expo-router';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import { createStep, getStep, updateStep } from '@/database/steps_db';

type Props = {
    onPress: () => void;
};

export default function UpdateStep({ onPress }: Props)  {
    const defaultStyles = useDefaultStyles();
    const today = new Date();
    const params = useLocalSearchParams();
    const { id } = params;
    const [step, setStep] = useState();
    const [placeName, setPlaceName] = useState('');
    const [placeLat, setPlaceLat] = useState('');
    const [placeLon, setPlaceLon] = useState('');
    const [departure, setDepart] = useState<DateType | undefined>();
    const [retur, setReturn] = useState<DateType | undefined>();
    const [description, setDescription] = useState('');

    useEffect(() => {
        async function Trip() {
            setStep(await getStep(Number(id)));
            if (step){
                setPlaceName(step.place_name);
                setPlaceLat(step.place_lat);
                setPlaceLon(step.place_lon);
                setDepart(new Date(step.start_date));
                setReturn(new Date(step.end_date));
                setDescription(step.description);
            }
        }
        Trip();
    }, [step]);

    return (
        <ScrollView>

            <ThemedView style={{ flex: 1, justifyContent: 'center' }}>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type='title'>Update a Step</ThemedText>
                </ThemedView>
                <ThemedView style={{ flex: 2, justifyContent: 'center', alignItems:'center' }}>
                    <ThemedText>Step's place name</ThemedText>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={newLabel => setPlaceName(newLabel)}
                        defaultValue={placeName}
                    >
                    </TextInput>
                    <ThemedText>Step's place latitude</ThemedText>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={newLabel => setPlaceLat(newLabel)}
                        defaultValue={placeLat}
                    >
                    </TextInput>
                    <ThemedText>Step's place longitude</ThemedText>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={newLabel => setPlaceLon(newLabel)}
                        defaultValue={placeLon}
                    >
                    </TextInput>
                    <ThemedText>Trip dates</ThemedText>
                    <DateTimePicker
                        mode="range"
                        minDate={today}
                        startDate={departure}
                        endDate={retur}
                        onChange={({ startDate, endDate }) => {
                            if (startDate) {
                                setDepart(startDate)
                            }                    
                            if (endDate) {
                                setReturn(endDate);
                            }
                        }}
                        styles={defaultStyles}
                    /> 
                    <ThemedText>Departure : {departure?.toLocaleDateString() || 'Undefined'}</ThemedText>
                    <ThemedText>Return : {retur?.toLocaleDateString() || 'Undefined'}</ThemedText>

                    
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
                                if (await updateStep(placeName, Number(placeLat), Number(placeLon), departure?.toString(), retur?.toString(), description, id)){
                                    router.replace('/trips/trip_card?id='+step.id_trip);
                                }
                            }
                        }}>
                        Update
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

