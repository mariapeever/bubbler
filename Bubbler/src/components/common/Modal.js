import React, { useState } from 'react';

import { 
	IconButton,
	ClearButton,
	ClearButtonTitle,
	ModalBox,
	ModalContainer,
	ModalHeader,
	ModalBody,
	ModalTitle,
	Page } from '../../styled'

import Theme from '../../styled/Theme'

const Modal = (props) => {

    const [modalVisible, setModalVisible] = props.modal

	return (
		<>
			<ModalBox
		        animationType="slide"
		        transparent={true}
		        visible={modalVisible}
		        onRequestClose={() => {
		          Alert.alert("Modal has been closed.");
		          setModalVisible(!modalVisible);
		        }}
	     	 >

		        <ModalContainer>
					<Page>
						<ModalHeader>
							<ClearButton
								backgroundColor="transparent"
								color={Theme.color.body}
								name='close'
								onPress={() => setModalVisible(!modalVisible)}
							>
								<ClearButtonTitle>Cancel</ClearButtonTitle>
							</ClearButton>
							<ModalTitle>{props.title}</ModalTitle>
							<ClearButton
								backgroundColor="transparent"
								color={Theme.color.body}
								name='close'
								onPress={() => setModalVisible(!modalVisible)}
							>
								<ClearButtonTitle>Next</ClearButtonTitle>
							</ClearButton>
						</ModalHeader>
						<ModalBody>
						{props.screen}
						</ModalBody>
					</Page>
		        </ModalContainer>
	     	</ModalBox>
	     	<IconButton.Button
				backgroundColor="transparent"
				color={Theme.color.mainHighlight}
				name='create-outline'
				onPress={() => setModalVisible(!modalVisible)}
				size={24}
			/>
	     	
		</>
	)
}


export default Modal
