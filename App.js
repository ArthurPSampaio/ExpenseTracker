import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import LoadingOverlay from "./components/UI/LoadingOverlay";
import ExpenseDetailsScreen from "./screens/ExpenseDetailsScreen";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6200ee",
    accent: "#03dac4",
    background: "#f6f6f6",
    surface: "#ffffff",
    error: "#B00020",
  },
};

function ExpensesOverview() {
  const auth = getAuth();

  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: theme.colors.surface },
        tabBarActiveTintColor: theme.colors.primary,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense");
            }}
          />
        ),
        headerLeft: ({ tintColor }) => (
          <IconButton
            icon="log-out"
            size={24}
            color={tintColor}
            onPress={() => {
              auth.signOut();
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Despesas Recentes",
          tabBarLabel: "Recentes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "Todas as Despesas",
          tabBarLabel: "Todas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: "white",
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="ExpensesOverview"
        component={ExpensesOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageExpense"
        component={ManageExpense}
        options={{
          presentation: "modal",
          title: "Gerenciar Despesa",
        }}
      />
      <Stack.Screen
        name="ExpenseDetails"
        component={ExpenseDetailsScreen}
        options={{
          title: "Detalhes da Despesa",
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (isInitializing) {
    return (
      <PaperProvider theme={theme}>
        <LoadingOverlay />
      </PaperProvider>
    );
  }

  return (
    <NavigationContainer>
      {!isAuthenticated ? <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <PaperProvider theme={theme}>
        <ExpensesContextProvider>
          <Navigation />
        </ExpensesContextProvider>
      </PaperProvider>
    </>
  );
}
