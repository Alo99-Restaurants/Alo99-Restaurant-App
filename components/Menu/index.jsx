import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Pressable,
  Image
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import Color from '../../constants/Color';
import { getRestaurantMenu } from '../../services/restaurant.menu.service';
import {
  getMenuCategory,
  getMenuCategoryById
} from '../../services/category.service';
import ModalComponent from '../ModalComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { convertPrice } from '../../helper';

const Menu = ({ categoryId }) => {
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuSelected, setMenuSelected] = useState({});

  const fetchCategories = async () => {
    try {
      const response = await getMenuCategory();
      const categories = response?.data?.items;
      if (categories) {
        setCategories(categories);
      }
    } catch (error) {}
  };

  // Fetch menu by category id or fetch all
  const fetchData = async () => {
    try {
      setIsLoading(true); // Set isLoading to true when fetching data
      let response;
      if (categoryId === 'all' || !categoryId) {
        response = await getRestaurantMenu();
      } else {
        response = await getMenuCategoryById(categoryId);
      }
      const menuData =
        response?.data?.items || response.data.data.restaurantMenus;
      setMenu(menuData);
    } catch (error) {
      console.log('Error fetching menu data:', error);
    } finally {
      setIsLoading(false); // Set isLoading back to false after fetching data
    }
  };

  const handleRefresh = () => {
    fetchData(); // Call fetchData when refreshing
    fetchCategories(); // Call fetchCategories when refreshing
  };

  const toggleModal = (item) => {
    setIsModalOpen(!isModalOpen);
    setMenuSelected(item);
  };

  const categoryOfFood = categories.find(
    (category) => category.id === menuSelected.menuCategoryId
  )?.name;

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <>
      <ModalComponent onClose={() => toggleModal({})} isOpen={isModalOpen}>
        <View className='flex flex-[1] h-20 rounded-md'>
          <View className='flex-[3]'>
            <Image
              source={{ uri: menuSelected.menuUrl }}
              className='w-full h-full rounded-md'
            />
          </View>
          <View className='flex py-2'>
            <Text className='font-roboto-black text-xl text-left text-colorDark2'>
              {menuSelected.name}
            </Text>
            <Text className='font-roboto-italic text-base text-left text-colorDark2'>
              {`${categoryOfFood} - ${convertPrice(menuSelected.price)}`}
            </Text>
          </View>
          <View className='flex-[2]'>
            <Text className='font-roboto-medium text-base text-left'>
              {menuSelected.description}
            </Text>
          </View>
        </View>
      </ModalComponent>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => toggleModal(item)}>
            <MenuItem categories={categories} data={item} key={item} />
          </Pressable>
        )}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Color.colorDark1
        }}
        refreshControl={
          <RefreshControl
            color='white'
            tintColor={'white'}
            refreshing={isLoading}
            onRefresh={handleRefresh}
          />
        }
      />
    </>
  );
};

export default Menu;
