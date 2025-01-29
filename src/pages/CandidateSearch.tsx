import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandidateProfile from '../components/CandidateProfile';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [profiles, setProfiles] = useState({} as Candidate[]);
  const [currentProfile, setCurrentProfile] = useState({} as Candidate);
  
  useEffect(() => {
    const fetchProfiles = async () => {
      const data = await searchGithub();
      setProfiles(data);      
    };
    
    fetchProfiles();
  }, []);

  useEffect(() => {
    const fetchProfile = async (login:string) => {
      const single = await searchGithubUser(login);
      setCurrentProfile(single);
    }

    if (profiles.length > 0) {
      fetchProfile(profiles[0].login);
    }

  }, [profiles]);
  
  return (
    <>
      <h1>CandidateSearch</h1>
      <CandidateProfile profile={currentProfile} />
    </>
    )
};

export default CandidateSearch;
