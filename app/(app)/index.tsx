
import { ThemedText } from '@/components/ThemedText';
import { useSession } from '../ctx';
import { ThemedView } from '@/components/ThemedView';

export default function Index() {
    const { signOut } = useSession();
    return (
        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
