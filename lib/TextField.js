'use strict';

import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import FloatingLabel from './FloatingLabel';
import Underline from './Underline';

export default class TextField extends Component {
  constructor(props: Object, context: Object) {
    super(props, context);
    this.state = {
      isFocused: false,
      text: props.value,
      height: props.height,
    };
  }

  blur() {
    this.refs.input.blur();
  }

  focus() {
    this.refs.input.focus();
  }

  isFocused() {
    return this.state.isFocused;
  }

  measureLayout(...args) {
    this.refs.wrapper.measureLayout(...args)
  }

  componentWillReceiveProps(nextProps: Object) {
    if (this.props.text !== nextProps.value) {
      nextProps.value.length !== 0
        ? this.refs.floatingLabel.floatLabel()
        : this.refs.floatingLabel.sinkLabel();
      this.setState({text: nextProps.value});
    }

    if (this.props.height !== nextProps.height) {
      this.setState({height: nextProps.height});
    }
  }

  render() {
    const {
      autoGrow,
      borderColor,
      duration,
      height,
      highlightColor,
      inputStyle,
      label,
      labelBaseStyle,
      labelColor,
      labelFloatedStyle,
      multiline,
      onBlur,
      onChange,
      onChangeText,
      onFocus,
      textBlurColor,
      textColor,
      textFocusColor,
      value,
      wrapperStyle,
      ...props,
    } = this.props;

    return (
      <View
        ref='wrapper'
        style={[
          styles.wrapper,
          this.state.height
            ? {height: undefined}
            : {},
          wrapperStyle,
        ]}
      >
        <TextInput
          multiline={multiline}
          onFocus={() => {
            this.setState({isFocused: true});
            this.refs.floatingLabel.floatLabel();
            this.refs.underline.expandLine();
            onFocus && onFocus();
          }}
          onBlur={() => {
            this.setState({isFocused: false});
            !this.state.text.length && this.refs.floatingLabel.sinkLabel();
            this.refs.underline.shrinkLine();
            onBlur && onBlur();
          }}
          onChangeText={(text) => {
            this.setState({text});
            onChangeText && onChangeText(text);
          }}
          onChange={(event) => {
            if (autoGrow) {
              this.setState({height: event.nativeEvent.contentSize.height});
            }
            onChange && onChange(event);
          }}
          ref='input'
          style={[
            styles.textInput,
            {color: textColor},
            this.state.isFocused && textFocusColor
              ? {color: textFocusColor}
              : {},
            !this.state.isFocused && textBlurColor
              ? {color: textBlurColor}
              : {},
            inputStyle,
            this.state.height
              ? {height: this.state.height}
              : {}
          ]}
          value={this.state.text}
          {...props}
        />

        <Underline
          borderColor={borderColor}
          duration={duration}
          highlightColor={highlightColor}
          ref='underline'
        />

        <FloatingLabel
          duration={duration}
          focusHandler={this.focus.bind(this)}
          hasValue={(this.state.text.length) ? true : false}
          highlightColor={highlightColor}
          isFocused={this.state.isFocused}
          label={label}
          labelColor={labelColor}
          ref='floatingLabel'
          labelBaseStyle={labelBaseStyle}
          labelFloatedStyle={labelFloatedStyle}
        />
      </View>
    );
  }
}

TextField.propTypes = {
  autoGrow: PropTypes.bool,
  borderColor: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.oneOfType([
    PropTypes.oneOf(undefined),
    PropTypes.number
  ]),
  highlightColor: PropTypes.string,
  inputStyle: PropTypes.object,
  label: PropTypes.string,
  labelBaseStyle: Text.propTypes.style,
  labelColor: PropTypes.string,
  labelFloatedStyle: Text.propTypes.style,
  multiline: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  textBlurColor: PropTypes.string,
  textColor: PropTypes.string,
  textFocusColor: PropTypes.string,
  value: PropTypes.string,
  wrapperStyle: PropTypes.object,
};

TextField.defaultProps = {
  autoGrow: false,
  borderColor: '#E0E0E0',
  duration: 200,
  height: undefined,
  labelColor: '#9E9E9E',
  multiline: false,
  textColor: '#000',
  underlineColorAndroid: 'rgba(0, 0, 0, 0)',
  value: '',
};

const styles = StyleSheet.create({
  wrapper: {
    height: 72,
    paddingBottom: 7,
    paddingTop: 30,
    position: 'relative',
  },
  textInput: {
    fontSize: 16,
    height: 34,
    lineHeight: 24,
    zIndex: 1,
  },
});
