const headConstants = ["variant01", "variant02", "variant03", "variant04"];

const eyeConstants = ["variant01", "variant02", "variant03", "variant04", "variant05", "variant06", "variant07",
"variant08", "variant09", "variant10", "variant11", "variant12", "variant13", "variant14", "variant15",
"variant16", "variant17", "variant18", "variant19", "variant20", "variant21", "variant22", "variant23", "variant24"];

const eyebrowConstants = ["variant01", "variant02", "variant03", "variant04", "variant05", "variant06", "variant07",
"variant08", "variant09", "variant10", "variant11", "variant12", "variant13"];

const mouthConstants = ["happy01", "happy02", "happy03", "happy04", "happy05", "happy06", "happy07",
"happy08", "happy09", "happy10", "happy11", "happy12", "happy13", "happy14", "happy15",
"happy16", "happy17", "happy18", "sad01", "sad02", "sad03", "sad04", "sad05", "sad06", "sad07",
"sad08", "sad09"];

const noseConstants = ["variant01", "variant02", "variant03", "variant04", "variant05", "variant06"];

const hairConstants = [];
for (let i = 1; i <= 48; i++) {
    const variant = `variant${i.toString().padStart(2, '0')}`;
    hairConstants.push(variant);
}

const beardConstants = ["variant01", "variant02"];

const earringConstants = ["variant01", "variant02", "variant03"];

const glassConstants = ["variant01", "variant02", "variant03", "variant04", "variant05"];

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

// eslint-disable-next-line no-undef
module.exports = { 
    headConstants, 
    eyeConstants, 
    eyebrowConstants,
    mouthConstants, 
    noseConstants, 
    hairConstants, 
    beardConstants, 
    earringConstants, 
    glassConstants,  
    colors}; 