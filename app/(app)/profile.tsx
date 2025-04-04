
import { ThemedText } from '@/components/ThemedText';
import { useSession } from '../ctx';
import { ThemedView } from '@/components/ThemedView';
import { useStorageState } from '@/hooks/useStorageState';
import { StyleSheet, Image, Platform } from 'react-native';
import { ExternalLink } from '@/components/ExternalLink';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function Index() {
    const { signOut } = useSession();
    return (
        <ThemedView style={{ flex: 1, alignItems: 'center' }}>
            <ThemedView style={styles.titleContainer}>
                <ThemedView>
                    <ThemedText type='title'>{useStorageState('user-first-name')}{useStorageState('user-last-name')}</ThemedText>
                    <ThemedText >{useStorageState('user-email')}</ThemedText>
                </ThemedView>
                <ThemedText
                    type='link'
                    onPress={() => {
                        signOut();
                    }}>
                    Sign Out
                </ThemedText>
            </ThemedView>
            <ThemedView style={ styles.overview}>
                <ThemedView style={styles.separator}><ThemedText style={styles.numbers}>12</ThemedText><ThemedText style={{textAlign:'center'}}>Trips</ThemedText></ThemedView>
                <ThemedView style={styles.separator}><ThemedText style={styles.numbers}>48</ThemedText><ThemedText style={{textAlign:'center'}}>Places</ThemedText></ThemedView>
                <ThemedView style={styles.data}><ThemedText style={styles.numbers}>156</ThemedText><ThemedText style={{textAlign:'center'}}>Photos</ThemedText></ThemedView>
            </ThemedView>
            <ThemedView style={{marginTop:45, width:'90%'}}>
                <ThemedView style={styles.menuItem}>
                    <ThemedView style={styles.menuIcon}>
                        <IconSymbol size={25} name="place.fill" color='#1eaae9' />
                    </ThemedView>
                    <ThemedView>
                        <ThemedText style={{fontWeight:'700'}}>Saved Places</ThemedText>
                        <ThemedText>View and manage your saved destinations</ThemedText>
                    </ThemedView>
                </ThemedView>
                <ThemedView style={styles.menuItem}>
                    <ThemedView style={styles.menuIcon}>
                        <IconSymbol size={25} name="notifications.fill" color='#1eaae9' />
                    </ThemedView>
                    <ThemedView>
                        <ThemedText style={{fontWeight:'700'}}>Notifications</ThemedText>
                        <ThemedText>Manage your notifications preferences</ThemedText>
                    </ThemedView>
                </ThemedView>
                <ThemedView style={styles.menuItem}>
                    <ThemedView style={styles.menuIcon}>
                        <IconSymbol size={25} name="credit.card" color='#1eaae9' />
                    </ThemedView>
                    <ThemedView>
                        <ThemedText style={{fontWeight:'700'}}>Payment Methods</ThemedText>
                        <ThemedText>Manage your payment options</ThemedText>
                    </ThemedView>
                </ThemedView>
                <ThemedView style={styles.menuItem}>
                    <ThemedView style={styles.menuIcon}>
                        <IconSymbol size={25} name="shield.fill" color='#1eaae9' />
                    </ThemedView>
                    <ThemedView>
                        <ThemedText style={{fontWeight:'700'}}>Privacy & Security</ThemedText>
                        <ThemedText>Control your privacy settings</ThemedText>
                    </ThemedView>
                </ThemedView>
                <ThemedView style={styles.menuItem}>
                    <ThemedView style={styles.menuIcon}>
                        <IconSymbol size={25} name="help.outline" color='#1eaae9' />
                    </ThemedView>
                    <ThemedView>
                        <ThemedText style={{fontWeight:'bold'}}>Help & Support</ThemedText>
                        <ThemedText>Get help with your account</ThemedText>
                    </ThemedView>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    overview: {
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'row',
        width: '80%',
        backgroundColor: '#f8fafc',
        borderRadius:7,
        padding:15,
    },
    data :{
        backgroundColor: 'transparent',
        padding:25,
    },
    separator :{
        backgroundColor: 'transparent',
        padding:25,
        borderRightColor: '#e9eef3',
        borderRightWidth:1,
    },
    titleContainer: {
        margin: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        gap: 8,
    },
    numbers: {
        color: '#0ea5e9',
        fontSize: 24,
        fontWeight: "900",
        textAlign: 'center'
    },
    menuItem: {
        marginTop:10,
        borderRadius: 5,
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor : "#e9eef3",
        paddingBottom : 10
    },
    menuIcon:{
        backgroundColor: "#f0f9ff",
        borderRadius:125,
        padding:5,
        marginRight: 20
    },
  });
