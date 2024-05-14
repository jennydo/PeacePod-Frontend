import React from'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button, 
    VStack,
    Box, Text,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Grid
  } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons';
import SpotifyMain from './Music/SpotifyMain';
import BackgroundMain from './Background/BackgroundMain';

const MeditationDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
  
    return (
      <>
        <Button 
          ref={btnRef} onClick={onOpen} rightIcon={<HamburgerIcon/>}>
          Menu
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
          size = 'sm'
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your Meditation Session</DrawerHeader>
  
            <DrawerBody>
              <VStack h="100%">
                <Box w='100%' h='50%'>
                    <BackgroundMain/>
                </Box>
                <Box w='100%' h='50%'>
                    <Tabs>
                        <TabList>
                            <Tab>Create your own</Tab>
                            <Tab>Choose from Spotify</Tab>
                            <Tab>Saved Voices</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <p>Create your own here</p>
                            </TabPanel>
                            <TabPanel>
                                <SpotifyMain/>
                            </TabPanel>
                            <TabPanel>
                                <p>Choose from your list of saved voices</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
              </VStack>
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue'>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  export default MeditationDrawer;