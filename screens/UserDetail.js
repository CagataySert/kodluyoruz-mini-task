import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const UserDetail = ({ route }) => {
  const { phone, email, picture } = route.params;
  return (
    <View style={styles.container}>
      <Image
        style={{
          height: 100,
          resizeMode: 'contain'
        }}
        source={{
          uri: picture.large
        }}
      />
      <Text style={styles.text}>{phone ? phone : '-'}</Text>
      <Text style={styles.text}>{email ? email : '-'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 20
  },
  userImage: {
    borderWidth: 1,
    borderColor: 'black'
  },
  text: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '600',
    margin: 10
  }
});

export default UserDetail;
