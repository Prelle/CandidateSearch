import Candidate from "../interfaces/Candidate.interface";

class localStorageService {
    public getCandidates(): Candidate[] {
        const candidates = localStorage.getItem('candidates');
        if (candidates) {
            return JSON.parse(candidates);
        }
        return [];
    }

    public addCandidate(candidate: Candidate): void {
        const candidates = this.getCandidates();
        candidates.push(candidate);
        localStorage.setItem('candidates', JSON.stringify(candidates));
    }
}

export default new localStorageService();