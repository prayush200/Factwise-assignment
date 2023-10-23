
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

// import CelebData from '../app/celebrities.json';
import CelebData from './celebrities.json'

import './style.css'


function Home() {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const [celebs, setCelebs] = useState(CelebData);
    const [openModal, setOpenModal] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Create state to track which accordion is in edit mode
    const [editAccordionIndex, setEditAccordionIndex] = useState(null);

    // Create state to track changes for the currently edited celebrity
    const [editedCeleb, setEditedCeleb] = useState({});

    const handleOpen = (index) => {
        setOpenModal(index);
    };

    const handleClose = () => {
        setOpenModal(null);
    };

    const Removeitem = (id) => {
        const newValue = celebs.filter((celeb) => celeb.id !== id);
        setCelebs(newValue);
        handleClose();
    };

    const calculateAge = (birthdate) => {
        const birthDate = new Date(birthdate);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        return age;
    };

    const handleEdit = (index) => {
        // Set the index of the accordion that is in edit mode
        setEditAccordionIndex(index);

        // Enter edit mode and set the celebrity details for editing
        setEditedCeleb(celebs[index]);
    };

    const saveEdit = () => {
        // Save the edited celebrity details back to the state
        const updatedCelebs = celebs.map((celeb, index) =>
            index === editAccordionIndex ? editedCeleb : celeb
        );
        setCelebs(updatedCelebs);

        // Reset the editAccordionIndex to exit edit mode
        setEditAccordionIndex(null);
    };

    const handleAgeChange = (e) => {
        // Handle age change and update editedCeleb
        setEditedCeleb({ ...editedCeleb, dob: e.target.value });
    };

    const handleCountryChange = (e) => {
        // Handle country selection change and update editedCeleb
        setEditedCeleb({ ...editedCeleb, country: e.target.value });
    };

    const handleDescriptionChange = (e) => {
        // Handle description change and update editedCeleb
        setEditedCeleb({ ...editedCeleb, description: e.target.value });
    };

    const filteredCelebs = celebs.filter((celeb) => {
        const fullName = `${celeb.first} ${celeb.last}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
    });

    const uniqueGenders = Array.from(new Set(celebs.map((celeb) => celeb.gender)));
    const uniqueCountries = Array.from(new Set(celebs.map((celeb) => celeb.country)));









    return (
        <main>
            <div className="container justify-content-center text-center mt-5">
                <form>

                    <input
                        className="search"
                        type="search"
                        placeholder="Search....."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}

                    />

                </form>
                <div className="mt-5">
                    {filteredCelebs.map((celeb, index) => (
                        <div className="map" key={celeb.id}>
                            <Accordion sx={{ width: '50%' }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>
                                        <div className="typo1">
                                            <Avatar
                                                sx={{ padding: "2px", marginLeft: "8px", marginRight: "20px" }}
                                                alt="Remy Sharp"
                                                src={celeb.picture}
                                            />
                                            <h5>{celeb.first} {celeb.last}</h5>
                                        </div>
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <div className="container left">
                                            <div className="row">
                                                <div className="col">
                                                    <div>
                                                        <p>Age</p>
                                                        {editAccordionIndex === index ? (
                                                            <input
                                                                type="date"
                                                                value={editedCeleb.dob}
                                                                onChange={handleAgeChange}
                                                            />
                                                        ) : (
                                                            <p> {calculateAge(celeb.dob)}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <p>Genders</p>
                                                    <select
                                                        name="genders"
                                                        id="genders-select"
                                                        value={editAccordionIndex === index ? editedCeleb.gender : celeb.gender}
                                                        onChange={(e) =>
                                                            setEditedCeleb({ ...editedCeleb, gender: e.target.value })
                                                        }
                                                        disabled={editAccordionIndex !== index}
                                                    >
                                                        {uniqueGenders.map((gender) => (
                                                            <option key={gender} value={gender}>
                                                                {gender}
                                                            </option>
                                                        ))}
                                                        <option value="transgender">transgender</option>
                                                        <option value="prefer not to say">prefer not to say</option>
                                                    </select>
                                                </div>
                                                <div className="col">
                                                    <p>Country</p>
                                                    {editAccordionIndex === index ? (
                                                        <select
                                                            name="country"
                                                            id="country-select"
                                                            value={editedCeleb.country}
                                                            onChange={handleCountryChange}
                                                            disabled={editAccordionIndex !== index}
                                                        >
                                                            {uniqueCountries.map((country) => (
                                                                <option key={country} value={country}>
                                                                    {country}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <p>{celeb.country}</p>
                                                    )}
                                                </div>

                                            </div>
                                            <div className="row mt-4">
                                                <div className="col">
                                                    <p>Description</p>
                                                    {editAccordionIndex === index ? (
                                                        <textarea
                                                            value={editedCeleb.description}
                                                            onChange={handleDescriptionChange}
                                                        />
                                                    ) : (
                                                        <p>{celeb.description}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container icons">
                                            {editAccordionIndex === index ? (
                                                <>
                                                    <button className="btns" onClick={saveEdit}>
                                                        Save
                                                    </button>
                                                    <button
                                                        className="btns"
                                                        onClick={() => setEditAccordionIndex(null)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <DeleteIcon
                                                        sx={{ color: "red" }}
                                                        onClick={() => handleOpen(index)}
                                                    />
                                                    <EditIcon
                                                        sx={{ color: "blue" }}
                                                        onClick={() => handleEdit(index)}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Modal
                                style={{ zIndex: 1300 }}
                                open={openModal === index}
                                onClose={handleClose}
                                aria-labelledby="child-modal-title"
                                aria-describedby="child-modal-description"
                            >
                                <Box sx={{ ...style, width: 400 }}>
                                    <div className="">
                                        <p style={{ textAlign: "left" }} id="child-modal-description">
                                            Are you sure you want to delete?
                                        </p>
                                        <div style={{ textAlign: "end" }}>
                                            <button className="btns" onClick={handleClose}>
                                                Cancel
                                            </button>
                                            <button
                                                className="btns"
                                                id="btn2"
                                                onClick={() => Removeitem(celeb.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Home
