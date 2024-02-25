import React, { useRef, useState, useEffect } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';
import RestaurantCard from '../../../components/RestaurantCard';
import { ScrollView } from 'react-native-gesture-handler';
import { useLocalSearchParams } from 'expo-router';

const Explore = () => {
  const { restaurant: restaurantSearchId, random } = useLocalSearchParams();

  const [regionActive, setRegionActive] = useState();
  const cardScrollViewRef = useRef();
  const mapRef = useRef();

  const INIT_DATA = {
    latitude: 10.732921877008966,
    longitude: 106.69963012115724,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03
  };

  const { storeBranches } = useSelector((state) => state.storeBranches);

  const handleChangeRegion = (newCoordinate) => {
    setRegionActive(newCoordinate);
    mapRef.current.animateToRegion(newCoordinate);
  };

  const handleOpenInAppleMaps = (coordinate) => {
    // Open the location on Apple Maps
    const url = `http://maps.apple.com/?ll=${coordinate.latitude},${coordinate.longitude}&q=${coordinate.latitude},${coordinate.longitude}`;
    Linking.openURL(url);
  };

  const handleOpenInGoogleMaps = (coordinate) => {
    // Open the location on Google Maps
    const url = `https://www.google.com/maps/search/?api=1&query=${coordinate.latitude},${coordinate.longitude}`;
    Linking.openURL(url);
  };

  useEffect(() => {
    if (regionActive) {
      const activeIndex = storeBranches.findIndex((restaurant) => {
        const [latitude, longitude] = restaurant.location.split(',');
        const coordinate = {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude)
        };
        return (
          coordinate.latitude === regionActive.latitude &&
          coordinate.longitude === regionActive.longitude
        );
      });
      if (activeIndex !== -1) {
        cardScrollViewRef.current.scrollTo({
          x: activeIndex * 300,
          animated: true
        });
      }
    }
  }, [regionActive, storeBranches]);

  useEffect(() => {
    const restaurantActive = storeBranches.find((restaurant) => {
      return restaurantSearchId === restaurant.id;
    });

    if (restaurantActive) {
      const [latitude, longitude] = restaurantActive.location.split(',');
      const newCoordinate = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      };
      setRegionActive(newCoordinate);
      handleChangeRegion(newCoordinate);
    }
  }, [restaurantSearchId, random]);

  return (
    <View>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        initialRegion={INIT_DATA}
        className='w-full h-full'
        showsUserLocation
        showsMyLocationButton>
        {storeBranches?.map((restaurant, index) => {
          const [latitude, longitude] = restaurant.location.split(',');
          const coordinate = {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
          };
          return (
            <Marker
              key={index}
              coordinate={coordinate}
              title={restaurant?.name}
              description={restaurant?.address}
            />
          );
        })}
      </MapView>

      <View className='absolute bottom-2 left-2 bg-colorDark2 p-2 rounded-lg'>
        <Pressable
          onPress={() => handleOpenInAppleMaps(regionActive ?? INIT_DATA)}>
          <Text style={{ color: 'white' }}>Open in Apple Maps</Text>
        </Pressable>
      </View>
      <View className='absolute bottom-2 left-40 bg-colorDark2 p-2 rounded-lg'>
        <Pressable
          onPress={() => handleOpenInGoogleMaps(regionActive ?? INIT_DATA)}>
          <Text style={{ color: 'white' }}>Open in Google Maps</Text>
        </Pressable>
      </View>
      <View style={{ position: 'absolute', top: 0, left: 0 }}>
        <ScrollView
          ref={cardScrollViewRef}
          className='flex flex-row gap-2 mx-2 py-2'
          showsHorizontalScrollIndicator={false}
          horizontal>
          {storeBranches?.map((restaurant, index) => {
            const [latitude, longitude] = restaurant.location.split(',');
            const coordinate = {
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            };
            return (
              <Pressable
                key={index}
                onPress={() => handleChangeRegion(coordinate)}>
                <RestaurantCard key={index} restaurant={restaurant} />
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Explore;
