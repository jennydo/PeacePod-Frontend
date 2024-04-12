import React from 'react'
import {
    Text,
    CardHeader,
    CardBody,
    Card,
    Avatar,
    Flex
  } from "@chakra-ui/react";

const Comment = ({ comment }) => {

    // temporary data
  const avatar =
    "https://res.cloudinary.com/khoa165/image/upload/v1711083621/viettech/khue.jpg";
  const username = "chu de non";

  return (
    <>
      <Card margin='15px' bg='blanchedalmond'>
        <CardHeader paddingBottom='5px' >
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar name={username} src={avatar} />
            <Text color='#98B9F2' marginBottom={0}>LinkedIn Product Mangager</Text>
          </Flex>
        </CardHeader>
        <CardBody paddingTop='0px' paddingBottom='0px'>
          <Text>{comment}</Text>
        </CardBody>

      </Card>
    </>
  )
}

export default Comment