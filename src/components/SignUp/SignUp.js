import React, { useState } from 'react';
import './SignUp.css';
import SexualityModal from './SexualityModal.js';

const SignUp = () => {
    
    const [selectedPronoun, setSelectedPronoun] = useState(null);
    const handlePronounSelected = (choice) => {
        setSelectedPronoun(choice);
    }

    const [selectedGender, setSelectedGender] = useState(null);
    const handleGenderSelected = (choice) => {
        setSelectedGender(choice);
    }

    const [showGender, setShowGender] = useState(false);
    const handleShowGenderChange = () => {
        setShowGender(!showGender);
    }

    const [isSexualityModalOpen, setSexualityModalOpen] = useState(false);
    const [selectedSexualities, setSelectedSexualities] = useState([]);
    const openSexualityModal = () => {
        setSexualityModalOpen(true);
    }
    const closeSexualityModal = () => {
        setSexualityModalOpen(false);
    }
    const saveSexualityModal = (selectedOptions) => {
        setSelectedSexualities(selectedOptions);
    }
    const [showSexuality, setShowSexuality] = useState(false);
    const handleShowSexualityChange = () => {
        setShowSexuality(!showSexuality);
    }
    
    return ( 
        <div>

            {/* CHOOSE PRONOUN */}
            <div className="pronouns">
                <label>Pronouns:</label>
                <button
                    className={`pronoun-option ${selectedPronoun === "he/him" ? "selected" : ""}`}
                    onClick={() => handlePronounSelected("he/him")}>
                    He/Him
                </button>
                <button
                    className={`pronoun-option ${selectedPronoun === "she/her" ? "selected" : ""}`}
                    onClick={() => handlePronounSelected("she/her")}>
                    She/Her
                </button>
                <button
                    className={`pronoun-option ${selectedPronoun === "they/them" ? "selected" : ""}`}
                    onClick={() => handlePronounSelected("they/them")}>
                    They/Them
                </button>
                <button
                    className={`pronoun-option ${selectedPronoun === "other" ? "selected" : ""}`}
                    onClick={() => handlePronounSelected("other")}>
                    Other
                </button>
            </div>

            {/* CHOOSE GENDER */}
            <div className="genders">
                <label>Gender:</label>
                <button
                    className={`gender-option ${selectedGender === "man" ? "selected" : ""}`}
                    onClick={() => handleGenderSelected("man")}>
                    Man
                </button>
                <button
                    className={`gender-option ${selectedGender === "woman" ? "selected" : ""}`}
                    onClick={() => handleGenderSelected("woman")}>
                    Woman
                </button>
                <button
                    className={`gener-option ${selectedGender === "nonbinary" ? "selected" : ""}`}
                    onClick={() => handleGenderSelected("nonbinary")}>
                    Nonbinary
                </button>
                <button
                    className={`gender-option ${selectedGender === "other" ? "selected" : ""}`}
                    onClick={() => handleGenderSelected("other")}>
                    Other
                </button>
                <label>
                    <input type="checkbox" checked={showGender} onChange={handleShowGenderChange}/>
                    Show gender on my profile
                </label>
            </div>

            {/* CHOOSE SEXUAL ORIENTATION */}
            <div>
                <label>Sexual Orientation:</label>
                <button onClick={openSexualityModal}>Add sexual orientation</button>
                <SexualityModal isOpen={isSexualityModalOpen} onSave={saveSexualityModal} onClose={closeSexualityModal}/>
                <label>
                    <input type="checkbox" checked={showSexuality} onChange={handleShowSexualityChange}/>
                    Show sexual orientations on my profile
                </label>
            </div>

            {/* CHOOSE INTERESTS */}
            <div>
                <label>Interests:</label>

            </div>


        </div>

     );
}
 
export default SignUp;



