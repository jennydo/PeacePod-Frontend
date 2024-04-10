import React from 'react'
import {
    Text,
    CardHeader,
    CardBody,
    CardFooter,
    Card,
    Flex,
    Avatar,
    Box,
    IconButton,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    Divider,
    Center
  } from "@chakra-ui/react";

const Comment = ({ comment }) => {
  return (
    <>
      <Card margin='15px' bg='blanchedalmond'>
        <CardHeader paddingBottom='5px'>
            <Text color='#98B9F2' marginBottom={0}>khoalebatbai</Text>
        </CardHeader>
        <CardBody paddingTop='0px' paddingBottom='0px'>
          <Text>{comment}</Text>
        </CardBody>

      </Card>
    </>
  )
}

export default Comment