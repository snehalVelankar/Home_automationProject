import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';
import{
  PERMISSION_TYPE
}from 'react-native';
//import {permission, PERMISSION_TYPE} from './src/AppPermission';

export default class App extends Component {
  ComponentDidMount() {
    Permission.checkpermission(PERMISSION_TYPE.microphone);
  }
}

const PLATFORM_MICROPHONE_PERMISSIONS = {
  android: PERMISSIONS.ANDROID.RECORD_AUDIO,
};

const REQUEST_PERMISSION_TYPE = {
  microphone: PLATFORM_MICROPHONE_PERMISSIONS,
};

const PERMISSION_TYPE = {
  microphone: 'microphone',
};

class AppPermission {
  checkPermission = async type => {
    const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
    if (!permissions) {
      return true;
    }
    try {
      const result = await check(permissions);
      if (result === RESULTS.GRANTED) return true;
      return this.requestPermission(permissions);
    } catch (error) {
      return false;
    }
  };

  requestPermission = async permissions => {
    try {
      const result = await request(permissions);
      return result === RESULTS.GRANTED;
    } catch (error) {
      return false;
    }
  };
}


const Permission = new AppPermission();

export {Permission, PERMISSION_TYPE};
