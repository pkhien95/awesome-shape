import React from 'react'
import {
  Circle,
  ClipPath,
  Defs,
  Image,
  Path,
  Rect,
  Svg,
} from 'react-native-svg'
import PropTypes from 'prop-types'
import { SHAPE_TYPES } from '../constants'
import { StyleSheet, View } from 'react-native'
import { BackgroundApi } from '../api'
import * as Animatable from 'react-native-animatable'

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

  lastPressTime = 0

  constructor(props) {
    super(props)

    this.state = {
      backgroundColor: 'gray',
      backgroundImage: null,
    }
  }

  async componentDidMount() {
    await this.initBackground()
  }

  initBackground = async () => {
    const { type } = this.props
    if (type === SHAPE_TYPES.RECTANGLE) {
      const backgroundImage = await BackgroundApi.getBackgroundImage()
      return this.setState({
        backgroundImage,
      })
    }

    const backgroundColor = await BackgroundApi.getBackgroundColor()
    return this.setState({
      backgroundColor,
    })
  }

  renderShape = (type) => {
    const { width, height } = this.props
    const { backgroundColor } = this.state

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
            onPress={this.onPress}
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
            onPress={this.onPress}
          />
        )
    }
  }

  onPress = () => {
    const nextPressTime = Date.now()
    if (this.lastPressTime !== 0 && nextPressTime - this.lastPressTime <= 500) {
      this.initBackground()
    }
    this.lastPressTime = nextPressTime
  }

  render() {
    const { id, style, width, height, type, ...rest } = this.props
    const { backgroundImage } = this.state
    const imageHref = backgroundImage
      ? { uri: backgroundImage }
      : require('../assets/image-placeholder.png')

    return (
      <Animatable.View style={style} animation={'bounceIn'}>
        <Svg
          key={id}
          style={styles.container}
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
                href={imageHref}
                clipPath="url(#clip)"
                onPress={this.onPress}
              />
            </>
          ) : (
            this.renderShape(type)
          )}
        </Svg>
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
})

export default Shape
