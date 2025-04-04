
import { ThemedText } from '@/components/ThemedText';
import { useSession } from '../ctx';
import { ThemedView } from '@/components/ThemedView';
import { useStorageState } from '@/hooks/useStorageState';

export default function Index() {
    const { signOut } = useSession();
    return (
        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText type='title'>Bonjour, {useStorageState('user-first-name')}{useStorageState('user-last-name')}</ThemedText>
            <ThemedText
                type='link'
                onPress={() => {
                    signOut();
                }}>
                Sign Out
            </ThemedText>
        </ThemedView>
    );
}
