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

    if (props.dense) {
      this.fontLarge = 13;
      this.fontSmall = 13;
      this.posBottom = 32;
      this.posTop = 12;
    } else {
      this.fontLarge = 16;
      this.fontSmall = 12;
      this.posBottom = 37;
      this.posTop = 16;
    }

    let fontSize = props.hasValue ? this.fontSmall : this.fontLarge;
    let posTop = props.hasValue ? this.posTop : this.posBottom;

    this.state = {
      fontSize: new Animated.Value(fontSize),
      top: new Animated.Value(posTop),
    };
  }

  shouldComponentUpdate(nextProps: Object, nextState: Object) : bool {
    return (this.props.hasValue !== nextProps.hasValue) ? false : true;
  }

  floatLabel() {
    Animated.parallel([
      Animated.timing(this.state.fontSize, {
        duration: this.props.duration,
        toValue: this.fontSmall,
      }),
      Animated.timing(this.state.top, {
        duration: this.props.duration,
        toValue: this.posTop,
      }),
    ]).start();
  }

  sinkLabel() {
    Animated.parallel([
      Animated.timing(this.state.fontSize, {
        duration: this.props.duration,
        toValue: this.fontLarge,
      }),
      Animated.timing(this.state.top, {
        duration: this.props.duration,
        toValue: this.posBottom,
      }),
    ]).start();
  }

  render() : Object {
    let {
      highlightColor,
      label,
      labelColor,
      style,
    } = this.props;

    return (
      <Animated.Text
        onPress={()=> {
          this.props.focusHandler();
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
  dense: PropTypes.bool,
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
