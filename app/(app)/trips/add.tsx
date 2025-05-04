import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ScrollView, Button, Image, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { create } from '@/database/trips_db';
import { getStorageItemAsync } from '@/hooks/useStorageState';
import { router } from 'expo-router';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import { isDayjs } from 'dayjs';
import * as ImagePicker from 'expo-image-picker';

type Props = {
    onPress: () => void;
};

export default function AddTrip({ onPress }: Props)  {
    const defaultStyles = useDefaultStyles();
    const today = new Date()
    const [label, setLabel] = useState('');
    const [departure, setDepart] = useState<DateType | undefined>();
    const [retur, setReturn] = useState<DateType | undefined>();
    const [image, setImage] = useState('');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri); 
        }
    };

    return (
        <ScrollView>

            <ThemedView style={{ flex: 1, justifyContent: 'center' }}>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type='title'>Add a trip</ThemedText>
                </ThemedView>
                <ThemedView style={{ flex: 2, justifyContent: 'center', alignItems:'center' }}>
                    <ThemedText>Trip's name</ThemedText>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={newLabel => setLabel(newLabel)}
                        defaultValue={label}
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
                    <Button title="Cover image" onPress={pickImage} />
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    <ThemedText
                        type='link'
                        onPress={async () => {
                            const user =await getStorageItemAsync('user-email');
                            if (user){
                                console.log(departure)
                                if (await create(user, label, departure?.toString(), retur?.toString(), image)){
                                    router.replace('/trips');
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
