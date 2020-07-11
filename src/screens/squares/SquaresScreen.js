import React from 'react'
import { StyleSheet, View } from 'react-native'
import ShapesGenerator from '../../components/ShapesGenerator'
import { SHAPE_GENERATOR_TYPES } from '../../constants'

const SquaresScreen = () => (
  <View style={styles.container}>
    <ShapesGenerator
      style={styles.generator}
      shapeType={SHAPE_GENERATOR_TYPES.RECTANGLE}
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

export default SquaresScreen
