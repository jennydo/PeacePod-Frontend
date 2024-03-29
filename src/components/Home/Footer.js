import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRss, faComments, faHeadphones } from '@fortawesome/free-solid-svg-icons';

import "./Footer.css"


const Cards = [
    {
        icon: faRss,
        label: "New Feed",
        to: "/new-feed"
    },
    {
        icon: faComments,
        label: "Anonymous Chat",
        to: "/chat"
    },
    {
        icon: faHeadphones,
        label: "Meditation Pod",
        to: "/meditation"
    }
]

const ButtonCard = ({icon, label, to}) => {
    return (
        <Link to={to} className="button-card">
            {/* <img src={icon} alt={label} className="button-icon"/> */}
            {icon && <FontAwesomeIcon icon={icon} className="button-icon"/>}
            <div className="button-label">{label}</div>
        </Link>
    )
}


export const ButtonCards = () => {
    return (
        <div className="button-container">
            {Cards.map((card, index) => (
                <ButtonCard
                    key = {index}
                    icon = {card.icon}
                    label = {card.label}
                    to = {card.to}
                />
            ))}
        </div>
    );
};