'use strict';

import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
} from 'react-native';

export default class FloatingLabel extends Component {
  constructor(props: Object) {
    super(props);

    const {
      fontSize: fontSizeBase,
      ...labelBaseStyle,
    } = StyleSheet.flatten(props.labelBaseStyle);
    const {
      fontSize: fontSizeFloated,
      ...labelFloatedStyle,
    } = StyleSheet.flatten(props.labelFloatedStyle);

    this.fontSizeBase = fontSizeBase;
    this.fontSizeFloated = fontSizeFloated;
    this.labelBaseStyle = labelBaseStyle;
    this.labelFloatedStyle = labelFloatedStyle;
    this.positionBase = 37;
    this.positionFloated = 16;

    const fontSize = props.hasValue ? this.fontSizeFloated : this.fontSizeBase;
    const position = props.hasValue ? this.positionFloated : this.positionBase;

    this.state = {
      fontSize: new Animated.Value(fontSize),
      top: new Animated.Value(position),
    };
  }

  shouldComponentUpdate(nextProps: Object, nextState: Object) : bool {
    return this.props.hasValue === nextProps.hasValue;
  }

  floatLabel() {
    Animated.parallel([
      Animated.timing(this.state.fontSize, {
        duration: this.props.duration,
        toValue: this.fontSizeFloated,
      }),
      Animated.timing(this.state.top, {
        duration: this.props.duration,
        toValue: this.positionFloated,
      }),
    ]).start();
  }

  sinkLabel() {
    Animated.parallel([
      Animated.timing(this.state.fontSize, {
        duration: this.props.duration,
        toValue: this.fontSizeBase,
      }),
      Animated.timing(this.state.top, {
        duration: this.props.duration,
        toValue: this.positionBase,
      }),
    ]).start();
  }

  render() : Object {
    const {
      focusHandler,
      highlightColor,
      label,
      labelBaseStyle,
      labelColor,
      hasValue,
    } = this.props;

    let {
      labelFloatedStyle,
    } = this.props;

    if (!this.hasValue) {
      labelFloatedStyle = null;
    }

    return (
      <Animated.Text
        onPress={() => {
          focusHandler();
        }}
        style={[
          {
            color: labelColor,
            fontSize: this.state.fontSize,
            top: this.state.top,
          },
          styles.labelText,
          this.props.isFocused && {color: highlightColor},
          this.labelBaseStyle,
          this.labelFloatedStyle,
        ]}
      >
        {label}
      </Animated.Text>
    );
  }
}

FloatingLabel.propTypes = {
  duration: PropTypes.number,
  highlightColor: PropTypes.string,
  label: PropTypes.string,
  labelBaseStyle: Text.propTypes.style,
  labelColor: PropTypes.string,
  labelFloatedStyle: Text.propTypes.style,
};

FloatingLabel.defaultProps = {
  labelBaseStyle: {
    fontSize: 16,
  },
  labelFloatedStyle: {
    fontSize: 12,
  },
};

const styles = StyleSheet.create({
  labelText: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    left: 0,
    position: 'absolute',
  }
});
