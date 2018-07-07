import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  StyleSheet,
  Text,
} from 'react-native';

export default class HelperText extends Component {
  constructor(props: Object) {
    super(props);

    const {
      height: heightActive,
      ...helperTextStyle,
    } = StyleSheet.flatten(props.helperTextStyle);

    this.helperTextStyle = helperTextStyle;
    this.heightBase = 0;
    this.heightActive = heightActive;

    const height = props.helperText ? this.heightActive : this.heightBase;

    this.state = {
      height: new Animated.Value(height),
    };
  }

  shouldComponentUpdate(nextProps: Object, nextState: Object) : bool {
    return this.props.hasValue === nextProps.hasValue;
  }

  hideHelperText() {
    Animated.timing(this.state.height, {
      duration: this.props.duration,
      toValue: this.heightBase,
    }).start();
  }

  revealHelperText() {
    Animated.timing(this.state.height, {
      duration: this.props.duration,
      toValue: this.heightActive,
    }).start();
  }

  render() : Object {
    const {
      focusHandler,
      hasValue,
      isFocused,
      helperText,
    } = this.props;

    const helperTextStyle = this.helperTextStyle;

    return (
      <Animated.Text
        onPress={() => {
          focusHandler();
        }}
        style={[
          helperTextStyle,
          {
            fontSize: this.state.fontSize,
            top: this.state.top,
          },
        ]}
      >
        {helperText}
      </Animated.Text>
    );
  }
}

HelperText.propTypes = {
  duration: PropTypes.number,
  focusHandler: PropTypes.func,
  helperText: PropTypes.string,
  helperTextStyle: Text.propTypes.style,
  isFocused: PropTypes.bool,
};

HelperText.defaultProps = {
  helperTextStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    paddingTop: 4,
    fontSize: 14,
    height: 24,
  },
};
