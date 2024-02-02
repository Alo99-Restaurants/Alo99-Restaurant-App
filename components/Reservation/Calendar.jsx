import moment from 'moment';
import React, { useState, Fragment, useCallback, useMemo, useRef } from 'react';
import {
  StyleSheet
} from 'react-native';
import { Calendar, CalendarUtils } from 'react-native-calendars';

const CalendarScreen = ({day, onChange}) => {
  const currentDate = moment().format('YYYY-MM-DD');
  // const [selected, setSelected] = useState(currentDate);

  const onDayPress = useCallback((day) => {
    onChange(day.dateString);
  }, []);

  const marked = useMemo(() => {
    return {
      [currentDate]: { textColor: 'green' },
      [day]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: '#F7BE20',
        selectedTextColor: 'white'
      }
    };
  }, [day]);

  const renderCalendarWithSelectableDate = () => {
    return (
      <Fragment>
        <Calendar
          enableSwipeMonths
          current={currentDate}
          style={styles.calendar}
          onDayPress={onDayPress}
          markedDates={marked}
          minDate={currentDate}
        />
      </Fragment>
    );
  };

  return <Fragment>{renderCalendarWithSelectableDate()}</Fragment>;
};

export default CalendarScreen;

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
    borderRadius: 5
  }
});
