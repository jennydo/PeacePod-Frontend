import React from "react"
import { Link } from "react-router-dom"
import "./Footer.css"


const Cards = [
    {
        icon: "",
        label: "New Feed",
        to: "/new-feed"
    },
    {
        icon: "",
        label: "Anonymous Chat",
        to: "/chat"
    },
    {
        icon: "",
        label: "Meditation Pod",
        to: "/meditation"
    }
]

const ButtonCard = ({icon, label, to}) => {
    return (
        <Link to={to} className="button-card">
            {/* <img scr={icon} alt={label} className="button-icon"/> */}
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
                    // icon = {Cards.icon}
                    label = {card.label}
                    to = {card.to}
                />
            ))}
        </div>
    );
};