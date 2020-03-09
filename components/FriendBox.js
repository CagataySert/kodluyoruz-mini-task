import React, { useCallback } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Layout from '../constants/Layout';

const { width } = Layout.window;

const FriendBox = ({ data, navigation }) => {
  const { name, picture } = data;

  const handlePressFriend = useCallback(() => {
    const { phone, email, picture } = data;

    navigation.navigate('User Detail', { phone, email, picture });
  });

  return (
    <View style={styles.friendBox}>
      <TouchableOpacity onPress={handlePressFriend}>
        <Image
          style={{
            height: 40,
            resizeMode: 'contain'
          }}
          source={{
            uri: picture.thumbnail
          }}
        />
        <Text style={styles.friendName}>{name.first}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  friendsSection: {
    flex: 1,
    flexDirection: 'row'
  },
  friendBox: {
    flex: 1,
    margin: 5,
    maxWidth: width / 6
  },
  friendName: { alignSelf: 'center', marginTop: 5, fontSize: 12 }
});

export default FriendBox;
