import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRss, faComments, faHeadphones } from '@fortawesome/free-solid-svg-icons';
import "./Footer.css"
import { Text, Stack, VStack } from "@chakra-ui/react";

const Cards = [
    {
        icon: faRss,
        label: "NewsFeed",
        to: "/newsfeed"
    },
    {
        icon: faComments,
        label: "Anonymous Chat",
        to: "/chat"
    },
    {
        icon: faHeadphones,
        label: "Meditation",
        to: "/meditation"
    }
]

export const ButtonCards = () => {
    return (
        <Stack className="button-container" direction='row' spacing={20} align='center'>
        {Cards.map((card, index) => (
            <Link to={card.to}>
                <Stack className="button-card" direction='column' spacing={10} align="center">
                    <div id="cloud">
                        <VStack className="button-content" direction='column' spacing={8} w={300} align="center">
                            {card.icon && <FontAwesomeIcon icon={card.icon} className="button-icon" />}
                            <Text className="button-label">{card.label}</Text>
                        </VStack>
                    </div>
                </Stack>
            </Link>
        ))}
        </Stack>
    );
};