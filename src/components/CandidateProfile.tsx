import Candidate from "../interfaces/Candidate.interface";

interface CandidateProfileProps {
    profile: Candidate;
}

function niceName(profile: Candidate) {
    return profile.name ? `${profile.name}<i>(${profile.login})</i>` : profile.login;
}

const CandidateProfile = (props:CandidateProfileProps) => {
    const { profile } = props;

    if (profile?.login) {
        return (
            <>
                <div className="profileCard">
                    <img src={profile.avatar_url} alt={profile.login} />
                    <div className="profileInfo">
                        <h2>{niceName(profile)}</h2>
                        {profile.location && <p>Location: {profile.location}</p>}
                        {profile.email && <p>Email: {profile.email}</p>}
                        {profile.company && <p>Company: {profile.company}</p>}
                        {profile.bio && <p>Bio: {profile.bio}</p>}                        
                    </div>
                </div>
            </>
        )
    }
    
    return <></>
}

export default CandidateProfile;