import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity
} from 'react-native-gesture-handler';
import Color from '../../constants/Color';

const DetailsMenu = () => {
  return (
    <>
      <View className='px-2 h-full'>
        <View className='flex flex-row justify-between items-center py-2'>
          <Text className='font-roboto-medium text-lg text-center text-white '>
            Alo99 Restaurant 1
          </Text>
          <TouchableOpacity>
            <View className='flex flex-row justify-between items-center'>
              <FontAwesome name='star' size={24} color={Color.primary} />
              <Text className='font-roboto-regular text-xs text-center text-white ml-2'>
                4.8 (123)
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Location */}
        <View className='flex flex-row items-center py-3'>
          <View className='flex-[2]'>
            <View className='flex flex-row justify-start items-center pr-5'>
              <Ionicons name='location-sharp' size={20} color='white' />
              <Text
                className='text-left font-roboto-regular text-sm text-white ml-2 text-ellipsis overflow-hidden'
                numberOfLines={1}>
                123 Quang Trung, Gò Vấp, HCM
              </Text>
            </View>
          </View>
          <View className='flex-[1]'>
            <TouchableOpacity>
              <View className='flex flex-row justify-between items-center'>
                <Text className='font-roboto-regular text-xs text-left text-white ml-2'>
                  Show on map
                </Text>
                <FontAwesome5 name='angle-right' size={20} color='white' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Phone */}
        <View className='flex flex-row items-center py-3'>
          <View className='flex-[2]'>
            <View className='flex flex-row justify-start items-center pr-5'>
              <Ionicons
                name='ios-phone-portrait-sharp'
                size={20}
                color='white'
              />
              <Text className='text-left font-roboto-regular text-sm text-white ml-2 text-ellipsis overflow-hidden'>
                0989046281
              </Text>
            </View>
          </View>
          <View className='flex-[1]'>
            <TouchableOpacity>
              <View className='flex flex-row justify-between items-center'>
                <Text className='font-roboto-regular text-xs text-left text-white ml-2'>
                  Call up
                </Text>
                <FontAwesome5 name='angle-right' size={20} color='white' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Time */}
        <View className='flex flex-row items-center py-3'>
          <View className='flex-[2]'>
            <View className='flex flex-row justify-start items-center pr-5'>
              <MaterialCommunityIcons
                name='clock-time-five-outline'
                size={20}
                color='white'
              />
              <Text className='text-left font-roboto-regular text-sm text-white ml-2 text-ellipsis overflow-hidden'>
                Open now
              </Text>
            </View>
          </View>
          <View className='flex-[1]'>
            <TouchableOpacity>
              <View className='flex flex-row justify-between items-center'>
                <Text className='font-roboto-regular text-xs text-left text-white ml-2'>
                  Show schedule
                </Text>
                <FontAwesome5 name='angle-right' size={20} color='white' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Website */}
        <View className='flex flex-row items-center py-3'>
          <View className='flex-[2]'>
            <View className='flex flex-row justify-start items-center pr-5'>
              <MaterialCommunityIcons name='web' size={20} color='white' />
              <Text className='text-left font-roboto-regular text-sm text-white ml-2 text-ellipsis overflow-hidden'>
                https://alo99.com/
              </Text>
            </View>
          </View>
          <View className='flex-[1]'>
            <TouchableOpacity>
              <View className='flex flex-row justify-between items-center'>
                <Text className='font-roboto-regular text-xs text-left text-white ml-2'>
                  Open website
                </Text>
                <FontAwesome5 name='angle-right' size={20} color='white' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          className='mt-5 text-left font-roboto-regular text-sm text-white'
          numberOfLines={6}>
          Chào mừng bạn đến với nhà hàng Alo99 Chi Nhánh 1, điểm đến lý tưởng
          cho những trải nghiệm ẩm thực tuyệt vời tại thành phố. Chúng tôi tự
          hào là địa điểm hội tụ những hương vị tinh tế và không gian sang
          trọng, tạo nên một trải nghiệm ẩm thực độc đáo và đẳng cấp. Vị Trí Đắc
          Địa: Nhà hàng chúng tôi đặt tại vị trí thuận lợi, ngay trung tâm thành
          phố, tại [Địa chỉ: 123 Quang Trung, Gò Vấp, Hồ Chí Minh]. Với không
          gian rộng rãi và thiết kế hiện đại, Alo99 Chi Nhánh 1 mang đến không
          khí ấm cúng và thoải mái cho mọi buổi tiệc. Thực Đơn Phong Phú: Với
          bếp đầu bếp tài năng và đội ngũ đầu bếp chuyên nghiệp, thực đơn của
          chúng tôi mang đến sự đa dạng về hương vị từ các món ăn truyền thống
          đến những sáng tạo mới lạ. Khám phá thế giới ẩm thực tại Alo99 là một
          hành trình đầy ngon miệng.
        </Text>
      </View>
      <View className='absolute px-2 bottom-2 left-0 w-full'>
        <TouchableHighlight
          style={{ borderRadius: 6 }}
          underlayColor={'#fff'}
          onPress={() => console.log('TouchableHighlight')}>
          <View className=' bg-primary1 h-10 rounded-md flex justify-center items-center'>
            <Text className=' font-roboto-black text-md text-center text-white'>
              Book Table
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </>
  );
};

export default DetailsMenu;
