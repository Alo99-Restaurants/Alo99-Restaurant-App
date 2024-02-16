import { View, Text, FlatList, RefreshControl } from 'react-native'; // Added RefreshControl
import React, { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import Color from '../../constants/Color';
import { getRestaurantMenu } from '../../services/restaurant.menu.service';
import {
  getMenuCategory,
  getMenuCategoryById
} from '../../services/category.service';

const Menu = ({ categoryId }) => {
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Added isLoading state

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

  useEffect(() => {
    handleRefresh();
  }, [categoryId]);

  return (
    <FlatList
      data={menu}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MenuItem categories={categories} data={item} key={item} />
      )}
      contentContainerStyle={{ flexGrow: 1, backgroundColor: Color.colorDark1 }}
      refreshControl={
        <RefreshControl
          color='white'
          tintColor={'white'}
          refreshing={isLoading}
          onRefresh={handleRefresh}
        />
      }
    />
  );
};

export default Menu;
