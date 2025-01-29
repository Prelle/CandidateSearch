import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandidateProfile from '../components/CandidateProfile';
import Candidate from '../interfaces/Candidate.interface';
import minusButton from '../assets/minus-red-circle-20564.svg';
import plusButton from '../assets/plus-circle-green-symbol-22249.svg'
import localStorageService from '../utilities/localStorage';

// const sample: Candidate = {
//   id: 0,
//   avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
//   node_id: 'MDQ6VXNlcjE=',
//   login: 'sample',
//   name: 'Sample User',
//   location: 'Sample Location',
//   email: 'sample@sample.com',
//   bio: 'Sample Bio'
// };

const CandidateSearch = () => {
  const [profiles, setProfiles] = useState({} as Candidate[]);
  const [currentProfile, setCurrentProfile] = useState({} as Candidate);  
  const [outOfData, setOutOfData] = useState(false);

  const nextProfile = () => {
    const index = profiles.findIndex((profile) => profile.login === currentProfile.login);

    if (index < profiles.length - 1) {
      setCurrentProfile(profiles[index + 1]);
    } else {
      setOutOfData(true);
    }
  }

  const handleAddCandidate = () => {
    localStorageService.addCandidate(currentProfile);
    nextProfile();
  }  

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
      // setCurrentProfile(sample);
    }

    if (profiles.length > 0) {
      fetchProfile(profiles[0].login);
    }

  }, [profiles]);
  
  return (
    <>
      <h1>CandidateSearch</h1>
      {!outOfData && <div>
        <CandidateProfile profile={currentProfile} />
        <div className='searchControls'>
          <img src={minusButton} className="minusButton" onClick={() => {
            nextProfile();
          }}/>
          <img src={plusButton} className='plusButton' onClick={() => {
            handleAddCandidate();
          }}/>
        </div>
      </div>}
      {outOfData && <h3>No more candidates!</h3>}
    </>
    )
};

export default CandidateSearch;
