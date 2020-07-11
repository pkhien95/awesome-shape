import React from 'react'
import ShapesGenerator from '../../components/ShapesGenerator'
import {SHAPE_GENERATOR_TYPES} from '../../constants'
import {StyleSheet, View} from 'react-native'

const CirclesScreen = () => (
  <View style={styles.container}>
    <ShapesGenerator
      style={styles.generator}
      shapeType={SHAPE_GENERATOR_TYPES.CIRCLE}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  generator: {
    flex: 1,
  },
})

export default CirclesScreen
