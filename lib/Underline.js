'use strict';

import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Animated,
  StyleSheet,
  View,
} from 'react-native';

export default class Underline extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      lineLength: new Animated.Value(0),
    };
    this.wrapperWidth = 0;
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      if (this.refs.wrapper == null) {
        return;
      }
      const container = this.refs.wrapper; // un-box animated view
      container.measure((left, top, width, height) => {
        this.wrapperWidth = width;
      });
    });
  }

  expandLine() {
    Animated.timing(this.state.lineLength, {
      duration: this.props.duration,
      toValue: this.wrapperWidth,
    }).start();
  }

  shrinkLine() {
    Animated.timing(this.state.lineLength, {
      duration: this.props.duration,
      toValue: 0,
    }).start();
  }

  render() {
    let {
      borderColor,
      highlightColor,
    } = this.props;

    return (
      <View
        ref='wrapper'
        style={[
          styles.underlineWrapper,
          {backgroundColor: borderColor},
        ]}
      >
        <Animated.View style={[{
          backgroundColor: highlightColor,
          height: 1,
          width: this.state.lineLength,
        }]}/>
      </View>
    );
  }
}

Underline.propTypes = {
  borderColor: PropTypes.string,
  duration: PropTypes.number,
  highlightColor: PropTypes.string,
};

const styles = StyleSheet.create({
  underlineWrapper: {
    alignItems: 'center',
    height: 1,
  }
});
