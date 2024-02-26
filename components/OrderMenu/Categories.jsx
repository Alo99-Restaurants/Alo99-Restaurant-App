import { ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { iconCategories } from '../../assets/data/iconCategories';
import {
  getMenuCategory,
  getMenuCategoryById
} from '../../services/category.service';
import CategoryItem from './CategoryItem';

const Categories = ({ onChangeCategory }) => {
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getMenuCategory();
        const categories = response?.data?.items;
        if (categories) {
          setCategories(categories);
        }
      } catch (error) {}
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    onChangeCategory(categorySelected);
  }, [categorySelected]);

  return (
    <ScrollView
      style={{ marginLeft: -4, marginRight: -4 }}
      showsHorizontalScrollIndicator={false}
      horizontal>
      <CategoryItem
        key={0}
        id={'all'}
        classStyle={'mx-1'}
        label={iconCategories[0].title}
        img={iconCategories[0].img}
        onChange={setCategorySelected}
      />
      {categories.map((category, index) => (
        <CategoryItem
          key={index}
          classStyle={'mx-1'}
          id={category.id}
          label={category.name}
          uri={category.iconUrl}
          onChange={setCategorySelected}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
