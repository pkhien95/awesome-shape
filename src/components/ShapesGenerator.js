import React from 'react'
import { Dimensions, Pressable, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { SHAPE_GENERATOR_TYPES, SHAPE_TYPES } from '../constants'
import { generateRandomNumber, uuidv4 } from '../utils'
import Shape from './Shape'

const { width: SCREEN_WIDTH } = Dimensions.get('screen')

class ShapesGenerator extends React.PureComponent {
  static propTypes = {
    shapeType: PropTypes.string,
  }

  static defaultProps = {
    shapeType: SHAPE_GENERATOR_TYPES.ALL,
  }

  constructor(props) {
    super(props)

    this.state = {
      shapes: [],
    }
  }

  generateRandomShape = (point) => {
    const { shapeType } = this.props

    const id = uuidv4()

    let type = shapeType
    if (shapeType === SHAPE_GENERATOR_TYPES.ALL) {
      const min = 1
      const max = Object.keys(SHAPE_TYPES).length
      const randomNumber = generateRandomNumber(min, max)
      const allTypes = {
        '1': SHAPE_TYPES.RECTANGLE,
        '2': SHAPE_TYPES.CIRCLE,
        '3': SHAPE_TYPES.TRIANGLE,
      }
      type = allTypes[randomNumber.toString()]
    }

    const min = SCREEN_WIDTH * 0.1
    const max = SCREEN_WIDTH * 0.45
    const size = generateRandomNumber(min, max)

    const location = {
      x: point.x - size / 2,
      y: point.y - size / 2,
    }

    return {
      id,
      type,
      size,
      location,
    }
  }

  onContainerPress = (event) => {
    const point = {
      x: event.nativeEvent.locationX,
      y: event.nativeEvent.locationY,
    }
    const shape = this.generateRandomShape(point)

    this.setState((prevState) => ({
      shapes: [...prevState.shapes, shape],
    }))
  }

  renderShapes = () => {
    const { shapes } = this.state
    return shapes.map((shape) => {
      const {
        id,
        type,
        size,
        location: { x, y },
      } = shape
      const style = {
        position: 'absolute',
        top: y,
        left: x,
      }
      return (
        <Shape id={id} style={style} type={type} width={size} height={size} />
      )
    })
  }

  render() {
    const { style } = this.props
    return (
      <View style={[styles.container, style]}>
        <Pressable style={styles.touchable} onPress={this.onContainerPress}>
          {this.renderShapes()}
        </Pressable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
  },
  touchable: {
    flex: 1,
  },
})

export default ShapesGenerator
