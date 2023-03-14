// import React, { useContext } from "react";
// import { View, ActivityIndicator } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { AuthContext } from "./AuthContext";
// import AppStack from "./AppStack";
// import AuthStack from "./AuthStack";

// const Stack = createStackNavigator();

// function AppNav() {
//   const { isLoading, userToken } = useContext(AuthContext);
//   if (isLoading) {
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <ActivityIndicator size={"large"} />
//     </View>;
//   }
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {userToken !== null ? <AppStack /> : <AuthStack />}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default AppNav;
