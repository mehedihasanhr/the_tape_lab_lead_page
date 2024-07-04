export class Contact {
    constructor(contact) {
        this.id = contact?.id;
        this.firstName = contact?.first_name;
        this.lastName = contact?.last_name;
        this.email = contact?.email;
        this.hubSpotId = contact?.hubspot_id;
        this.createAt = contact?.created_at;
        this.updatedAt = contact?.updated_at;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
