import { GridItem, Image } from '@chakra-ui/react'
import { useAvatarContext } from '../../../../hooks/useAvatarContext'
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import { useState, useEffect, useMemo } from 'react'

const NoFeatureCharacter = ( {attribute}) => {

    const [character, setCharacter] = useState(null);
    const { avatarData, dispatch } = useAvatarContext()

    const characterData = useMemo(() => ({
        ...avatarData,
        size: 100,
        [`${attribute}Probability`]: 0
    }), [avatarData]);

    useEffect(() => {
        const generateCharacter = async () => {
            await createAvatar(lorelei, characterData)
                .toDataUri()
                .then(promise => setCharacter(promise))
        }
        generateCharacter();
      }, [characterData]);
    
    const handleClick = () => {
        dispatch({
            type: "SET_PROBABILITY",
            payload: {
                attribute: [`${attribute}Probability`],
                value: 0 
            }
            
        })
    }

    return ( 
        <GridItem onClick={handleClick} >
            <Image
                borderRadius='full'
                src={character}
                alt="User Profile"
            />
        </GridItem>
     );
}
 
export default NoFeatureCharacter;