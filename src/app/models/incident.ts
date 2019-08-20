import { Group } from './group';
import { User } from './user';

export class Incident {

    public IncidentNumber: string;
    public Caller: string;
    public Category: string;
    public Subcategory: string;
    public OnBehalfOf: string;
    public Impact: string;
    public Urgency: string;
    public Priority: string;
    public State: string;
    public AssignmentGroup: Group;
    public AssignedTo: User;
    public ShortDescription: string;
    public Description: string;
    public ConfigurationItem: string;
    public SLA: Date;
    public remTime: number;
    public CreatedDate: Date;
    public UpdatedDate: Date;
}

