import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Layout from '../constants/Layout';
import UserInfoBox from '../components/UserInfoBox';
import axios from 'axios';
import baseUrl from '../constants/request';

const { width, height } = Layout.window;

export default function HomeScreen({ navigation }) {
  const [usersData, setUsersData] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl + '?results=10');
        setUsersData(response.data.results);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const fetchMoreData = useCallback(async () => {
    console.log('ASDASDASDASDASDASD');
    setPage(page + 1);
    try {
      const response = await axios.get(
        baseUrl + `?page=${page}` + '&results=10'
      );
      console.log('RESPO', response);
      setUsersData([...usersData, ...response.data.results]);
    } catch (error) {
      console.log(error.message);
    }
  });

  return (
    <View style={styles.container}>
      {usersData && (
        <FlatList
          data={usersData}
          renderItem={({ item }) => (
            <UserInfoBox navigation={navigation} userData={item} />
          )}
          keyExtractor={(item, index) => {
            return item.id.value + '_' + index.toString();
          }}
          onEndReached={fetchMoreData}
        />
      )}
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
