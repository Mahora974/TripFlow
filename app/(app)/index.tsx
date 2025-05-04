
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getAllTrips } from '@/database/trips_db';
import { getAllUsers } from '@/database/users_db';
import { getStorageItemAsync } from '@/hooks/useStorageState';
import { useEffect, useState } from 'react';

export default function Index() {
    const [firstName, setFirstName] = useState<string | null>();
    const [lastName, setLastName] = useState<string | null>();

    useEffect(() => {
        const fetchData = async () => {
            const fName = await getStorageItemAsync('user-first-name');
            const lName = await getStorageItemAsync('user-last-name');
            setFirstName(fName);
            setLastName(lName);
        };
        fetchData();
    }, []);

    return (
        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText type='title'>Bonjour, {firstName} {lastName}</ThemedText>
        </ThemedView>
    );
}
