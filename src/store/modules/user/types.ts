export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
	alias?: string;
	avatar?: string;
	id?: string;
	mail?: string;
	name?: string;
	email?: string;
	mobile?: string;
	created_at?: Date;
	updated_at?: Date;
	introduction?: string;
	// uid?: string;
	// role?: RoleType;
}
