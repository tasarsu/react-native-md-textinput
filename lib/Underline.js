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
      underlineStyle,
      underlineHighlightStyle,
    } = this.props;

    return (
      <View
        ref='wrapper'
        style={[
          underlineStyle,
        ]}
      >
        <Animated.View style={[
          {width: this.state.lineLength},
          underlineHighlightStyle,
        ]}/>
      </View>
    );
  }
}

Underline.propTypes = {
  duration: PropTypes.number,
  underlineHighlightStyle: View.propTypes.style,
  underlineStyle: View.propTypes.style,
};

Underline.defaultProps = {
  underlineHighlightStyle: {
    backgroundColor: '#ccc',
    height: 1,
  },
  underlineStyle: {
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    height: 1,
  },
};
