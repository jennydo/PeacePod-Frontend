import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRss, faComments, faHeadphones } from '@fortawesome/free-solid-svg-icons';
import "./NavCards.css";
import { Text, VStack } from "@chakra-ui/react";

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
];

export const NavCards = () => {
    return (
        <div className="button-container" direction='row' align='center'>
            {Cards.map((card, index) => (
                <div className="button-card" key={index} data-testid={`button-card-${card.label}`}>
                    <Link to={card.to}>
                        <div className="button">
                            <div className="cloud">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round">
                                        </g>
                                        <g id="SVGRepo_iconCarrier"> 
                                            <path d="M16.2857 20C19.4416 20 22 17.4717 22 14.3529C22 11.8811 20.393 9.78024 18.1551 9.01498C17.8371 6.19371 15.4159 4 12.4762 4C9.32028 4 6.7619 6.52827 6.7619 9.64706C6.7619 10.3369 6.88706 10.9978 7.11616 11.6089C6.8475 11.5567 6.56983 11.5294 6.28571 11.5294C3.91878 11.5294 2 13.4256 2 15.7647C2 18.1038 3.91878 20 6.28571 20H16.2857Z" fill="#ffffff">
                                            </path> 
                                    </g>
                                </svg>
                            </div>
                            <VStack className="button-content" direction='column' spacing={8} w={300} align="center">
                                {card.icon && <FontAwesomeIcon icon={card.icon} className="button-icon" />}
                                <Text className="button-label" fontSize={'2xl'}>{card.label}</Text>
                            </VStack>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};