import React, { useMemo, useState } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import TabMenu from '../../../../components/TabsMenu';
import {
  useFocusEffect,
  useGlobalSearchParams,
  useLocalSearchParams
} from 'expo-router';
import DetailsMenu from '../../../../components/TabsMenu/DetailsMenu';
import { useSelector } from 'react-redux';
import Menu from '../../../../components/Menu';

const windowWidth = Dimensions.get('window').width;
const menu = ['Details', 'Menu', 'Reviews'];

const ImageCarouselItem = ({ index, item }) => {
  return (
    <View>
      <Image className='w-full h-80' source={item.uri} />
    </View>
  );
};

const RestaurantPage = () => {
  const { id } = useLocalSearchParams();
  const globalSearchParams = useGlobalSearchParams();

  const { storeBranches } = useSelector((state) => state.storeBranches);
  const activeStoreBranch = useMemo(
    () => storeBranches.find((store) => store.id === id),
    [id]
  );
  const carouselItems = activeStoreBranch?.restaurantImages.map((item) => {
    return { title: item.id, uri: { uri: item.url } };
  });

  const [menuActive, setMenuActive] = useState(0);
  const [indexCarousel, setIndexCarousel] = useState(0);
  const [widthView, setWidthView] = useState(0);
  const [sizeCarousel, setSizeCarousel] = useState({
    widthView: windowWidth,
    heightView: windowWidth / 2
  });

  const handleChangeTabMenu = (newMenuActive) => {
    setMenuActive(newMenuActive);
  };

  const renderMenu = () => {
    return (
      <View className='flex-[1]'>
        <View
          className='flex-[1]'
          style={{ display: menuActive === 0 ? 'flex' : 'none' }}>
          <DetailsMenu activeStoreBranch={activeStoreBranch} />
        </View>
        <View
          className='flex-[1]'
          style={{ display: menuActive === 1 ? 'flex' : 'none' }}>
          <Menu />
        </View>
        <View
          className='flex-[1]'
          style={{ display: menuActive === 2 ? 'flex' : 'none' }}>
          <View>
            <Text className='h-full text-white'>Review</Text>
          </View>
        </View>
      </View>
    );
  };

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
            top: sizeCarousel.heightView - 30,
            left: sizeCarousel.widthView / 2,
            transform: [{ translateX: -widthView / 2 }]
          }}
          className='absolute'>
          <Text className='font-roboto-black text-base text-white px-4 bg-colorDark2'>
            {indexCarousel + 1}/{carouselItems.length}
          </Text>
        </View>
      </View>
      <View className='flex-[2]'>
        <TabMenu
          itemClassName={'w-28'}
          menu={menu}
          onChange={handleChangeTabMenu}>
          {renderMenu()}
        </TabMenu>
      </View>
    </View>
  );
};

export default RestaurantPage;
