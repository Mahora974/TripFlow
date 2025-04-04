import { router } from 'expo-router';
import { Text, TextInput, View } from 'react-native';
import { StyleSheet, Image, Platform } from 'react-native';
import { useSession } from './ctx';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { login, user } from '@/database/users_db';
import { setStorageItemAsync, useStorageState } from '@/hooks/useStorageState';

export default function SignIn() {
    const { signIn } = useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        
        <ThemedView style={{ flex: 1, justifyContent: 'center' }}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type='title'>TripFlow</ThemedText>
            </ThemedView>
            <ThemedView style={{ flex: 2, justifyContent: 'center', alignItems:'center' }}>
                <ThemedText>Email</ThemedText>
                <TextInput 
                    style={styles.input}
                    placeholder="ex : nom.prenom@mail.com"
                    onChangeText={newEmail => setEmail(newEmail)}
                    defaultValue={email}
                >
                </TextInput>
                <ThemedText>Password</ThemedText>
                <TextInput 
                    style={styles.input}
                    secureTextEntry
                    onChangeText={newPassword => setPassword(newPassword)}
                    defaultValue={password}
                >
                </TextInput>
                <ThemedText
                    type='link'
                    onPress={async () => {
                        if (await login(email, password)){
                            let logged_user:any =  await user(email)
                            await setStorageItemAsync('user-email',email );
                            await setStorageItemAsync('user-first-name', logged_user.first_name);
                            await setStorageItemAsync('user-last-name', logged_user.last_name);
                            signIn();
                            router.replace('/');
                        } else {
                            throw console.error('Identifiant(s) incorrect(s)');
                        }
                    }}>
                    Sign In
                </ThemedText>
                <ThemedText>
                    Don't have an account ?{' '}
                    <ThemedText
                        type='link'
                        onPress={() => {
                            router.replace('/sign-up');
                        }}>
                        Sign Up
                    </ThemedText>
                </ThemedText>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    input: {
        borderColor: '#fff',
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 5,
        width: '80%'
    },
    titleContainer: {
        flexDirection: 'row',
        padding: 40,
        gap: 8,
    },
});
