const headConstants = ["variant01", "variant02", "variant03", "variant04"]

const eyeConstants = ["variant01", "variant02", "variant03", "variant04", "variant05", "variant06", "variant07",
"variant08", "variant09", "variant10", "variant11", "variant12", "variant13", "variant14", "variant15",
"variant16", "variant17", "variant18", "variant19", "variant20", "variant21", "variant22", "variant23", "variant24"]

const eyebrowConstants = ["variant01", "variant02", "variant03", "variant04", "variant05", "variant06", "variant07",
"variant08", "variant09", "variant10", "variant11", "variant12", "variant13"]

const mouthConstants = ["happy01", "happy02", "happy03", "happy04", "happy05", "happy06", "happy07",
"happy08", "happy09", "happy10", "happy11", "happy12", "happy13", "happy14", "happy15",
"happy16", "happy17", "happy18", "sad01", "sad02", "sad03", "sad04", "sad05", "sad06", "sad07",
"sad08", "sad09"]

const noseConstants = ["variant01", "variant02", "variant03", "variant04", "variant05", "variant06"]

const hairConstants = []
for (let i = 1; i <= 48; i++) {
    const variant = `variant${i.toString().padStart(2, '0')}`;
    hairConstants.push(variant);
}

const beardConstants = ["variant01", "variant02"]

const earringConstants = ["variant01", "variant02", "variant03"]

const glassConstants = ["variant01", "variant02", "variant03", "variant04", "variant05"]



// const [frecklesProbability, setFrecklesProbability] = useState(0) // or 100
//     const [beardProbability, setBeardProbability] = useState(0) // or 100
//     const [earringsProbability, setEarringsProbability] = useState(0) // or 100 
//     const [glassesProbability, setGlassesProbability] = useState(0)
//     const [hairAccessoriesProbability, setHairAccessoriesProbability] = useState(0)
//     const [backgroundColor, setBackgroundColor] = useState("c0aede")
//     const [backgroundType, setBackgroundType] = useState("solid") // or gradientLinear

module.exports = { headConstants, eyeConstants, eyebrowConstants, mouthConstants, noseConstants, hairConstants, beardConstants, earringConstants, glassConstants } 