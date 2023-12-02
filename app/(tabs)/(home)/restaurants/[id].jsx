import React, { useState } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import TabMenu from '../../../../components/TabsMenu';

const windowWidth = Dimensions.get('window').width;

const carouselItems = [
  {
    title: 'Item 1',
    text: 'This is text area for Item 1',
    uri: require('../../../../assets/images/restaurant1.jpeg')
  },
  {
    title: 'Item 2',
    text: 'This is text area for Item 2',
    uri: require('../../../../assets/images/restaurant2.jpeg')
  },
  {
    title: 'Item 3',
    text: 'This is text area for Item 3',
    uri: require('../../../../assets/images/restaurant3.jpeg')
  },
  {
    title: 'Item 4',
    text: 'This is text area for Item 4',
    uri: require('../../../../assets/images/restaurant4.jpeg')
  },
  {
    title: 'Item 5',
    text: 'This is text area for Item 5',
    uri: require('../../../../assets/images/restaurant1.jpeg')
  }
];

const menu = ['Details', 'Menu', 'Review'];

const ImageCarouselItem = ({ index, item }) => {
  return (
    <View>
      <Image className='w-full h-80' source={item.uri} />
    </View>
  );
};

const RestaurantPage = () => {
  const [indexCarousel, setIndexCarousel] = useState(0);
  const [widthView, setWidthView] = useState(0);
  const [sizeCarousel, setSizeCarousel] = useState({
    widthView: windowWidth,
    heightView: windowWidth / 2
  });
  return (
    <View className='bg-colorDark1 h-full flex-[1]'>
      <View
        className='flex-[1]'
        onLayout={(event) => {
          const { height, width } = event.nativeEvent.layout;
          setSizeCarousel({ heightView: height, widthView: width });
        }}>
        <Carousel
          loop
          width={sizeCarousel.widthView > 0 ? sizeCarousel.widthView : 400}
          height={sizeCarousel.heightView > 0 ? sizeCarousel.heightView : 400}
          data={carouselItems}
          onSnapToItem={(index) => setIndexCarousel(index)}
          renderItem={ImageCarouselItem}
        />
        <View
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setWidthView(width);
          }}
          style={{
            position: 'absolute',
            top: windowWidth / 1.5 - 30,
            left: windowWidth / 2,
            transform: [{ translateX: -widthView / 2 }]
          }}
          className='absolute'>
          <Text className='font-roboto-black text-base text-white px-4 bg-colorDark2'>
            {indexCarousel + 1}/{carouselItems.length}
          </Text>
        </View>
      </View>
      <View className='flex-[2]'>
        <TabMenu menu={menu} />
      </View>
    </View>
  );
};

export default RestaurantPage;
