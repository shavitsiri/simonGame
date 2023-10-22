
import React from "react";
import renderer from 'react-test-renderer';
import ResultsScreen from "../Screens/ResultsScreen";
import { FlatList, Text } from "react-native";




it('renders the flatlist component',()=>{
    const tree = renderer.create(
        <FlatList 
            data={['item1','item2','item3',]}
            keyExtractor={item=>item}
            renderItem={({item})=><Text>{item}</Text>}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
})



