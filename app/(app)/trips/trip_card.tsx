import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import { deleteTrip, getTrip } from '@/database/trips_db';
import { getUser } from '@/database/users_db';
import { getStorageItemAsync } from '@/hooks/useStorageState';
import {router, useLocalSearchParams} from "expo-router";
import { useEffect, useState } from 'react';
import trips from '.';
import { deleteStep, getTripSteps } from '@/database/steps_db';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Pressable, Image, ScrollView, Platform } from 'react-native';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import MapView from 'react-native-maps';
import { TextInput } from 'react-native-gesture-handler';
import { createList, getTripList, updateList } from '@/database/lists_db';
import Checkbox from 'expo-checkbox';

type Props = {
    onPress: () => void;
};

export default function ViewTrip({ onPress }: Props)  {
    const params = useLocalSearchParams();
    const { id } = params;
    const [trip, setTrip] = useState();
    const [infos, setInfos] = useState(<ThemedText >No Loaded Trip...</ThemedText>);
    const [subtitle, setSubTitle] = useState(<ThemedText >No Upcoming Step...</ThemedText>);
    const [steps, setSteps] = useState(null);
    const [steps_text, setStepsText] = useState('');
    const [label, setLabel] = useState('');
    const [lists, setLists] = useState(null);
    const [lists_text, setListsText] = useState('');

        useEffect(() => {
            async function stepsText() {
                setTrip(await getTrip(Number(id)));
                setSteps(await getTripSteps(trip.id))
                const { start_date, end_date } = trip;
                let startTrip = (new Date(start_date)).toLocaleString().split(' ')[0];
                let endTrip = (new Date(end_date)).toLocaleString().split(' ')[0];
                setInfos(
                    <ThemedView >
                        <ThemedText type='title'>{trip.title}</ThemedText>
                        <ThemedText>{startTrip} - {endTrip}</ThemedText>
                    </ThemedView>
                );
    
                if (steps && steps.length > 0){
                    setSubTitle(<ThemedText type='subtitle' >Upcoming Steps</ThemedText>);
                    setStepsText(await steps.map((step) => {
                        const { start_date, end_date, description } = step;
                        let start = (new Date(start_date)).toLocaleString().split(' ')[0];
                        let end = (new Date(end_date)).toLocaleString().split(' ')[0];
                        return (
                            <ThemedView key={step.id} style={styles.tripCard}>
                                <ThemedView >
                                    <ThemedView style={styles.cardHeader}>
                                        <ThemedText>{step.place_name}</ThemedText>
                                        <ThemedText
                                            type='link'
                                            onPress={async () => {
                                                if (await deleteStep(step.id)){
                                                    router.replace('/trips/trip_card?id=' + trip.id);
                                                }
                                            }}>
                                            X
                                        </ThemedText>
                                    </ThemedView>
                                    <ThemedText>{start} - {end}</ThemedText>
                                    <ThemedText>{description}</ThemedText>
                                    <ThemedView  style={styles.cardHeader}>
                                        <ThemedText
                                            type='link'
                                            onPress={async () => {
                                                router.replace('/trips/steps/update?id='+step.id);
                                        }}>
                                            Edit
                                        </ThemedText>
                                        <ThemedText
                                            type='link'
                                            onPress={async () => {
                                                router.replace('/trips/steps/journal?id='+step.id);
                                        }}>
                                            Log in journal
                                        </ThemedText>
                                    </ThemedView>
                                </ThemedView>
                            </ThemedView>)
                    }));
                } 
            }
            stepsText();
        }, [trip]);
    
    useEffect(() => {
        async function listText() {
            setLists(await getTripList(Number(id)));

            if (lists && lists.length > 0){
                setListsText(await lists.map((list) => {
                    return (
                        <ThemedView key={list.id} style={styles.listCard}>
                            <Checkbox
                                value={Boolean(list.checked)}
                                onValueChange={async (check)=>{
                                    list.checked = Number(check)
                                    await updateList(list.id, list.checked)
                                }}
                                color={Boolean(list.checked) ? '#0ea5e9' : undefined}
                                style='textDecoration = line-through'
                            > </Checkbox>
                            <ThemedText>{list.label}</ThemedText>
                        </ThemedView>)
                }));
            } 
        }
        listText();
    }, [trip]);



    return (
    <ScrollView>
        <ThemedView style={{ flex: 1, alignItems: 'center' }}>
            <ThemedView style={styles.titleContainer}>
                {infos}

                <ThemedView style={styles.buttonContainer}>
                    <Pressable style={styles.circleButton} onPress={()=>{
                        router.replace('/trips/steps/add?id='+id)
                    }}>
                        <MaterialIcons name="add" size={25} color="#fff" />
                    </Pressable>
                </ThemedView>
            </ThemedView>

            <ThemedView>
                <ThemedText type='subtitle'>To Do before leaving</ThemedText>
                <ThemedView style={styles.addTODO} >
                    <TextInput 
                        style={styles.input} 
                        onChangeText={newLabel => setLabel(newLabel)}
                        defaultValue={label}
                    >
                    </TextInput>
                    <ThemedText
                        type='link'
                        onPress={async () => {
                            if (await createList(Number(id),label)){
                                router.replace('/trips/trip_card?id='+id);
                            }
                        }}>
                        Create
                    </ThemedText>
                </ThemedView>
                {lists_text}
            </ThemedView>
            <ThemedView>
                {subtitle}
                <ThemedText>Tap the + button to start adding steps</ThemedText>
                {steps_text}
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
    addTODO: {
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        width:'100%',
    },
    tripCard: {
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        width:'100%',
        justifyContent: 'space-between',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        padding: 3
    },
    listCard: {
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        width:'100%',
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
    },
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});