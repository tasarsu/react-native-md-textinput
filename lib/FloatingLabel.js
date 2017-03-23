'use strict';

import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Animated,
  StyleSheet,
} from 'react-native';

export default class FloatingLabel extends Component {
  constructor(props: Object) {
    super(props);

    this.fontSizeBase = 16;
    this.fontSizeFloated = 12;
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
      labelColor,
      style,
    } = this.props;

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
          style,
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
  labelColor: PropTypes.string,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  labelText: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    left: 0,
    position: 'absolute',
  }
});
