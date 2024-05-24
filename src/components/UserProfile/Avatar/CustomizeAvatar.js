import { Tabs, TabList, TabPanels, Tab, TabPanel, Grid, Switch, FormLabel, FormControl, SimpleGrid, HStack } from '@chakra-ui/react'
import { headConstants, eyeConstants, eyebrowConstants, mouthConstants, noseConstants, hairConstants, beardConstants, earringConstants, glassConstants, colors } 
from './avatarConstants';
import './AvatarStyle.css';
import Character from './CharacterFeature/Character';
import { useState } from 'react';
import { useAvatarContext } from '../../../hooks/useAvatarContext'
import OptionalCharacter from './CharacterFeature/OptionalCharacter';
import NoFeatureCharacter from './CharacterFeature/NoFeatureCharacter';

const CustomizeAvatar = () => {
    const { avatarData, dispatch } = useAvatarContext()
    const [selectedColor, setSelectedColor] = useState(avatarData.backgroundColor[0]);
    const [hasFreckles, setHasFreckles] = useState(avatarData.frecklesProbability)

    const handleBackgroundColorChange = (color) => {
        setSelectedColor(color);
        dispatch({
            type: "SET_ATTRIBUTE",
            payload: { attribute: "backgroundColor", value: color.substring(1) }
        })
    };

    const handleHasFreckles = (e) => {
      setHasFreckles(e.target.checked ? 100 : 0)
      dispatch({
        type: "SET_PROBABILITY",
        payload: {
          attribute: "frecklesProbability",
          value: e.target.checked ? 100 : 0
        }
      })
    }

    return ( 
    <Tabs isFitted isLazy>
        <TabList overflowX="auto" css={{ display: 'flex', flexWrap: 'nowrap' }} >
          <Tab>Head</Tab>
          <Tab>Eyes</Tab>
          <Tab>Eyebrows</Tab>
          <Tab>Mouth</Tab>
          <Tab>Nose</Tab>
          <Tab>Hair</Tab>
          <Tab>Beard</Tab>
          <Tab>Earrings</Tab>
          <Tab>Glasses</Tab>
          <Tab>Flowers</Tab>
          <Tab>Freckles</Tab>
          <Tab>Background Color</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                {headConstants.map((headConstant, idx) => (
                    <Character key={idx} variant={headConstant} attribute="head"/>
                ))}
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                {eyeConstants.map((eyeConstant, idx) => (
                    <Character key={idx} variant={eyeConstant} attribute="eyes"/>
                ))}
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                {eyebrowConstants.map((eyebrowConstant, idx) => (
                    <Character key={idx} variant={eyebrowConstant} attribute="eyebrows"/>
                ))}
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                {mouthConstants.map((mouthConstant, idx) => (
                    <Character key={idx} variant={mouthConstant} attribute="mouth"/>
                ))}
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                {noseConstants.map((noseConstant, idx) => (
                    <Character key={idx} variant={noseConstant} attribute="nose"/>
                ))}
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                {hairConstants.map((hairConstant, idx) => (
                    <Character key={idx} variant={hairConstant} attribute="hair"/>
                ))}
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
              <NoFeatureCharacter attribute="beard" />
              {beardConstants.map((beardConstant, idx) => (
                  <OptionalCharacter key={idx} variant={beardConstant} attribute="beard"/>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
              <NoFeatureCharacter attribute="earrings" />
              {earringConstants.map((earringConstant, idx) => (
                  <OptionalCharacter key={idx} variant={earringConstant} attribute="earrings"/>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
              <NoFeatureCharacter attribute="glasses" />
              {glassConstants.map((glassConstant, idx) => (
                  <OptionalCharacter key={idx} variant={glassConstant} attribute="glasses"/>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
              <NoFeatureCharacter attribute="hairAccessories" />
              <OptionalCharacter variant={"flowers"} attribute="hairAccessories"/>
            </Grid>
          </TabPanel>

          <TabPanel>  
            <HStack>
                <FormLabel htmlFor='addFreckles'>Add Freckles:</FormLabel>
                <Switch id='addFreckles' checked={hasFreckles} onChange={handleHasFreckles}/>
            </HStack>
          </TabPanel>

          <TabPanel>
            <div className="color-picker">
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className="color-circle"
                        style={{ backgroundColor: color }}
                        onClick={() => handleBackgroundColorChange(color)}>
                        {color === selectedColor && "✔"}
                    </div>
                ))}
            </div>
          </TabPanel>
          
        </TabPanels>

      </Tabs> 
    );
}
 
export default CustomizeAvatar;