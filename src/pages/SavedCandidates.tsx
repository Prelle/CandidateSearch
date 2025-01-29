import Candidate from "../interfaces/Candidate.interface";
import { useState, useEffect } from "react";
import localStorageService from "../utilities/localStorage";
import CandidateList from "../components/CandidateList";

const SavedCandidates = () => {
  const [ candidates, setCandidates ] = useState({} as Candidate[]);

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = localStorageService.getCandidates();
      setCandidates(data);
    };

    fetchCandidates();
  }, []);

  return (
    <>
      <h1>Potential Candidates</h1>
      <CandidateList candidates={candidates} />      
    </>
  );
};

export default SavedCandidates;
