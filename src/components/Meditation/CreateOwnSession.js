import React, { useState } from 'react'
import {
    Flex,
    Text,
    Input, 
    Textarea
} from '@chakra-ui/react'

const CreateOwnSession = ({ session, setSession }) => {
    const [ duration, setDuration ] = useState("")
    const [ mood, setMood ] = useState("")
    const [ tone, setTone ] = useState("")
    const [ extraNotes, setExtraNotes ] = useState("")

    return (
        <Flex flexDirection='column'>
            <Text fontSize='2xl'>Duration</Text>
            <Input 
                placeholder='duration of the session in minutes'
                value={duration}
                onChange={(e) => {
                    setDuration(e.target.value)
                    setSession({...session, duration: e.target.value})
                }}    
            />

            <Text fontSize='2xl'>Mood</Text>
            <Input 
                placeholder='e.g. sad, happy'
                value={mood}
                onChange={(e) => {
                    setMood(e.target.value)
                    setSession({...session, mood: e.target.value})    
                }}    
            />

            <Text fontSize='2xl'>Tone</Text>
            <Input 
                placeholder='reading tone of the session'
                value={tone}
                onChange={(e) => {
                    setTone(e.target.value)
                    setSession({...session, tone: e.target.value})    
                }}    
            />

            <Text fontSize='2xl'>Extra notes</Text>
            <Textarea 
                placeholder='any extra notes...'
                value={extraNotes}
                onChange={(e) => {
                    setExtraNotes(e.target.value)
                    setSession({...session, extraNotes: e.target.value})    
                }}
                sz='sm'
            />
        </Flex>
  )
}

export default CreateOwnSession