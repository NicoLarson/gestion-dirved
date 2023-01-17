// create component who read a PDF file and display it
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router';


const OpenFile = () => {
    const params = useParams();
    const navigate = useNavigate();

    return (
        <div>
            <h2>TEST</h2>
            <p>
                {params.path}
                <a href={params.path} onClick={window.open(params.path)}>Click</a>

            </p>
        </div>
    );
}

export default OpenFile;


