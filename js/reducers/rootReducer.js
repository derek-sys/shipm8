import { combineReducers } from '@reduxjs/toolkit';

import awsReducer from '../components/AwsSlice';
import gcpReducer from '../reducers/GoogleCloudSlice';
import podsReducer from '../components/Pods/PodsSlice';
import clustersReducer from '../components/Clusters/ClustersSlice';

const rootReducer = combineReducers({
  Clusters: clustersReducer,
  Pods: podsReducer,
  Aws: awsReducer,
  Gcp: gcpReducer,
});

export default rootReducer;
