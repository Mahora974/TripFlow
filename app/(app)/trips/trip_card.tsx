import {useLocalSearchParams} from "expo-router";

type Props = {
    onPress: () => void;
};

export default function ViewTrip({ onPress }: Props)  {
    const params = useLocalSearchParams();
}