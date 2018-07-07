import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
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
    this.positionBase = 23;
    this.positionFloated = 0;

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
      hasValue,
      isFocused,
      label,
    } = this.props;

    const labelBaseStyle = this.labelBaseStyle;
    let labelFloatedStyle = this.labelFloatedStyle;

    if (!isFocused && !hasValue) {
      labelFloatedStyle = null;
    }

    return (
      <Animated.Text
        onPress={() => {
          focusHandler();
        }}
        style={[
          styles.labelText,
          labelBaseStyle,
          labelFloatedStyle,
          {
            fontSize: this.state.fontSize,
            top: this.state.top,
          },
        ]}
      >
        {label}
      </Animated.Text>
    );
  }
}

FloatingLabel.propTypes = {
  duration: PropTypes.number,
  focusHandler: PropTypes.func,
  isFocused: PropTypes.bool,
  label: PropTypes.string,
  labelBaseStyle: Text.propTypes.style,
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
