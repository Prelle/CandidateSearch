import Candidate from "../interfaces/Candidate.interface";
import minusButton from "../assets/minus-red-circle-20564.svg";
import localStorageService from "../utilities/localStorage";

interface CandidateListProps {
    candidates: Candidate[];
}

const CandidateList = (props:CandidateListProps) => {
    const { candidates } = props;

    const handleReject = (id: number) => {
        localStorageService.removeCandidate(id);
        window.location.reload();
    }

    return (
        <>{candidates && candidates.length > 0 ?
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Bio</th>
                    <th>Reject</th>
                </tr>
            </thead>
                <tbody>
                {candidates && candidates.length > 0 && candidates.map((candidate) => (
                    <tr key={candidate.id}>
                        <td className="centered"><img className="smallImage" src={candidate.avatar_url} alt={candidate.login} /></td>
                        {candidate.name ? <td>{candidate.name} <i>({candidate.login})</i></td> : <td>{candidate.login}</td>}                        
                        <td>{candidate.location ?? 'Unknown'}</td>
                        <td>{candidate.email ?? 'Unknown'}</td>
                        <td>{candidate.company ?? 'Unknown'}</td>
                        <td>{candidate.bio}</td>
                        <td className="centered"><img className="minusButtonSmall" src={minusButton} alt="Reject"
                            onClick={() => handleReject(candidate.id)} /></td>
                    </tr>
                ))}
                </tbody>
            </table>
            : <h2>No candidates found</h2>}
        </>
    );
}

export default CandidateList;