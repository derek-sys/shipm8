// This part will most likely be made on this page, but conditionally rendered on AddEksCluster (which should be renamed to AddCluster)

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   TouchableOpacity,
// } from 'react-native';
// import { useDispatch } from 'react-redux';
// import { Badge } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Dropdown } from 'react-native-material-dropdown';

// import AwsApi from '../../api/AwsApi';
// import Regions from '../../data/Regions';
// import { addCluster } from './ClustersSlice';

// const AddGkeCluster = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const [projectSelected, setProjectSelected] = useState(false);
//   const [clusters, setClusters] = useState(null);

//   const handleProjectChange = async project => {
//     setProjectSelected(true);
//     const clusters = await AwsApi.describeAllGkeClusters(project);
//     setClusters(clusters);
//   };

//   const handleClusterPress = cluster => {
//     dispatch(addCluster(cluster));
//     navigation.navigate('Clusters');
//   };

//   const checkStatus = text => {
//     if (text === 'ACTIVE') {
//       return 'success';
//     } else if (text === 'CREATING') {
//       return 'warning';
//     } else {
//       return 'error';
//     }
//   };

//   const clusterList =
//     clusters && clusters.length > 0
//       ? clusters.map((cluster, idx) => {
//           return (
//             <TouchableOpacity
//               key={cluster.name + idx}
//               style={styles.clusterContainer}
//               activeOpacity={0.7}
//               cluster={cluster.name}
//               onPress={() => handleClusterPress(cluster)}>
//               <Text numberOfLines={1} style={styles.clusterText}>
//                 {cluster.name}
//               </Text>
//               <Text style={styles.statusText}>{cluster.status}</Text>
//               <Badge
//                 status={checkStatus(cluster.status)}
//                 badgeStyle={styles.badge}
//               />
//               <Icon
//                 name="chevron-right"
//                 size={15}
//                 color="gray"
//                 style={styles.arrow}
//               />
//             </TouchableOpacity>
//           );
//         })
//       : null;

//   return (
//     <View>
//       <SafeAreaView style={styles.safeArea}>
//         <ScrollView style={styles.scrollView}>
//           <View style={styles.dropDownView}>
//             <Dropdown
//               label="Please Select a Region"
//               data={Regions}
//               itemCount={4}
//               dropdownPosition={0}
//               dropdownOffset={styles.dropDownOffset}
//               style={styles.dropDown}
//               onChangeText={text => handleRegionChange(text)}
//             />
//           </View>
//           <ScrollView style={styles.clusterScroll}>
//             {regionSelected && clusterList}
//             {regionSelected && !clusterList && (
//               <Text
//                 style={{
//                   textAlign: 'center',
//                   marginTop: 150,
//                   fontSize: 20,
//                   color: 'gray',
//                 }}>
//                 No Clusters in this Region{' '}
//               </Text>
//             )}
//           </ScrollView>
//           <Button
//             style={{
//               flex: 2,
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: 'blue',
//             }}
//             color="red"
//             title="Sign Out"
//             onPress={() => navigation.navigate('Login')}
//           />
//         </ScrollView>
//       </SafeAreaView>
//     </View>
//   );
// };

// export default React.memo(AddEksCluster);

// const styles = StyleSheet.create({
//   clusterButton: {
//     backgroundColor: 'grey',
//     paddingVertical: 15,
//     borderRadius: 5,
//     marginTop: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonsContainer: {
//     backgroundColor: 'blue',
//     paddingVertical: 15,
//     borderRadius: 5,
//     marginTop: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   dropDown: {
//     textAlign: 'center',
//     alignItems: 'center',
//     fontSize: 18,
//   },
//   dropDownView: {
//     width: '90%',
//     alignSelf: 'center',
//   },
//   dropDownOffset: {
//     top: 15,
//     left: 0,
//   },
//   buttonsText: {
//     textAlign: 'center',
//     color: 'white',
//     fontWeight: '700',
//     fontSize: 16,
//   },
//   safeArea: {
//     backgroundColor: 'white',
//     marginHorizontal: 10,
//     height: '100%',
//   },
//   scrollView: {
//     marginHorizontal: 0,
//     marginTop: 30,
//   },
//   regionPickText: {
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   clusterContainer: {
//     marginTop: 10,
//     backgroundColor: 'white',
//     flexDirection: 'row',
//     marginBottom: 2,
//     marginLeft: 6,
//     height: 48,
//     width: '96%',
//     paddingVertical: 12,
//     paddingLeft: 2,
//     borderStyle: 'solid',
//     borderColor: '#063CB9',
//     borderWidth: 1,
//     borderRadius: 8,
//     alignContent: 'center',
//   },
//   clusterText: {
//     fontSize: 16,
//     marginLeft: 15,
//     marginRight: 80,
//     width: 165,
//     backgroundColor: 'white',
//     overflow: 'scroll',
//   },
//   statusText: {
//     fontSize: 16,
//     width: 100,
//     textAlign: 'left',
//     color: 'gray',
//     marginRight: 15,
//     marginLeft: 10,
//   },
//   clusterScroll: {
//     marginTop: 10,
//     height: 580,
//     borderRadius: 5,
//   },
//   arrow: {
//     marginLeft: 90,
//     marginTop: -17,
//   },
//   badge: {
//     marginLeft: 8,
//     marginTop: -14,
//     marginLeft: 30,
//   },
// });
