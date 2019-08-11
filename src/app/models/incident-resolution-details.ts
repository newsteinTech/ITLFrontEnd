import { User } from './user';
import { WorkNotes } from './work-notes';

export class IncidentResolutionDetails {

    public ResolutionCode: string;
    public ResolvedBy: User;
    public WorkNotes: WorkNotes[];
}
