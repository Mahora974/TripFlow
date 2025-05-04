import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useLocalSearchParams} from "expo-router";

type Props = {
    onPress: () => void;
};

export default function ViewTrip({ onPress }: Props)  {
    const params = useLocalSearchParams();
    const { id } = params;

    return (
        <ThemedView>
            <ThemedText>
                {id}
            </ThemedText>
        </ThemedView>
    );
}