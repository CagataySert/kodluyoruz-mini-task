import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import Layout from '../constants/Layout';
import FriendBox from '../components/FriendBox';
import baseUrl from '../constants/request';
import axios from 'axios';

const { width, height } = Layout.window;

//utils
const generateRandomNumBetweenZeroAndTen = () => {
  return Math.floor(Math.random() * 10) + 1;
};

const UserInfoBox = ({ userData, navigation }) => {
  const { name, email, phone, picture } = userData;

  //hooks
  const [friendsData, setFriendsData] = useState([]);

  useEffect(() => {
    const fetchFriendsData = async () => {
      const randomNumber = generateRandomNumBetweenZeroAndTen();
      try {
        const response = await axios.get(baseUrl + `?results=${randomNumber}`);
        setFriendsData(response.data.results);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFriendsData();
  }, []);

  return (
    <View style={styles.userBoxWrapper}>
      <View style={styles.mainUserRow}>
        <View style={styles.userPhotoBox}>
          <Image
            style={{
              height: 100,
              resizeMode: 'contain'
            }}
            source={{
              uri: picture.medium
            }}
          />
        </View>
        <View style={styles.userInfo}>
          <Text>{name ? `${name.first} - ${name.last}` : '-'}</Text>
          <Text>{phone ? phone : '-'}</Text>
          <Text>{email ? email : '-'}</Text>
        </View>
      </View>

      <Text
        style={styles.friendsLabel}
      >{`Friends (${friendsData.length})`}</Text>

      <FlatList
        data={friendsData}
        numColumns={4}
        renderItem={({ item }) => (
          <FriendBox navigation={navigation} data={item} />
        )}
        keyExtractor={item => '_' + item.id.value}
      />
    </View>
  );
};

export default UserInfoBox;

const styles = StyleSheet.create({
  userBoxWrapper: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 10,
    flex: 1
  },
  mainUserRow: {
    flexDirection: 'row',
    height: 100
  },
  userPhotoBox: {
    flex: 2,
    borderWidth: 1,
    borderColor: 'black'
  },
  userInfo: {
    flex: 4,
    padding: 10,
    justifyContent: 'space-between'
  },
  friendsLabel: {
    marginBottom: 20,
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600'
  },
  friendBox: {
    flex: 1,
    margin: 5,
    maxWidth: width / 6
  },
  friendName: { alignSelf: 'center', marginTop: 5, fontSize: 12 }
});
