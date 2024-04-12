import React from 'react'
import {
    Text,
    CardHeader,
    CardBody,
    Card,
    Avatar,
    Flex
  } from "@chakra-ui/react";
import ShowMoreText from 'react-show-more-text';
import './Comment.css'

const Comment = ({ comment }) => {

    // temporary data
  // const avatar =
  //   "https://res.cloudinary.com/khoa165/image/upload/v1711083621/viettech/khue.jpg";

  const avatar = "https://scontent-ord5-2.xx.fbcdn.net/v/t1.15752-9/436355583_3281700522126354_6682626957706607125_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=7XeVivt3v3oAb7FAXs_&_nc_ht=scontent-ord5-2.xx&oh=03_AdUoBd-V6zBOdFdlbGT82wDD0ESH4cpMsPl_kofxwkpE2Q&oe=663FB98A";
  const username = "chu de non";

  return (
    <>
      <Card margin='15px' bg='#dee2ff'>
        <CardHeader paddingBottom='5px' >
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar name={username} src={avatar} />
            <Text color='#98B9F2' marginBottom={0}>LinkedIn Product Mangager</Text>
          </Flex>
        </CardHeader>
        <CardBody padding='10px'>
          <ShowMoreText
            lines={2}
            anchorClass='show-more-click'
          >
            <Text>{comment}</Text>            
          </ShowMoreText>
          {/* <Text>{comment}</Text>    */}
        </CardBody>

      </Card>
    </>
  )
}

export default Comment