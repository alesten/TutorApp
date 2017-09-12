import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './components/Home';
import Student from './components/Student';

export default StackNavigator({
    Home: {
        screen: Home
    },
    Student: {
        screen: Student
    }
});
