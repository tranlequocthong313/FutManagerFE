import { registerRootComponent } from "expo";

import App from "./App";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs();

const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) {
    return;
  }
  error(...args);
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
