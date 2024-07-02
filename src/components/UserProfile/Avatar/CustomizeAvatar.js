import { Tabs, TabList, TabPanels, Tab, TabPanel, Grid, Switch, FormLabel, HStack } from '@chakra-ui/react';
import { headConstants, eyeConstants, eyebrowConstants, mouthConstants, noseConstants, hairConstants, beardConstants, earringConstants, glassConstants, colors } 
from './avatarConstants';
import './AvatarStyle.css';
import Character from './CharacterFeature/Character';
import { useState } from 'react';
import { useAvatarContext } from '../../../hooks/useAvatarContext';
import OptionalCharacter from './CharacterFeature/OptionalCharacter';
import NoFeatureCharacter from './CharacterFeature/NoFeatureCharacter';

const CustomizeAvatar = () => {
    const { avatarData, dispatch } = useAvatarContext();
    const [selectedColor, setSelectedColor] = useState(avatarData.backgroundColor[0]);
    const [hasFreckles, setHasFreckles] = useState(avatarData.frecklesProbability);

    const handleBackgroundColorChange = (color) => {
        setSelectedColor(color);
        dispatch({
            type: "SET_ATTRIBUTE",
            payload: { attribute: "backgroundColor", value: color.substring(1) }
        });
    };

    const handleHasFreckles = (e) => {
      setHasFreckles(e.target.checked ? 100 : 0);
      dispatch({
        type: "SET_PROBABILITY",
        payload: {
          attribute: "frecklesProbability",
          value: e.target.checked ? 100 : 0
        }
      });
    };

    return ( 
    <Tabs isFitted isLazy>
        <TabList css={{ display: 'flex', flexWrap: 'nowrap' }} overflowX="auto" >
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
            <Grid gap={6} templateColumns='repeat(4, 1fr)'>
                {headConstants.map((headConstant, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Character key={idx} attribute="head" variant={headConstant}/>
                ))}
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid gap={6} templateColumns='repeat(4, 1fr)'>
                {eyeConstants.map((eyeConstant, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Character key={idx} attribute="eyes" variant={eyeConstant}/>
                ))}
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid gap={6} templateColumns='repeat(4, 1fr)'>
                {eyebrowConstants.map((eyebrowConstant, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Character key={idx} attribute="eyebrows" variant={eyebrowConstant}/>
                ))}
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid gap={6} templateColumns='repeat(4, 1fr)'>
                {mouthConstants.map((mouthConstant, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Character key={idx} attribute="mouth" variant={mouthConstant}/>
                ))}
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid gap={6} templateColumns='repeat(4, 1fr)'>
                {noseConstants.map((noseConstant, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Character key={idx} attribute="nose" variant={noseConstant}/>
                ))}
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid gap={6} templateColumns='repeat(4, 1fr)'>
                {hairConstants.map((hairConstant, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Character key={idx} attribute="hair" variant={hairConstant}/>
                ))}
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid gap={6} templateColumns='repeat(4, 1fr)'>
              <NoFeatureCharacter attribute="beard" />
              {beardConstants.map((beardConstant, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                  <OptionalCharacter key={idx} attribute="beard" variant={beardConstant}/>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid gap={6} templateColumns='repeat(4, 1fr)'>
              <NoFeatureCharacter attribute="earrings" />
              {earringConstants.map((earringConstant, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                  <OptionalCharacter key={idx} attribute="earrings" variant={earringConstant}/>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid gap={6} templateColumns='repeat(4, 1fr)'>
              <NoFeatureCharacter attribute="glasses" />
              {glassConstants.map((glassConstant, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                  <OptionalCharacter key={idx} attribute="glasses" variant={glassConstant}/>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid gap={6} templateColumns='repeat(4, 1fr)'>
              <NoFeatureCharacter attribute="hairAccessories" />
              <OptionalCharacter attribute="hairAccessories" variant="flowers"/>
            </Grid>
          </TabPanel>

          <TabPanel>  
            <HStack>
                <FormLabel htmlFor='addFreckles'>Add Freckles:</FormLabel>
                <Switch checked={hasFreckles} id='addFreckles' onChange={handleHasFreckles}/>
            </HStack>
          </TabPanel>

          <TabPanel>
            <div className="color-picker">
                {colors.map((color, index) => (
                    <div
                        // eslint-disable-next-line react/no-array-index-key
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
};
 
export default CustomizeAvatar;