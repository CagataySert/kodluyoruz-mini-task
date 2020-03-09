import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import Layout from '../constants/Layout';
import UserInfoBox from '../components/UserInfoBox';
import axios from 'axios';
import baseUrl from '../constants/request';

const { width, height } = Layout.window;

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl);
        setUserData(response.data.results[0]);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {userData && <UserInfoBox navigation={navigation} userData={userData} />}
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
