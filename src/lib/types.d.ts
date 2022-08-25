export interface User {
	username: string;
}

export interface AuthUser extends User {
	password: string;
}

export type delimaUser = {
	name: string;
	prefix: string;
	email: string;
};
