import { GridItem} from '@chakra-ui/react'
import { useAvatarContext } from '../../../hooks/useAvatarContext'
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import { useState, useEffect, useMemo } from 'react'

const Character = ( {variant, attribute}) => {

    const [character, setCharacter] = useState(null);
    const { avatarData, dispatch } = useAvatarContext()

    const characterData = useMemo(() => ({
        ...avatarData,
        size: 100,
        [attribute]: [variant],
        beardProbability: (attribute === "beard") ? 100 : 0
    }), [avatarData, variant]);

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
            type: "SET_ATTRIBUTE",
            payload: {
              attribute,
              value: variant,
              probability: (attribute === "beard" || attribute === "earrings" || attribute === "glasses") ? 100 : undefined
            }
          })
    }

    return ( 
        <GridItem onClick={handleClick}>
            <img
                src={character}
                alt="User Profile"
            />
        </GridItem>
     );
}
 
export default Character;