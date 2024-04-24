import { Tabs, TabList, TabPanels, Tab, TabPanel, Grid, Switch, FormLabel, FormControl, SimpleGrid, HStack } from '@chakra-ui/react'
import { headConstants, eyeConstants, eyebrowConstants, mouthConstants, noseConstants, hairConstants, beardConstants, earringConstants, glassConstants } 
from './avatarConstants';
import './AvatarStyle.css';
import Character from './Character';
import { useState } from 'react';
import { useAvatarContext } from '../../../hooks/useAvatarContext'

const CustomizeAvatar = () => {
    const { avatarData, dispatch } = useAvatarContext()

    const [hasBeard, setHasBeard] = useState(avatarData.beardProbability)
    const [hasEarrings, setHasEarrings] = useState(avatarData.earringsProbability)
    const [hasGlasses, setHasGlasses] = useState(avatarData.glassesProbability)
    const [selectedColor, setSelectedColor] = useState(avatarData.backgroundColor[0]);
    const [wearFlowers, setWearFlowers] = useState(avatarData.hairAccessoriesProbability)
    const [hasFreckles, setHasFreckles] = useState(avatarData.frecklesProbability)

    const colors = [
        "#FFFFF",
        "#FFC0CB", // Pink
        "#FFD700", // Gold
        "#87CEEB", // Sky Blue
        "#FFA07A", // Light Salmon
        "#FF69B4", // Hot Pink
        "#ADD8E6", // Light Blue
        "#FF6347", // Tomato
        "#F08080", // Light Coral
        "#FFDAB9", // Peachpuff
        "#20B2AA", // Light Sea Green
        "#FAFAD2", // Light Goldenrod Yellow
        "#9370DB", // Lavender
        "#00CED1", // Dark Turquoise
    ];

    const handleBackgroundColorChange = (color) => {
        setSelectedColor(color);
        dispatch({
            type: "SET_ATTRIBUTE",
            payload: { attribute: "backgroundColor", value: color.substring(1) }
        })
    };

    const handleCheckBeard = (e) => {
        setHasBeard(e.target.checked)
        if (!e.target.checked) {
            const currentValue = avatarData.beard; 
        
            dispatch({
              type: "SET_ATTRIBUTE",
              payload: {
                attribute: "beard",
                value: currentValue, 
                probability: null
              }
            });
    }}

    const handleCheckEarrings = (e) => {
        setHasEarrings(e.target.checked)
        if (!e.target.checked) {
            const currentValue = avatarData.earrings; 
        
            dispatch({
              type: "SET_ATTRIBUTE",
              payload: {
                attribute: "earrings",
                value: currentValue, 
                probability: 0 
              }
            });
    }}

    const handleCheckGlasses = (e) => {
        setHasGlasses(e.target.checked)
        if (!e.target.checked) {
            const currentValue = avatarData.glasses; 
        
            dispatch({
              type: "SET_ATTRIBUTE",
              payload: {
                attribute: "glasses",
                value: currentValue, 
                probability: 0 
              }
            });
    }}

    const handleWearFlowers = (e) => {
        setWearFlowers(e.target.checked ? 100 : 0)
        dispatch({
            type: "SET_ATTRIBUTE",
            payload: {
            attribute: "hairAccessoriesProbability",
            value: e.target.checked ? "100" : "0"
    }})}

    const handleHasFreckles = (e) => {
        setHasFreckles(e.target.checked ? 100 : 0)
        dispatch({
            type: "SET_ATTRIBUTE",
            payload: {
            attribute: "frecklesProbability",
            value: e.target.checked ? "100" : "0"
    }})}

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
          <Tab>Other</Tab>
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
            <div className="attribute-checked">
                <Switch checked={hasBeard} onChange={handleCheckBeard}/>
            </div>
            {hasBeard && 
                <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                    {beardConstants.map((beardConstant, idx) => (
                        <Character key={idx} variant={beardConstant} attribute="beard"/>
                    ))}
                </Grid>
            }  
          </TabPanel>

          <TabPanel>
            <div className="attribute-checked">
                <Switch checked={hasEarrings} onChange={handleCheckEarrings}/>
            </div>
            {hasEarrings && 
                <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                    {earringConstants.map((earringConstant, idx) => (
                        <Character key={idx} variant={earringConstant} attribute="earrings"/>
                    ))}
                </Grid>
            }  
          </TabPanel>

          <TabPanel>
            <div className="attribute-checked">
                <Switch checked={hasGlasses} onChange={handleCheckGlasses}/>
            </div>
            {hasGlasses && 
                <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                    {glassConstants.map((glassConstant, idx) => (
                        <Character key={idx} variant={glassConstant} attribute="glasses"/>
                    ))}
                </Grid>
            }  
          </TabPanel>

          <TabPanel>
            <HStack>
                <FormLabel htmlFor='wearFlowers'>Wear Flowers:</FormLabel>
                <Switch id='wearFlowers' checked={wearFlowers} onChange={handleWearFlowers}/>
            </HStack>
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