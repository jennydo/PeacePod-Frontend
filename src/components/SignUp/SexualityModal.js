import React, { useState } from 'react';

const SexualityModal = ({isOpen, onSave, onClose }) => {

    const [selectedSexualities, setSelectedSexualities] = useState([]);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedSexualities([...selectedSexualities, value]);
        } else {
            setSelectedSexualities(selectedSexualities.filter(item => item !== value));
        }
    };

    if (!isOpen) return null;

    return (
        <div>
            <button onClick={onClose}>Close</button>
            <h2>Choose your sexualities:</h2>
            <ul>
                <li>
                    <input
                        type="checkbox"
                        id="heterosexual"
                        value="Heterosexual"
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="heterosexual">Heterosexual</label>
                </li>
                <li>
                    <input
                        type="checkbox"
                        id="homosexual"
                        value="Homosexual"
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="homosexual">Homosexual</label>
                </li>
                <li>
                    <input
                        type="checkbox"
                        id="bisexual"
                        value="Bisexual"
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="bisexual">Bisexual</label>
                </li>
                
            </ul>
            <button onClick={() => {
                onSave(selectedSexualities)
                onClose()}}>Save</button>
        </div>
    )
}

export default SexualityModal