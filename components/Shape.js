import React from 'react'
import { Circle, ClipPath, Defs, Path, Rect, Svg, Image } from 'react-native-svg'
import PropTypes from 'prop-types'
import { SHAPE_TYPES } from '../constants'
import { StyleSheet } from 'react-native'

class Shape extends React.PureComponent {
  static propTypes = {
    style: PropTypes.any,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }

  static defaultProps = {
    width: 100,
    height: 100,
    type: SHAPE_TYPES.RECTANGLE,
  }

  constructor(props) {
    super(props)

    this.state = {
      backgroundColor: 'red',
      backgroundImage: null,
    }
  }

  renderShape = (type) => {
    const { width, height } = this.props
    const { backgroundColor, backgroundImage } = this.state

    switch (type) {
      case SHAPE_TYPES.RECTANGLE:
        return <Rect x={0} y={0} width={width} height={height} />

      case SHAPE_TYPES.CIRCLE:
        return (
          <Circle
            x={width / 2}
            y={height / 2}
            r={width / 2}
            fill={backgroundColor}
          />
        )

      case SHAPE_TYPES.TRIANGLE:
        const top = {
          x: width / 2,
          y: 0,
        }
        const bottomLeft = {
          x: 0,
          y: height,
        }
        const bottomRight = {
          x: width,
          y: height,
        }
        return (
          <Path
            d={`m${top.x} ${top.y} L${bottomLeft.x} ${bottomLeft.y} L${bottomRight.x} ${bottomRight.y} L${top.x} ${top.y}`}
            fill={backgroundColor}
          />
        )
    }
  }

  render() {
    const { style, width, height, type, ...rest } = this.props
    return (
      <Svg
        style={[styles.container, style]}
        width={width}
        height={height}
        {...rest}>
        {type === SHAPE_TYPES.RECTANGLE ? (
          <>
            <Defs>
              <ClipPath id="clip">{this.renderShape(type)}</ClipPath>
            </Defs>
            <Image
              x="0"
              y="0"
              width={width}
              height={height}
              preserveAspectRatio="xMidYMid slice"
              href={require('../image.jpg')}
              clipPath="url(#clip)"
            />
          </>
        ) : (
          this.renderShape(type)
        )}
      </Svg>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
})

export default Shape
