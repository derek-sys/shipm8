//this will be our landing page we can use this to work with the MVP data we are trying to get
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Badge } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Regions from '../Regions';
import AWSApi from '../api/AWSApi';

mapStateToProps = state => ({
  totalCluster: state.app.totalCluster,
  clusterName: state.app.clusterName,
  pods: state.app.totalPods,
  region: state.app.regions
});

// where <Badge> is created we need to determine the error cases for clusters
// so we can determine the status of the cluster and perhaps real time updates
const Main = props => {
  let clusterList = [];
  let content;

  const [dataState, setDataState] = useState([]);

  const callClusters = async (text) => {
    const storedData = await AWSApi.describeAllEksClusters(text);
    setDataState(storedData)



    console.log(storedData)
  }

  useEffect(() => {
  }, [dataState]);

  const checkStatus = (text) => {
    if (text === 'ACTIVE') {
      return 'success'
    }
    else {
      return 'error'
    }
  };

  dataState.length > 0 ? dataState.forEach(cluster => {
    clusterList.push(
      <TouchableOpacity
        style={styles.clusterContainer}
        activeOpacity={0.7}
        onPress={() => props.navigation.navigate('Pods')}>
        <Text numberOfLines={1} style={styles.clusterText}>
          {' '}
          {cluster.name}{' '}
        </Text>
        <Text style={styles.statusText}>Status:</Text>
        <Badge status={checkStatus(cluster.status)} badgeStyle={styles.badge} />
        <Icon
          name="chevron-right"
          size={15}
          color="gray"
          style={styles.arrow}
        />
      </TouchableOpacity>,
    );
  }) : null;

  content = (
    <View>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          {/* <Text style={styles.test}>Select Namespace to View Pods</Text> */}
          <Dropdown
            label="Select a Region"
            data={Regions}
            itemCount={4}
            dropdownOffset={{ top: 15, left: 0 }}
            style={styles.dropDown}
            onChangeText={callClusters}
          />
          <ScrollView style={styles.clusterScroll}>{
            clusterList.length > 0 ? clusterList : <Text>No Clusters Found in this Region</Text>
          }</ScrollView>
          <Button
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'blue',
            }}
            color='red'
            title="Sign Out"
            onPress={() => props.navigation.navigate('Login')}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
  return content
};

export default connect(mapStateToProps)(React.memo(Main));

const styles = StyleSheet.create({
  clusterButton: {
    backgroundColor: 'grey',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  safeArea: {
    backgroundColor: 'white',
    marginHorizontal: 30,
    height: '100%',
  },
  scrollView: {
    marginHorizontal: 20,
    marginTop: 30,
  },

  regionPickText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  clusterContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 2,
    marginLeft: 6,
    height: 48,
    width: '96%',
    paddingVertical: 12,
    paddingLeft: 6,
    borderStyle: 'solid',
    borderColor: '#063CB9',
    borderWidth: 1,
    borderRadius: 8,
    alignContent: 'center',
  },
  clusterText: {
    fontSize: 16,
    marginRight: 27,
    width: 165,
    backgroundColor: 'white',
    overflow: 'scroll',
  },
  statusText: {
    fontSize: 16,
    backgroundColor: 'white',
    color: 'gray',
    marginRight: 3,
  },
  clusterScroll: {
    backgroundColor: '#69ADFF',
    marginTop: 10,
    height: 580,
  },
  arrow: {
    marginLeft: 6,
    marginTop: 4,
  },
  badge: {
    marginLeft: 6,
    marginTop: 7,
    marginRight: 3,
  },
});
