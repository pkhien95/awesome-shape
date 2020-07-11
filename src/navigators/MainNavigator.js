import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NAVIGATORS } from '../constants/navigators'
import React from 'react'
import SquaresScreen from '../screens/squares/SquaresScreen'
import CirclesScreen from '../screens/circles/CirclesScreen'
import TrianglesScreen from '../screens/triangles/TrianglesScreen'
import AllScreen from '../screens/all/AllScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator()

const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName

        switch (route.name) {
          case NAVIGATORS.SQUARES.name:
            iconName = focused ? 'ios-square' : 'ios-square-outline'
            return <Ionicons name={iconName} size={size} color={color} />

          case NAVIGATORS.CIRCLES.name:
            iconName = focused
              ? 'checkbox-blank-circle'
              : 'checkbox-blank-circle-outline'
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            )

          case NAVIGATORS.TRIANGLES.name:
            iconName = focused ? 'triangle' : 'triangle-outline'
            return <Ionicons name={iconName} size={size} color={color} />

          case NAVIGATORS.ALL.name:
            iconName = focused ? 'shape' : 'shape-outline'
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            )
        }
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}>
    <Tab.Screen name={NAVIGATORS.SQUARES.name} component={SquaresScreen} />
    <Tab.Screen name={NAVIGATORS.CIRCLES.name} component={CirclesScreen} />
    <Tab.Screen name={NAVIGATORS.TRIANGLES.name} component={TrianglesScreen} />
    <Tab.Screen name={NAVIGATORS.ALL.name} component={AllScreen} />
  </Tab.Navigator>
)

export default MainNavigator
