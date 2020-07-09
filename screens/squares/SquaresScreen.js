import React from 'react'
import { StyleSheet, View } from 'react-native'
import Shape from '../../components/Shape'
import { SHAPE_TYPES } from '../../constants'

class SquaresScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Shape
          type={SHAPE_TYPES.CIRCLE}
          style={styles.rect}
          width={100}
          height={100}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rect: {
    position: 'absolute',
    top: 50,
    left: 50
  },
})

export default SquaresScreen
