import { router } from 'expo-router';
import { Text, TextInput, View } from 'react-native';
import { StyleSheet, Image, Platform } from 'react-native';
import { useSession } from './ctx';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { create, getUser } from '@/database/users_db';
import { setStorageItemAsync } from '@/hooks/useStorageState';

export default function SignUp() {
    const { signIn } = useSession();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        
        <ThemedView style={{ flex: 1, justifyContent: 'center' }}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type='title'>Sing up on TripFlow</ThemedText>
            </ThemedView>
            <ThemedView style={{ flex: 2, justifyContent: 'center', alignItems:'center' }}>
                <ThemedText>First Name</ThemedText>
                <TextInput 
                    style={styles.input}
                    onChangeText={newFname => setFirstName(newFname)}
                    defaultValue={first_name}
                >
                </TextInput>
                <ThemedText>Last Name</ThemedText>
                <TextInput 
                    style={styles.input}
                    onChangeText={newLname => setLastName(newLname)}
                    defaultValue={last_name}
                >
                </TextInput>
                <ThemedText>Email</ThemedText>
                <TextInput 
                    inputMode='email'
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
                        if (await getUser(email) != null){
                            console.error('Cette addresse mail est déjà associée à un compte. Si vous posséder déjà un compte, merci de vous connecter')
                        }else {
                            if (await create(first_name, last_name, email, password)){
                                await setStorageItemAsync('user-email',email );
                                await setStorageItemAsync('user-first-name', first_name);
                                await setStorageItemAsync('user-last-name', last_name);
                                signIn();
                                router.replace('/');
                            }
                        }
                        
                    }}>
                    Sign Up
                </ThemedText>
                <ThemedText>
                    You already have an account ?{' '}
                    <ThemedText
                        type='link'
                        onPress={() => {
                            router.replace('/sign-in');
                        }}>
                        Sign In
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
