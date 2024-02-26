import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  View
} from 'react-native';
import Color from '../../constants/Color';
import {
  getMenuCategoryById
} from '../../services/category.service';
import { getRestaurantMenu } from '../../services/restaurant.menu.service';
import ModalComponent from '../ModalComponent';
import FoodItem from './FoodItem';

const ListOfFood = ({ categoryId }) => {
  const [menu, setMenu] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foodSelected, setFoodSelected] = useState({});


  // Fetch menu by category id or fetch all
  const fetchData = async () => {
    try {
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
    }
  };

  const handleRefresh = () => {
    fetchData(); // Call fetchData when refreshing
  };

  const toggleModal = (item) => {
    setIsModalOpen(!isModalOpen);
    setFoodSelected(item);
  };

  useEffect(() => {
    handleRefresh();
  }, [categoryId]);

  return (
    <>
      <ModalComponent onClose={() => toggleModal({})} isOpen={isModalOpen}>
        <View className='flex flex-[1] rounded-md'>
          <View className='flex-[3]'>
            <Image
              source={{ uri: foodSelected.menuUrl }}
              className='w-full h-80 rounded-md'
            />
          </View>
          <View className='flex py-2'>
            <Text className='font-roboto-black text-xl text-left text-colorDark2'>
              {foodSelected.name}
            </Text>
          </View>
          <View className='flex-[2]'>
            <Text className='pb-8 font-roboto-medium text-base text-left'>
              {foodSelected.description}
            </Text>
          </View>
        </View>
      </ModalComponent>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FoodItem
            data={item}
            key={item}
            onClickImg={() => toggleModal(item)}
          />
        )}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Color.colorDark1
        }}
        refreshControl={
          <RefreshControl
            color='white'
            tintColor={'white'}
            onRefresh={handleRefresh}
          />
        }
      />
    </>
  );
};

export default ListOfFood;
