import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';

//Importing Constants
import { images, theme } from '../../constants';
const { onboarding1, onboarding2, onboarding3 } = images;

//Importing Theme
const { COLORS, FONTS, SIZES } = theme;

//Dummy Data
const onBoardings = [
  {
    title: "Let's travelling",
    description:
      'Choose a place that you make you feel relaxed and free of your chores',
    img: onboarding1,
  },
  {
    title: 'Navigation',
    description: 'Finding your way through the dark paths.',
    img: onboarding2,
  },
  {
    title: 'Destination',
    description: 'The best places in the world in the palm of your hand.',
    img: onboarding3,
  },
];

const OnBoarding = () => {
  const scrollX = new Animated.Value(0);

  //RENDER
  function renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelarationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {onBoardings.map((onBoarding, index) => (
          <View key={index} style={{ width: SIZES.width }}>
            {/*  Image  */}
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={onBoarding.img}
                resizeMode="cover"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </View>
            {/*  Text */}
            <View
              style={{
                position: 'absolute',
                bottom: '10%',
                left: 40,
                right: 40,
              }}
            >
              <Text
                style={{ ...FONTS.h1, color: COLORS.gray, textAlign: 'center' }}
              >
                {onBoarding.title}
              </Text>
              <Text
                style={{
                  ...FONTS.body3,
                  textAlign: 'center',
                  marginTop: SIZES.base,
                  color: COLORS.gray,
                }}
              >
                {onBoarding.description}
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }
  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View style={styles.dotContainer}>
        {onBoardings.map((onBoarding, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [SIZES.base, 17, SIZES.base],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`dot -${index}`}
              opacity={opacity}
              style={[styles.dot, { width: dotSize, height: dotSize }]}
            ></Animated.View>
          );
        })}
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>{renderContent()}</View>

      <View style={styles.dotsRootContainer}>{renderDots()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  dotsRootContainer: {
    position: 'absolute',
    bottom: SIZES.height > 600 ? '23%' : '16%',
  },
  dotContainer: {
    flexDirection: 'row',
    height: SIZES.padding,
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2,
  },
});

export default OnBoarding;
