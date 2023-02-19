import { View, Text, Modal, TextInput, Pressable } from 'react-native'
import React from 'react'

// Reward amounts and times could be a slider? Completely doable if design ppl want it

const SearchFiltersModal = (props) => {
  return (

    <Modal
    visible={props.showModal} 
    animationType='slide'
    onRequestClose={props.hideModal}
    >

      <View>

        <Text>Date</Text>
        <TextInput placeholder={'xx-xx-xx'}/>
        <TextInput placeholder={'xx-xx-xx'}/>

        <Text>Reward amount</Text>
        <TextInput placeholder={'Min'}/>
        <TextInput placeholder={'Max'}/>

        <Text>Start time</Text>
        <TextInput placeholder={'Earliest'}/>
        <TextInput placeholder={'Latest'}/>

        <Text>End time</Text>
        <TextInput placeholder={'Earliest'}/>
        <TextInput placeholder={'Latest'}/>

        <Pressable onPress={props.hideModal}>
          <Text>Close</Text>
        </Pressable>

      </View>

    </Modal>

  )
  
}

export default SearchFiltersModal