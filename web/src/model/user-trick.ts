export class UserTrick {
	id: number;
	userId: number;
	trickId: number;
	statusId: number;
	dateCreated: Date;
	trickName: string;
	statusName: string;

	constructor () {
		this.id = null;
		this.userId = null;
		this.trickId = null;
		this.statusId = null;
		this.trickName = null;
		this.statusName = null;
	}
}